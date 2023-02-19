<script lang="ts" setup>
import { formatCurrency, formatDate } from "@/helpers";
import type { TransactionEvent } from "@/types/event";

defineProps<{ data: TransactionEvent[] }>();
</script>

<template>
  <v-table class="my-4">
    <thead>
      <tr>
        <th class="text-left">Wallet Address</th>
        <th class="text-left">Type</th>
        <th class="text-right">Amount</th>
        <th class="text-left">Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <td class="text-left">{{ item.wallet }}</td>
        <td class="text-left">
          <v-chip
            v-if="item.event_type === 'withdraw'"
            class="my-2"
            color="red"
            text-color="white"
          >
            {{ item.event_type }}
          </v-chip>
          <v-chip v-else class="my-2" color="green" text-color="white">
            {{ item.event_type }}
          </v-chip>
        </td>
        <td class="text-right">
          {{ formatCurrency(item.value.usd_value) }}
        </td>
        <td class="text-left">
          {{ formatDate(item.timestamp) }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped></style>
