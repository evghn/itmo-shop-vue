import { useUserStore } from "@/stores/store.user";
import { http } from "../client.http";
import { AxiosError } from "axios";
import { checkAuth } from "../public/public.user.api";

const userUrl = "/shop/users";

export const userLogin = async (userData, admin) => {
  let res;

  res = await http.post(`${userUrl}/login`, userData).catch((error) => {
    res = error.response.data;
    // console.log(res);
    throw res;
  });
  return res.data.data.token;
};

export const userLogout = async () => {
  try {
    const user = useUserStore();
    await http.post(`${userUrl}/logout`, user);
    return true;
  } catch {
    return false;
  }
};

export const userRegister = async (userData) => {
  const response = await http.post(`${userUrl}`, userData).catch((err) => {
    throw err.response;
  });

  return response.status === 201;
};

export const userCheckAuth = async (token) => {
  try {
    const res = await checkAuth(`${userUrl}`, token);
    console.log(res);
  } catch (e) {
    console.log(e);

    return e.message;
  }
};
