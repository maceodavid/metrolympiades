<script setup>
import LeaderboardTeam from "@/components/LeaderboardTeam.vue";
import { ref } from "vue";

const teams = ref([]);

const loading = ref(false);
function fetchTeams() {
  loading.value = true;
  fetch("http://localhost:3000/ranking")
    .then((response) => response.json())
    .then((data) => {
      teams.value = data;
      loading.value = false;
    });
}

fetchTeams();
</script>

<template>
  <h1>Classement général</h1>

  <p v-if="loading && !teams.length">Chargement...</p>
  <p v-else-if="!teams.length">Aucune équipe pour le moment.</p>

  <div class="teamsList">
    <LeaderboardTeam
      v-for="(teamInformation, index) in teams"
      :key="teamInformation.team"
      :teamInformation="teamInformation"
      :index="index"
    />
  </div>
</template>

<style scoped>
.teamsList {
  margin-bottom: 60px;
}
</style>