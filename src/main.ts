import { createApp } from "./app";
import * as NProgress from "nprogress";

createApp().then(async (spectrum) => {
  spectrum.router.beforeEach(() => {
    NProgress.start();
  });
  spectrum.router.afterEach(() => {
    NProgress.done();
  });
  await spectrum.router.isReady();
  spectrum.app.mount("#app");
});
