/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from "@/plugins/webfontloader";
import vuetify from "@/plugins/vuetify";
import pinia from "@/stores";
import router from "@/router";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  loadFonts().catch(() => {
    /**/
  });
  app.use(vuetify).use(pinia).use(router);
}
