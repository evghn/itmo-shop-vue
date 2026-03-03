import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { adminCheckAuth, adminLogin } from "@/api/admin/user.api";
import { userCheckAuth, userLogin, userLogout } from "@/api/shop/user.api";
import { useAppStore } from "./store.app";

export const useUserStore = defineStore("user", () => {
  const isAuthenticated = ref(false);
  const role = ref(null);
  const userData = ref();

  const _token = ref();

  const token = computed(() => _token.value);

  const setToken = (value, roleData = null) => {
    _token.value = value;
    isAuthenticated.value = true;
    const _role = localStorage.getItem("role");
    role.value = roleData;

    if (roleData && _role != roleData) {
      localStorage.setItem("role", roleData);
    }
  };

  const login = async (user, admin = false) => {
    try {
      let responseToken;
      if (admin) {
        responseToken = await adminLogin(user, admin);
        if (responseToken) {
          setToken(responseToken, "admin");
        }
      } else {
        responseToken = await userLogin(user, admin);
        if (responseToken) {
          localStorage.removeItem("role");
          setToken(responseToken);
        }
      }
      if (responseToken) {
        localStorage.setItem("token", responseToken);
        userData.value = { ...user };
        return true;
      }
    } catch (e) {
      const app = useAppStore();
      app.setFlash(e.data.message);
    }
    return false;
  };

  const logout = async () => {
    try {
      await userLogout();     
    } catch (err) {
      console.log(err);
    } finally {
      _token.value = null;
    }
    
    return true;
  };

  const checkAuth = async () => {
    try {
      _token.value = localStorage.getItem("token");
      if (_token.value) {
        let res;
        const _role = localStorage.getItem("role");
        
        if (_role && _role === "admin") {
          console.log(_role, _token.value, _role && _role === "admin");

          res = await adminCheckAuth(_token.value);
          role.value = "admin";
        } else {
          res = await userCheckAuth(_token.value);
        }
        userData.value = res.data;
        return true;
      }
    } catch {
      _token.value = null;
      role.value = null;
    }

    return false;
  };

  watch(
    () => _token.value,
    (val) => {
      if (!val) {
        userData.value = null;
        isAuthenticated.value = false;
        role.value = null;
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      } else {
        isAuthenticated.value = true;
      }
    },
  );
  return {
    isAuthenticated,
    role,
    userData,
    token,
    login,
    logout,
    setToken,
    checkAuth,
  };
});
