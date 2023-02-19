<script lang="ts" setup>
import { computed, ref } from "vue";
import { useWalletStore } from "@/stores/wallet";
import { formatCurrency } from "@/helpers";
import { useTransactionsStore } from "@/stores/transactions";
import AssetsTable from "@/components/home/AssetsTable.vue";
import TransactionsTable from "@/components/home/TransactionsTable.vue";

// stores
const walletStore = useWalletStore();
const transactionsStore = useTransactionsStore();

// hit store actions
walletStore.fetchWallets();
transactionsStore.fetchTransactions();

const tab = ref(null);
const wallet = ref("");

// populate list of wallet ids, and default option for dropdown
const wallets = computed(() => {
  const walletItems = Object.keys(walletStore.wallets).map(
    (walletId: string) => {
      return { value: walletId, title: walletId };
    }
  );

  walletItems.unshift({ value: "", title: "All Wallets" });

  return walletItems;
});

// a computed value that depends on what wallet is selected on the dropdown
const dataToDisplay = computed(() => {
  if (!wallet.value) {
    return {
      totalUsdBalance: walletStore.totalUsdBalance,
      summedAssets: walletStore.summedAssets,
      transactionsList: transactionsStore.transactionsList,
    };
  }

  return {
    totalUsdBalance: walletStore.totalUsdBalanceForWallet(wallet.value),
    summedAssets: walletStore.summedAssetsForWallet(wallet.value),
    transactionsList: transactionsStore.transactionsListForWallet(wallet.value),
  };
});
</script>

<template>
  <div>
    <v-container fluid>
      <v-row align="end" class="mb-8" fluid justify="space-between">
        <v-col cols="auto">
          <span class="text-h6 d-block text-grey-darken-1">
            Total Asset Balance
          </span>
          <span class="text-h4 text-primary font-weight-medium">
            {{ formatCurrency(dataToDisplay.totalUsdBalance) }}
          </span>
        </v-col>
        <v-col cols="auto">
          <v-select
            v-model="wallet"
            :items="wallets"
            hide-details
            label="Choose wallet"
            no-data-text="All Wallets"
            variant="outlined"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-tabs v-model="tab" align-tabs="start" color="primary">
      <v-tab :value="1">Assets</v-tab>
      <v-tab :value="2">Transactions</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item :value="1">
        <v-row>
          <v-col>
            <AssetsTable :data="dataToDisplay.summedAssets" />
          </v-col>
        </v-row>
      </v-window-item>
      <v-window-item :value="2">
        <v-row>
          <v-col>
            <TransactionsTable :data="dataToDisplay.transactionsList" />
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </div>
</template>

<style scoped>
:deep(.v-select__selection-text) {
  overflow: hidden;
}
</style>
