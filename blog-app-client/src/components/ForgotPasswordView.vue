<script setup>
import { ref } from "vue";
import forgotPasswordImage from "../resources/forgot_password.jpg";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";

const formData = ref({
  email: "",
});

const authStore = useAuthStore();

const router = useRouter();

const handleSubmit = async (event) => {
  event.preventDefault();
  await authStore.requestPasswordChange(formData.value);
  console.log("Form submitted:", formData.value);
};

const handleRedirect = () => {
  router.push("/login");
};

</script>

<template lang="">
  <div class="view-container">
    <div class="left-column">
      <img :src="forgotPasswordImage" alt="Login Image" />
    </div>
    <div class="right-column">
      <p>Sorry to hear that!</p>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            v-model="formData.email"
          />
        </div>
        <div v-if="authStore.error">
          <p class="error">{{ authStore.error }}</p>
        </div>
        <div class="horizontal-container">
          <button type="submit" class="submit">Send Recovery Mail</button>
          <div class="separator">
            <p style="font-size: 1rem; margin-block: 50%">or</p>
          </div>
          <button type="submit" class="redirect" @click="handleRedirect">
            I remembered my credentials
          </button>
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
.view-container {
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
