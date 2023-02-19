<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import NavMenu from "@/components/NavMenu.vue";
import type { NavItems } from "@/types/nav";

const route = useRoute();
const drawer = ref(true);
const menuItems = ref<NavItems>([
  {
    value: "overview",
    title: "Overview",
    icon: "mdi-view-dashboard",
    to: { name: "home" },
  },
  {
    value: "about",
    title: "About us",
    icon: "mdi-information",
    to: { name: "about" },
  },
]);
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <v-sheet class="pa-4 text-center" color="grey-lighten-4">
        <v-img contain height="80" src="@/assets/logo.svg" />
      </v-sheet>

      <v-divider></v-divider>

      <NavMenu :items="menuItems" />
    </v-navigation-drawer>

    <v-app-bar class="border-b" flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ route.meta.title }}</v-toolbar-title>
    </v-app-bar>

    <v-main class="bg-grey-lighten-5">
      <RouterView class="pa-5" />
    </v-main>
  </v-app>
</template>

<style scoped></style>
