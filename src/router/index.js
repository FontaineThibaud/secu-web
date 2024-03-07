import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/AboutView.vue';
import CreateTask from '../views/CreateTask.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { requiresAuth: true },
  },
  {
    path: '/create',
    name: 'CreateTask',
    component: CreateTask,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: '/:pathMatch(.)',
    redirect: '/' 
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user');
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !user) {
    // L'utilisateur n'est pas connecté et essaie d'accéder à une page nécessitant une authentification
    next('/login'); // Rediriger vers la page de connexion
  } else if (user && (to.name === 'Login' || to.name === 'Register')) {
    // L'utilisateur est connecté et essaie d'accéder à la page de connexion ou d'inscription
    next('/'); // Rediriger vers la page d'accueil
  } else {
    next(); // Autoriser l'accès à la route
  }
});

export default router;