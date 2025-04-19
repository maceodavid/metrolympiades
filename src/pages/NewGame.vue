<script setup>
import { useUserData } from '@/composables/useUserData'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const { user, token } = useUserData()
const router = useRouter()

const allTeams = ref([])
const allActivities = ref([])

const opponent = ref('')
const activity = ref('')
const startTime = ref('00:00')
const team1Score = ref(0)
const team2Score = ref(0)

const isFormValid = computed(() => {
  return opponent.value.trim() && activity.value.trim() && startTime.value.trim()
})

const isFetchingTeams = ref(false)
const isFetchingActivities = ref(false)
const isCreatingMatch = ref(false)

const saveButtonDisabled = computed(
  () =>
    !isFormValid.value ||
    isFetchingTeams.value ||
    isFetchingActivities.value ||
    isCreatingMatch.value,
)

function fetchAllTeams() {
  isFetchingTeams.value = true
  fetch('http://localhost:3000/teams')
    .then((res) => res.json())
    .then((data) => {
      allTeams.value = data.filter((team) => team.id !== user.team.id)
      isFetchingTeams.value = false
    })
    .catch(console.error)
}

fetchAllTeams()

function fetchAllActivities() {
  isFetchingActivities.value = true
  fetch('http://localhost:3000/activities')
    .then((res) => res.json())
    .then((data) => {
      allActivities.value = data
      isFetchingActivities.value = false
    })
    .catch(console.error)
}

fetchAllActivities()

function createMatch() {
  isCreatingMatch.value = true
  fetch('http://localhost:3000/matches', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      team2Id: opponent.value,
      activityId: activity.value,
      startedAt: `${new Date().toISOString().split('T')[0]}T${startTime.value}:00Z`,
      team1Score: team1Score.value,
      team2Score: team2Score.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      router.push('/games')
    })
    .catch(console.error)
}
</script>

<template>
  <div class="header">
    <h1>Nouveau match</h1>
    <button
      :disabled="saveButtonDisabled"
      :class="{ loading: isCreatingMatch }"
      @click="createMatch"
    >
      Enregistrer
    </button>
  </div>

  <form>
    <label for="opponent">Adversaire</label>
    <select name="opponent" id="opponent" v-model="opponent" required>
      <option value="" hidden>Sélectionner une équipe</option>
      <option v-for="team in allTeams" :key="team.id" :value="team.id">
        {{ team.name }}
      </option>
    </select>

    <label for="activity">Activité</label>
    <select name="activity" id="activity" v-model="activity" required>
      <option value="" hidden>Sélectionner une activité</option>
      <option v-for="activity in allActivities" :key="activity.id" :value="activity.id">
        {{ activity.name }}
      </option>
    </select>

    <label for="start-time">Heure de début</label>
    <input type="time" id="start-time" v-model="startTime" />

    <div class="scores">
      <h2>Scores finaux</h2>
      <div class="score-row">
        <label for="team1score">{{ user.team.name }}</label>
        <input type="number" id="team1score" min="0" value="0" v-model="team1Score" />
      </div>
      <div class="score-row">
        <label for="team2score">Adversaire</label>
        <input type="number" id="team2score" min="0" value="0" v-model="team2Score" />
      </div>
    </div>
  </form>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 40px;
}

label {
  display: block;
  margin-top: 20px;
  margin-bottom: 5px;
  font-weight: bold;
}

form label {
  display: block;
  margin-top: 1rem;
  font-weight: bold;
}

select,
input[type='time'],
input[type='number'] {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.3rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  font-size: 1rem;
}

.scores {
  margin-top: 2rem;
}

.score-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.score-row input[type='number'] {
  width: 80px;
}
</style>
