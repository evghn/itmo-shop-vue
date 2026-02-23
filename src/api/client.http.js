import { useUserStore } from "@/stores/store.user";
import axios from "axios"


const urlAPI = "http://shop.evgen9nc.beget.tech/api";


const http = axios.create({
  baseURL: urlAPI,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use((request) => {
  const userStore = useUserStore(); 
  
  if (userStore.token) {
      console.log(userStore);
      request.headers['Authorization'] = `Bearer ${token.value}`
  }
  return request
})

export { http }
