<script setup>
import { useUserData } from "@/composables/useUserData";
import { computed } from "vue";

const props = defineProps(["teamInformation", "index"]);

const { user } = useUserData();

const isMyTeam = computed(() => props.teamInformation.team === user?.team.name);
</script>

<template>
  <article class="card">
    <p>{{ index + 1 }}</p>
    <router-link to="/team" v-if="isMyTeam">{{ teamInformation.team }}</router-link>
    <p v-else>{{ teamInformation.team }}</p>
    <p>{{ teamInformation.points }} pts</p>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid black;
  border-radius: 12px;
  padding: 12px 16px;
  margin: 10px 0;
  font-size: 16px;
}
</style>