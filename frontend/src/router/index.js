import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import router from "./router";

export default router(function () {
  // eslint-disable-next-line no-undef
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    // eslint-disable-next-line no-undef
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    router,
    // eslint-disable-next-line no-undef
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });


  return Router;
});