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
      <li><a href="leaderboard">🏆 Classement général</a></li>
      <li v-if="!user"><a href="register">Créer un compte</a></li>
      <li v-if="!user"><a href="login">Se connecter</a></li>
      <li v-if="user"><a href="team">👥 Mon équipe</a></li>
      <li v-if="user"><a href="games">📅 Mes matchs</a></li>
      <li v-if="user" @click="logout"><a>🔓 Se déconnecter</a></li>
    </ul>
  </nav>
</template>