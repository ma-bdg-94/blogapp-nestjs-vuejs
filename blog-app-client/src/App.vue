<script setup>
import { onMounted, ref } from 'vue';
import NavBar from "./components/NavBar.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isRouteReady = ref(false);

onMounted(() => {
  router.isReady().then(() => {
    isRouteReady.value = true;
  });
});

</script>

<template>
  <NavBar
    app-name="Blog App"
    v-if="
      isRouteReady &&
      $route.name !== 'login' &&
      $route.name !== 'register' &&
      $route.name !== 'forgot_password' &&
      $route.name !== 'reset_password'
    "
  />
  <router-view v-if="isRouteReady" />
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
