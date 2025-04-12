import { createRouter, createWebHistory } from 'vue-router';

import UserProfile from './pages/UserProfile.vue';
import HomePage from './pages/HomePage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import LoginPage from './pages/LoginPage.vue';
import LeaderboardPage from './pages/LeaderboardPage.vue';
import TeamPage from './pages/TeamPage.vue';
import GamesPage from './pages/GamesPage.vue';
import NewGamePage from './pages/NewGamePage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    // La propriété meta permet de définir des métadonnées pour une route.
    // On peut y stocker des informations supplémentaires, comme ici l'information que la route nécessite une authentification.
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/user/:username",
    name: "user",
    component: UserProfile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage
  },
  {
    path: "/leaderboard",
    name: "leaderboard",
    component: LeaderboardPage
  },
  {
    path: "/team",
    name: "team",
    component: TeamPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/games",
    name: "games",
    component: GamesPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/game",
    name: "game",
    component: NewGamePage,
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// La méthode beforeEach() est appelée avant chaque navigation.
// Elle prend comme argument une fonction callback qui reçoit trois arguments : to, from et next.
// to est l'objet de route vers lequel la navigation est en cours.
// from est l'objet de route à partir duquel la navigation est effectuée.
// next est une fonction qui doit être appelée pour continuer la navigation.
router.beforeEach((to, _, next) => {
  // Si la route nécessite une authentification, on vérifie si l'utilisateur est connecté.
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      // Si l'utilisateur n'est pas connecté, on redirige vers la page de connexion.
      next({ name: 'login' });
    } else {
      // Sinon, on laisse l'utilisateur accéder à la route.
      next();
    }
  } else {
    next();
  }
});

export default router;
