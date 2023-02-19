import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: { title: "Dashboard" },
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      meta: { title: "About" },
      component: () => import("@/views/AboutView.vue"),
    },
  ],
});

export default router;
