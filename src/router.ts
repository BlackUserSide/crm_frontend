import {
  createRouter as createClientRouter,
  createWebHistory,
} from "vue-router";
import routes from "pages-generated";
export function createRouter() {
  const router = createClientRouter({
    history: createWebHistory(),
    routes,
  });

  return router;
}
