import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import('./components/HomeView.vue'), name: 'home' },
    { path: "/login", component: () => import('./components/LoginView.vue'), name: 'login' },
    { path: "/register", component: () => import('./components/RegisterView.vue'), name: 'register' },
  ],
});

export default router;
