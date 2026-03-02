import { useAppStore } from "@/stores/store.app";
import { useUserStore } from "@/stores/store.user";
import axios from "axios";

const urlAPI = "/api";

const http = axios.create({
  baseURL: urlAPI,
  timeout: 3000,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

http.interceptors.request.use((request) => {
  const userStore = useUserStore();
  const app = useAppStore();

  if (!("Content-Type" in request.headers)) {
    request.headers["Content-Type"] = "application/json";
  }

  if (app.sess_id) {
    request.headers["sess-id"] = app.sess_id;
  }

  if (userStore.token) {
    // console.log(userStore);
    request.headers["Authorization"] = `Bearer ${userStore.token}`;
  }
  return request;
});

export { http };
