import { createWebHistory, createRouter } from "vue-router";
const routes =  [
  {
    path: "/",
    alias: "/Home",
    name: "Home-list",
    component: () => import("./components/List")
  },
  {
    path: "/Home/:id",
    name: "home-details",
    component: () => import("./components/Home")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/Add")
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;