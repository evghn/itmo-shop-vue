// "BiAZikV9d76jI78wmv9_J5KZ2alwVPtnW8T"

import { useUserStore } from "@/stores/store.user";
import { http } from "../client.http";

const userUrl = "/shop/admin/users";

export const userLogin = async (userData, admin) => {
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

export const userLogout = async () => {
  try {
    const user = useUserStore();
    const response = await http.post(`${userUrl}/logout`, user);

    return true;
  } catch {
    return false;
  }
};
