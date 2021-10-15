import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/base",
    name: "Home",
    component: Home,
  },
  {
    path: "/model",
    name: "Model",
    component: () =>
      import(/* webpackChunkName: "model" */ "../views/Model.vue"),
  },
  {
    path: "/product",
    name: "Product",
    component: () =>
      import(/* webpackChunkName: "model" */ "../views/Product.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
