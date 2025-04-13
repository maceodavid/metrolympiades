<script setup>
import { useUserData } from "@/composables/useUserData";

const { user } = useUserData();

function logout() {
  localStorage.removeItem("user");
  location.reload();
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