import { createRouter } from "./router";
import { createHead } from "@vueuse/head";
import { createPinia } from "pinia";
import App from "./App.vue";
import { createApp as createClientApp, h, Suspense } from "vue";
import {
  registerGlobalComponents,
  registerRouterNavigationGuards,
} from "./app-custom";
import "v-calendar/dist/style.css";
import { createApi } from "./composable/useApi";

export type VueroAppContext = Awaited<ReturnType<typeof createApp>>;
export async function createApp() {
  const router = createRouter();
  const head = createHead();
  const pinia = createPinia();
  const api = createApi();
  const app = createClientApp({
    setup() {
      return () => {
        /**
         * The Suspense component is needed to use async in child components setup
         * @see https://v3.vuejs.org/guide/migration/suspense.html
         */
        return h(Suspense, null, {
          default: () => h(App),
        });
      };
    },
  });
  const settings = {
    app,
    head,
    router,
    pinia,
    api,
  };
  await registerGlobalComponents(settings);
  await registerRouterNavigationGuards(settings);

  app.use(settings.head);
  app.use(settings.pinia);
  app.use(settings.router);

  return settings;
}
