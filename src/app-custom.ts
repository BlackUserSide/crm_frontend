import { VueroAppContext } from "./app";
import { SetupCalendar } from "v-calendar";
import { defineAsyncComponent } from "vue";

export async function registerGlobalComponents({ app }: VueroAppContext) {
  app.use(SetupCalendar, {});
  app.component(
    "VCalendar",
    defineAsyncComponent({
      loader: () => import("v-calendar").then((mod) => mod.Calendar),
      delay: 0,
      suspensible: false,
    })
  );
  app.component(
    "VDatePicker",
    defineAsyncComponent({
      loader: () => import("v-calendar").then((mod) => mod.DatePicker),
      delay: 0,
      suspensible: false,
    })
  );
}
export function registerRouterNavigationGuards({ router }: VueroAppContext) {
  router.beforeEach(async (to, from) => {});
}
