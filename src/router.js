import { createRouter, createWebHistory } from 'vue-router'

import RegisterPage from './pages/RegisterPage.vue'
import LoginPage from './pages/LoginPage.vue'
import LeaderboardPage from './pages/LeaderboardPage.vue'
import TeamPage from './pages/TeamPage.vue'
import GamesPage from './pages/GamesPage.vue'
import NewGame from './pages/NewGame.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LeaderboardPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: LeaderboardPage,
  },
  {
    path: '/team',
    name: 'team',
    component: TeamPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/games',
    name: 'games',
    component: GamesPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/game',
    name: 'game',
    component: NewGame,
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
