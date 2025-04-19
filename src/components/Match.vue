<script setup>
const props = defineProps(['match'])

const team1HasWon = props.match.team1Score >= props.match.team2Score
const time = props.match.startedAt.match(/\d\d:\d\d/)[0].replace(':', 'h')
</script>

<template>
  <div class="match-card">
    <div class="match-header">
      <span class="sport">{{ match.activity }}</span>
      <span class="secondary">{{ time }}</span>
    </div>
    <div class="teams">
      <div class="team">
        <strong v-if="team1HasWon">{{ match.team1 }}</strong>
        <span v-else class="secondary">{{ match.team1 }}</span>
        <span>{{ match.team1Score }}</span>
      </div>
      <div class="team">
        <strong v-if="!team1HasWon">{{ match.team2 }}</strong>
        <span v-else class="secondary">{{ match.team2 }}</span>
        <span>{{ match.team2Score }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.match-card {
  border: 1px solid #000;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
}

.match-header {
  display: flex;
  font-size: 14px;
  margin-bottom: 10px;
}

.sport {
  margin-right: 30px;
}

.teams .team {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin: 5px 0;
}

.secondary {
  color: grey;
}
</style>
