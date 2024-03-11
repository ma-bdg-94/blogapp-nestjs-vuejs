import './assets/main.css' // Import your main stylesheet

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Import router instance (assuming it's in a separate file)
import { createPinia } from 'pinia'

// Create Vue app instance
const app = createApp(App)

// Register router with the app
app.use(router)

// Implement pinia
const pinia = createPinia();
app.use(pinia)

// Mount the app to the DOM element with ID "app"
app.mount('#app')
