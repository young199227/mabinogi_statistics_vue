import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import Home from './views/Home.vue';
import About from './views/Create.vue';
import Admin from './views/Admin.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create',
    name: 'Create',
    component: About
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
