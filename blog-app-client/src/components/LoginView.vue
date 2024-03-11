<script setup>
import { ref } from "vue";
import loginImage from "../resources/login.jpg";
import { useAuthStore } from "@/stores/auth.store";

const formData = ref({
  email: "",
  password: "",
});

const showPassword = ref(false);

const authStore = useAuthStore()

const handleSubmit = async (event) => {
  event.preventDefault();
  // Implement your form submission logic here
  // (e.g., send data to backend, display success/error message)
  await authStore.loginUser(formData.value)
  console.log("Form submitted:", formData.value);
};

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template lang="">
  <div class="login-container">
    <div class="left-column">
      <img :src="loginImage" alt="Login Image" />
    </div>
    <div class="right-column">
      <p>Sign into your account</p>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            v-model="formData.email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            name="password"
            v-model="formData.password"
            required
          />
          <button type="button" @click="toggleShowPassword">
            <span v-if="!showPassword">Show</span>
            <span v-else>Hide</span>
          </button>
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Istok+Web:ital,wght@0,400;0,700;1,400;1,700&family=Manjari:wght@100;400;700&display=swap");

* {
  font-family: "Istok Web", sans-serif;
}
.login-container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.left-column,
.right-column {
  flex: 1; /* Both columns take up half the space */
  padding: 1rem;
}

.left-column {
  position: relative;
}

.left-column img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* Image takes full height of left column */
  object-fit: cover; /* Scales image to fit container */
}

.right-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.right-column p {
  font-size: 1.625rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.form-group {
  margin-bottom: 1.25rem;
  width: 500px;
}

.form-group label {
  display: block;
  margin-bottom: 0;
  font-weight: bold;
}

.form-group input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.form-group button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #ddd;
  cursor: pointer;
  margin-left: 0.5rem;
}

.form-group button.show-password {
  background-color: transparent;
}
</style>