<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const teamName = ref('')
const email = ref('')
const password = ref('')

const isFormValid = computed(() => {
  return (
    !!username.value.trim() &&
    !!teamName.value.trim() &&
    !!email.value.trim() &&
    !!password.value.trim()
  )
})

const isLoading = ref(false)

function register() {
  isLoading.value = true

  fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value,
      teamName: teamName.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem('user', JSON.stringify(data))
      router.push('/leaderboard')
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <form @submit.prevent="register">
    <h1 style="margin-bottom: 1rem">Inscription</h1>
    <input
      type="text"
      id="username"
      name="username"
      required
      v-model="username"
      placeholder="Nom d'utilisateur"
    />
    <input
      type="text"
      id="teamName"
      name="teamName"
      required
      v-model="teamName"
      placeholder="Nom d'équipe"
    />
    <input
      type="email"
      id="email"
      name="email"
      autocomplete="email"
      required
      v-model="email"
      placeholder="Email"
    />
    <input
      type="password"
      id="password"
      name="password"
      autocomplete="new-password"
      required
      v-model="password"
      placeholder="Mot de passe"
    />
    <button type="submit" :disabled="!isFormValid || isLoading" :class="{ loading: isLoading }">
      J'inscris mon équipe
    </button>
    <router-link to="/login" class="login_link">Je possède déjà un compte</router-link>
  </form>
</template>

<style>
.login_link {
  display: block;
  text-align: center;
  margin-top: 1rem;
  font-weight: 500;
  font-size: 0.9rem;
}
</style>
