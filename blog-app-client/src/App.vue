<script setup>
import NavBar from './components/NavBar.vue';
import HomeView from './components/HomeView.vue'
import router from './router';
</script>

<template>
  <NavBar app-name="Blog App" v-if="$route.name !== 'login' && $route.name !== 'register'" />
  <router-view />
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
