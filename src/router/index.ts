import { createRouter, createWebHistory } from "vue-router";
import { getAuthToken, revokeAuthToken, validateToken } from "~/network/session";
import { useStore } from "~/store";
import { setTitle } from "~/utils/page";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("../pages/LandingPage.vue")
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../pages/admin/AdminPage.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/login/AdminLoginPage.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/**
 * Navigation guards
 */
router.beforeEach(async (to, from, next) => {
  // Set page title
  setTitle(to.name?.toString() ?? "");

  // If going to login
  if (to.name === "Login") {
    // If has token, redirect to admin page
    if (getAuthToken()) {
      return next({ name: "Admin" });
    }

    return next();
  }

  // If going to landing page
  if (to.name === "Landing") {
    // Just next 
    return next();
  }

  // Validate token
  const isValid = await validateToken();
  // Get store
  const store = useStore();

  // If token is NOT valid
  if (!isValid && !store.isFromLogout) {
    // Set {isNotAuth} to true
    store.isNotAuth = true;
    // Clear token
    revokeAuthToken();
    // Redirect to login page
    return next({ name: "Login" });
  }

  // If not login
  return next();
});



export default router;