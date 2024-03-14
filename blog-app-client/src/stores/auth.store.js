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
        const tokenValue = response.data?.data?.accessToken
        console.log(tokenValue)
        localStorage.setItem('access_token', tokenValue)
        this.token = tokenValue
        return response.data
      } catch (error) {
        this.error = error.response.data.error;
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
        const tokenValue = response.data?.data?.accessToken
        localStorage.setItem('access_token', tokenValue)
        this.token = tokenValue
        return response.data
      } catch (error) {
        this.error = error.response.data.error;
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
    },

    async requestPasswordChange(passwordData) {
      try {
        const response = await authInstance.put("/password", passwordData, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        const tokenValue = response.data?.data?.passwordToken
        localStorage.setItem('password_token', tokenValue)
        this.token = tokenValue
        return response.data
      } catch (error) {
        this.error = error.response.data.error;
      }
    },

    async updatePassword(resetToken, passwordData) {
      try {
        const response = await authInstance.put(`/password/reset/${resetToken}`, passwordData, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        return response.data
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
})
