import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Landing Page",
    component: () => import("../pages/LandingPage.vue")
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});