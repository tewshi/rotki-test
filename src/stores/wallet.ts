import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { Wallets, WalletsResponse } from "@/types/wallet";
import { api } from "@/stores/index";
import type { Asset } from "@/types/asset";

export const useWalletStore = defineStore("wallet", () => {
  // state
  const wallets = ref<Wallets>({});

  // getters
  /**
   * flat list of assets
   */
  const assetList = computed(() => {
    return Object.values(wallets.value).flatMap((wallet) =>
      Object.values(wallet)
    );
  });

  /**
   * total usd balance for all wallets
   */
  const totalUsdBalance = computed(() => {
    return assetList.value.reduce((accumulator, asset) => {
      return accumulator + parseFloat(asset.usd_value);
    }, 0);
  });

  /**
   * total usd balance for a specific wallet
   */
  const totalUsdBalanceForWallet = computed(() => {
    return (walletId: string) => {
      return Object.values(wallets.value[walletId] ?? {}).reduce(
        (accumulator, asset) => {
          return accumulator + parseFloat(asset.usd_value);
        },
        0
      );
    };
  });

  /**
   * unique map of assets and their usd values computed
   */
  const summedAssets = computed(() => {
    const result: Record<string, Asset> = {};

    return assetList.value.reduce((accumulator, asset) => {
      if (!accumulator[asset.name]) {
        accumulator[asset.name] = { ...asset }; // break the reference
        accumulator[asset.name].percentage = `${
          (parseFloat(asset.usd_value) / totalUsdBalance.value) * 100
        }`;
      } else {
        accumulator[asset.name].usd_value = `${
          parseFloat(accumulator[asset.name].usd_value) +
          parseFloat(asset.usd_value)
        }`;
        accumulator[asset.name].percentage = `${
          (parseFloat(accumulator[asset.name].usd_value) /
            totalUsdBalance.value) *
          100
        }`;
      }

      return accumulator;
    }, result);
  });

  /**
   * unique map of assets and their usd values computed for a specific wallet
   */
  const summedAssetsForWallet = computed(() => {
    return (walletId: string) => {
      const result: Record<string, Asset> = {};

      return Object.values(wallets.value[walletId] ?? {}).reduce(
        (acc, asset) => {
          if (!acc[asset.name]) {
            acc[asset.name] = { ...asset };
            acc[asset.name].percentage = `${
              (parseFloat(asset.usd_value) /
                totalUsdBalanceForWallet.value(walletId)) *
              100
            }`;
          } else {
            acc[asset.name].usd_value = `${
              parseFloat(acc[asset.name].usd_value) +
              parseFloat(asset.usd_value)
            }`;
            acc[asset.name].percentage = `${
              (parseFloat(acc[asset.name].usd_value) /
                totalUsdBalanceForWallet.value(walletId)) *
              100
            }`;
          }

          return acc;
        },
        result
      );
    };
  });

  // actions
  /**
   * Fetch all user wallet data
   */
  const fetchWallets = async () => {
    try {
      const response = await api.get<WalletsResponse>("balances");
      const result = response.result ?? {};
      // transform the data to make it easy for computation and identification
      Object.keys(result).forEach((walletId) => {
        Object.keys(result[walletId]).forEach((assetName) => {
          result[walletId][assetName].name = assetName;
        });
      });

      wallets.value = result;
    } catch (e) {
      // handle error, send to error reporter (sentry, bugsnag, ...)
      console.log(e);
    }
  };

  return {
    wallets,
    summedAssets,
    summedAssetsForWallet,
    totalUsdBalance,
    totalUsdBalanceForWallet,
    fetchWallets,
  };
});
