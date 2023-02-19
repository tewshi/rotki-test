import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { api } from "@/stores/index";
import type {
  TransactionEvents,
  TransactionEventsResponse,
} from "@/types/event";

export const useTransactionsStore = defineStore("transactions", () => {
  // state
  const transactions = ref<TransactionEvents>({});

  // getters
  /**
   * flat list of all transactions sorted by timestamp
   */
  const transactionsList = computed(() => {
    return Object.values(transactions.value)
      .flatMap((wallet) => {
        return Object.values(wallet.events);
      })
      .sort((a, b) => {
        return b.timestamp - a.timestamp;
      });
  });

  /**
   * flat list of all transactions for a wallet sorted by timestamp
   */
  const transactionsListForWallet = computed(() => {
    return (walletId: string) => {
      return (transactions.value[walletId]?.events ?? []).sort((a, b) => {
        return b.timestamp - a.timestamp;
      });
    };
  });

  // actions
  /**
   * Fetch all user transactions data
   */
  const fetchTransactions = async () => {
    try {
      const response = await api.get<TransactionEventsResponse>("events");
      const result = response.result ?? {};

      Object.keys(result).forEach((walletId) => {
        result[walletId].events.forEach((event, index) => {
          result[walletId].events[index].wallet = walletId;
        });
      });

      transactions.value = result;
    } catch (e) {
      // handle error, send to error reporter (sentry, bugsnag, ...)
      console.log(e);
    }
  };

  return {
    transactions,
    transactionsList,
    transactionsListForWallet,
    fetchTransactions,
  };
});
