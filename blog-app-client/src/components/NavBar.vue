<script setup>
import { useRouter } from 'vue-router';

defineProps({
  appName: {
    type: String,
    required: true,
  },
});

const router = useRouter()

const navigate = link => {
  router.push(link)
}

</script>

<template lang="">
  <nav class="navbar">
    <div class="container">
      <a class="navbar-brand" href="#">{{ appName }}</a>
      <div class="nav-buttons">
        <button class="register-btn" @click="navigate('/register')">Register</button>
        <button class="login-btn" @click="navigate('/login')">Sign In</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Istok+Web:ital,wght@0,400;0,700;1,400;1,700&family=Manjari:wght@100;400;700&display=swap");

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 12.5%;
  height: 12.5vh;
  background-color: #002642;
  width: 100vw;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* Container spans the full width */
}

.navbar-brand {
  font-size: 1.875rem;
  font-weight: bold;
  color: white;
  font-family: "Manjari", sans-serif;
  text-decoration: none;
  font-weight: bold;
  line-height: 2rem;
  white-space: nowrap;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin-right: 1rem;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  /* Adjust text color as needed */
}

.nav-buttons {
  display: flex;
}

.nav-buttons .login-btn {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #e59500;
  /* Adjust button background color */
  cursor: pointer;
  margin-left: 1rem;
  border-radius: 30px;
  font-family: "Istok Web", sans-serif;
  color: white;
  font-size: 1rem;
  width: 170px;
}

.nav-buttons .register-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #002642;
  /* Adjust button background color */
  cursor: pointer;
  margin-left: 1rem;
  border-radius: 30px;
  font-family: "Istok Web", sans-serif;
  color: white;
  font-size: 1rem;
  width: 170px;
}
</style>
