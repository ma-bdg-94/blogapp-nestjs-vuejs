<script>
import blogMainImage from '../resources/blog.jpg';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      imageSrc: blogMainImage
    }
  },

  setup() {
    const router = useRouter();
    const handleStart = () => {
      router.push('/register')
    }

    return {
      handleStart
    }
  }
}
</script>

<template lang="">
  <div class="main">
    <div class="left-column">
      <p class="title">Welcome to this Blog App</p>
      <p class="description">Hum, This is just a project to demonstrate my vue.js skills</p>
      <button class="start-btn" @click="handleStart">Start Now!</button>
    </div>
    <div class="right-column">
      <img :src="imageSrc" alt="" />
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Istok+Web:ital,wght@0,400;0,700;1,400;1,700&family=Manjari:wght@100;400;700&display=swap");

.main {
  display: flex;
  flex-wrap: wrap;
  height: 87.5vh;
  width: 100vw;
  align-items: space-between;
}

.left-column,
.right-column {
  flex: 1; /* Both columns take up half the space */
  padding: 1rem;
}

.left-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Istok Web", sans-serif;
}

.button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #ddd;
  cursor: pointer;
  margin-top: 1rem;
  display: inline-block;
}

.right-column {
  text-align: center; /* Center image horizontally */
}

.right-column img {
  max-width: 100%; /* Image scales to fit container */
  height: auto;
}

.title {
  font-weight: bold;
  font-size: 1.625rem;
}

.description {
  font-size: 1rem;
}

.start-btn {
  width: 60%;
  margin-block: 2%;
  height: 61px;
  border-radius: 15px;
  font-size: 1.75rem;
  color: white;
  border: none;
  background-color: #840032;
  cursor: pointer;
}
</style>
