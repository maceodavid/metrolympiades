<script setup>
import { useUserData } from '@/composables/useUserData'
import { ref, computed } from 'vue'

const { user, token } = useUserData()

const username = `${user.username} (Vous)`

const teamName = ref(user.team.name)
const teamMembers = ref([])

const isFormValid = computed(() => {
  return teamName.value.trim() && teamMembers.value.every((memberName) => memberName.trim())
})

const pageIsLoading = ref(false)
const isUpdating = ref(false)

function addTeammate() {
  teamMembers.value.push('')
}

function removeTeammate(index) {
  teamMembers.value.splice(index, 1)
}

function fetchMembers() {
  pageIsLoading.value = true
  fetch('http://localhost:3000/teams/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.members) {
        teamMembers.value = data.members
      }
      pageIsLoading.value = false
    })
    .catch(console.error)
}

fetchMembers()

function updateTeam() {
  isUpdating.value = true
  fetch('http://localhost:3000/teams/me', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: teamName.value,
      members: teamMembers.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      user.team.name = teamName.value
      localStorage.setItem('user', JSON.stringify(user))
      isUpdating.value = false
      location.reload()
    })
    .catch(console.error)
}
</script>

<template>
  <div class="header">
    <h1>Mon équipe</h1>
    <button
      :disabled="!isFormValid || pageIsLoading || isUpdating"
      :class="{ loading: isUpdating }"
      @click="updateTeam"
    >
      Enregistrer
    </button>
  </div>

  <label for="teamName">Nom de l'équipe</label>
  <div class="team-input">
    <input type="text" id="teamName" v-model="teamName" />
  </div>

  <div v-if="pageIsLoading">Chargement...</div>
  <div v-else>
    <label for="member">Membres de l'équipe</label>
    <div class="team-input">
      <input type="text" id="member" name="member" :value="username" disabled />
    </div>
    <div class="member-input" v-for="(memberName, index) in teamMembers" :key="index">
      <input
        type="text"
        :id="'member' + index"
        :name="'member' + index"
        v-model="teamMembers[index]"
      />
      <button class="remove-btn" @click="removeTeammate(index)">✕</button>
    </div>

    <button class="add-btn" @click="addTeammate">Ajouter un coéquipier</button>
  </div>
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

.team-input {
  display: flex;
  align-items: center;
}

.team-input input {
  flex: 0.91;
}

.member-input {
  display: flex;
  align-items: center;
}

.member-input input {
  flex: 1;
}

.remove-btn {
  margin-left: 6px;
  margin-bottom: 15px;
  font-size: 16px;
  border: none;
  background-color: transparent;
}

.add-btn {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  margin-bottom: 60px;
}
</style>
