// "BiAZikV9d76jI78wmv9_J5KZ2alwVPtnW8T"

import { useUserStore } from "@/stores/store.user";
import { http } from "../client.http";

const userUrl = "/shop/admin/users";

export const adminLogin = async (userData, admin) => {
  try {
    const user = useUserStore();
    if (admin) {
      const response = await http.post(`${userUrl}/login`, userData);

      return response.data.data.token;
    }

    // user.setToken("BiAZikV9d76jI78wmv9_J5KZ2alwVPtnW8T")
    return true;
  } catch {
    return false;
  }
};

export const adminCheckAuth = async (token) => {
  try {
    return await checkAuth(`${userUrl}`, token);
  } catch (e) {
    return e.data;
  }
};
