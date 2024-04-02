import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import About from './views/Create.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
