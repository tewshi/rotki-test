import type { RouteLocationRaw } from "vue-router";

export interface NavItem {
  title: string;
  to: RouteLocationRaw;
  value: string;
  icon: string;
}

export type NavItems = NavItem[];
