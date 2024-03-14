import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import('./components/HomeView.vue'), name: 'home' },
    { path: "/login", component: () => import('./components/LoginView.vue'), name: 'login' },
    { path: "/register", component: () => import('./components/RegisterView.vue'), name: 'register' },
    { path: "/password", component: () => import('./components/ForgotPasswordView.vue'), name: 'forgot_password' },
    { path: `/password/reset/${localStorage.getItem("password_token")}`, component: () => import('./components/ResetPasswordView.vue'), name: 'reset_password' },
  ],
});

export default router;
