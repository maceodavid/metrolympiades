<script setup>
import { useUserData } from '@/composables/useUserData'

const { user } = useUserData()

function logout() {
  localStorage.removeItem('user')
  location.reload()
}
</script>

<template>
  <nav class="sidebar">
    <div class="sidebar-title">
      <h2>Metrolympiades</h2>
      <h3 v-if="user">{{ user.team.name }}</h3>
    </div>
    <ul>
      <li><router-link to="/leaderboard">🏆 Classement général</router-link></li>
      <li v-if="!user"><router-link to="/register">Créer un compte</router-link></li>
      <li v-if="!user"><router-link to="/login">Se connecter</router-link></li>
      <li v-if="user"><router-link to="/team">👥 Mon équipe</router-link></li>
      <li v-if="user"><router-link to="/games">📅 Mes matchs</router-link></li>
      <li v-if="user"><a @click="logout">🔓 Se déconnecter</a></li>
    </ul>
  </nav>
</template>

<style scoped>
.sidebar {
  width: 240px;
  height: 100%;
  background: var(--color-border);
  border-right: 2px solid var(--color-border);
  padding: 20px;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
}

.sidebar-title {
  margin-bottom: 50px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin-bottom: 15px;
}

.sidebar ul li a {
  font-weight: normal;
}
</style>
