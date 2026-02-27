import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { userLogin, userLogout } from '@/api/admin/user.api'

export const useUserStore = defineStore('user', () => {
  const isAuthenticated = ref(false)
  const role = ref(null)
  const userData = ref()
  // const _token = ref("FU3ynTYUcz2vhDrci_S3TudS7CG_cStMTB2")
  const _token = ref()
  

  const token = computed(() => _token.value)

  const setToken = (value, roleData = null) => {
    _token.value = value;
    isAuthenticated.value = true;
    
    const _role = localStorage.getItem("role")
    role.value = roleData
    if (roleData && _role != roleData) {
      localStorage.setItem("role", roleData);
    }
  }

  const login = async (user, admin = false) => {
    const responseToken  = await userLogin(user, admin);
    if (responseToken) {
      setToken(responseToken, "admin")
      localStorage.setItem("token", responseToken);
      // localStorage.setItem("role", "admin");

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
      localStorage.removeItem("token");
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
