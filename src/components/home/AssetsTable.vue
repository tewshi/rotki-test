<script lang="ts" setup>
import { formatCurrency } from "@/helpers";
import type { Asset } from "@/types/asset";

defineProps<{ data: Record<string, Asset> }>();
</script>

<template>
  <v-table class="my-4">
    <thead>
      <tr>
        <th class="text-left">Asset</th>
        <th class="text-right">Amount</th>
        <th class="text-right">Value</th>
        <th class="text-right">Percentage</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.name">
        <td class="text-left">
          <v-avatar
            :size="36"
            class="text-center mx-auto mr-3"
            color="grey-lighten-1"
            rounded="lg"
          ></v-avatar>
          {{ item.name }}
        </td>
        <td class="text-right">
          {{ formatCurrency(item.amount, { fractionDigits: "3" }) }}
        </td>
        <td class="text-right">
          {{ formatCurrency(item.usd_value) }}
        </td>
        <td class="text-right">
          {{ formatCurrency(Number(item.percentage), { fractionDigits: "2" }) }}
          %
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped></style>
