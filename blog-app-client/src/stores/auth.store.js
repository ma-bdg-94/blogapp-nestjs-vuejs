import { defineStore } from 'pinia';
import { authInstance } from './instances';

export const useAuthStore = defineStore('user', {
  state: () => ({
    userData: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    token: ''
  }),

  actions: {
    async registerUser(userData) {
      try {
        const response = await authInstance.post("/new", userData, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        this.isAuthenticated = true
        const tokenValue = await response.json()
        localStorage.setItem('access_token', tokenValue)
        this.token = tokenValue
      } catch (error) {
        console.error('Login error:', error);
        this.error = error.message;
      }
    },

    async loginUser(userData) {
      try {
        const response = await authInstance.post("/", userData, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        this.isAuthenticated = true
        const tokenValue = await response.json()
        localStorage.setItem('access_token', tokenValue)
        this.token = tokenValue
      } catch (error) {
        console.error('Login error:', error);
        this.error = error.message;
      }
    },

    async getAuthenticatedUser() {
      try {
        const response = await authInstance.get("/", {
          headers: {
            Authorization: localStorage.getItem('access_token')
          }
        })
        this.isAuthenticated = true
        const user = await response.json()
        this.userData = user
      } catch (error) {
        console.error('Login error:', error);
        this.error = error.message;
      }
    }
  }
})
