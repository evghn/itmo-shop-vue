import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { userLogin, userLogout } from '@/api/admin/user.api'

export const useUserStore = defineStore('user', () => {
  const isAuthenticated = ref(false)
  const role = ref(null)
  const userData = ref()
  const _token = ref()
  

  const token = computed(() => _token.value)
  const setToken = (value) => {
    _token.value = value
  }

  const login = async (user) => {
    if (userLogin(user)) {
      isAuthenticated.value = true;
      role.value = "admin"
      return true
    }
    return false
  } 

  const logout = async () => {
    const res = await userLogout()
    if (res) {
      isAuthenticated.value = false;
      role.value = null
      token.value = null
      return true
    }
    return false
  } 

  

  return { 
    isAuthenticated,
    role,
    userData,
    token,
    login,
    logout,
    setToken,
  }
})
