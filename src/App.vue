<script setup>
import AppSidebar from "@/components/AppSidebar.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Afficher la barre de navigation uniquement sur les pages autres que /login et /register
const showSidebar = computed(() => {
  return !["/login", "/register"].includes(route.path);
});
</script>

<template>
  <div>
    <AppSidebar v-if="showSidebar" />

    <main>
      <div class="container">
        <RouterView />
      </div>
    </main>
  </div>
</template>