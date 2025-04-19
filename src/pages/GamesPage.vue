<script setup>
import Match from '@/components/Match.vue'
import { useUserData } from '@/composables/useUserData'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { token } = useUserData()
const router = useRouter()

const matches = ref([])

const loading = ref(false)
function fetchMatches() {
  loading.value = true
  fetch('http://localhost:3000/matches/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      matches.value = data
      loading.value = false
    })
}

fetchMatches()

function createNewGame() {
  router.push('/game')
}
</script>

<template>
  <div class="header">
    <h1>Mes matchs</h1>
    <button :disabled="loading" :class="{ loading: isUpdating }" @click="createNewGame">
      Ajouter un match
    </button>
  </div>

  <p v-if="loading && !matches.length">Chargement...</p>
  <p v-else-if="!matches.length">Aucun match pour le moment.</p>

  <div class="matchesList">
    <Match v-for="match in matches" :key="match.id" :match="match" />
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 40px;
}

.matchesList {
  margin-bottom: 60px;
}
</style>
