<script setup>
import { ref } from "vue";
import resetPasswordImage from "../resources/reset_password.jpg";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";

const formData = ref({
  password: "",
  passwordRe: "",
});

const showPassword = ref(false);

const authStore = useAuthStore();

const router = useRouter();

const handleSubmit = async (event) => {
  event.preventDefault();
  await authStore.updatePassword(
    localStorage.getItem("password_token"),
    formData.value
  );
  localStorage.removeItem("password_token");
  router.push("/login");
};

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template lang="">
  <div class="login-container">
    <div class="left-column">
      <img :src="resetPasswordImage" alt="Login Image" />
    </div>
    <div class="right-column">
      <p>Submit new password</p>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="password">New Password:</label>
          <div class="horizontal-container">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              name="password"
              v-model="formData.password"
            />
            <button
              type="button"
              @click="toggleShowPassword"
              style="visibility: hidden"
            >
              <span v-if="!showPassword">Show</span>
              <span v-else>Hide</span>
            </button>
          </div>
        </div>
        <div class="form-group">
          <label for="passwordRe">Retype New Password:</label>
          <div class="horizontal-container">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="passwordRe"
              name="passwordRe"
              v-model="formData.passwordRe"
            />
            <button type="button" @click="toggleShowPassword">
              <span v-if="!showPassword">Show</span>
              <span v-else>Hide</span>
            </button>
          </div>
        </div>
        <div v-if="authStore.error">
          <p class="error">{{ authStore.error }}</p>
        </div>
        <div class="horizontal-container">
          <button type="submit" class="submit" style="width: 100%;">Update Password</button>
        </div>
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
  flex: 1;
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
  height: 100%;
  object-fit: cover;
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
  margin-bottom: 1.125rem;
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

.form-group input:hover {
  padding: 0.5rem;
  border: 1px solid #002642;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.form-group input:focus {
  padding: 0.5rem;
  outline: 2.5px solid #002642 !important;
  border: none;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.form-group button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #e5950055;
  cursor: pointer;
  margin-left: 0.5rem;
}

.form-group button.show-password {
  background-color: transparent;
}

.horizontal-container {
  display: flex;
  align-items: center;
}

.submit {
  width: 50%;
  margin-block: 2%;
  height: 40px;
  border-radius: 15px;
  font-size: 1rem;
  color: white;
  border: none;
  background-color: #840032;
  cursor: pointer;
}

.separator {
  font-size: 1rem !important;
  margin-inline: 1rem !important;
  display: flex;
  align-items: center !important;
  justify-content: center !important;
}

.redirect {
  width: 50%;
  margin-block: 2%;
  height: 40px;
  border-radius: 15px;
  font-size: 1rem;
  color: #840032;
  border: none;
  background-color: #84003200;
  cursor: pointer;
}
.error {
  color: red;
  font-size: 1rem !important;
}
</style>
