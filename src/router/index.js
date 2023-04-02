import { createRouter, createWebHistory } from "vue-router";
import { setTitle } from "~/utils/page";

const routes = [
  {
    path: "/",
    name: "",
    component: () => import("../pages/LandingPage.vue")
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../pages/AdminPage.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/AdminLoginPage.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/**
 * TODO: Add a check if the user is logged in
 */ 

router.beforeEach((to, from) => {
  // Set page title
  setTitle(to.name);
});

export default router;