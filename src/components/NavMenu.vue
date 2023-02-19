<script lang="ts" setup>
import type { NavItems } from "@/types/nav";

withDefaults(defineProps<{ items: NavItems }>(), { items: () => [] });
</script>

<template>
  <v-list density="compact" nav>
    <v-list-item
      v-for="item in items"
      :key="item.value"
      :prepend-icon="item.icon"
      :title="item.title"
      :to="item.to"
      :value="item.value"
      color="primary"
    />
  </v-list>
</template>
