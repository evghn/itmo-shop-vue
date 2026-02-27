// "BiAZikV9d76jI78wmv9_J5KZ2alwVPtnW8T"

import { useUserStore } from "@/stores/store.user";
import { http } from "../client.http";

export const categoryCreate = async (data) => {
  try {
    const response = await http.post("/shop/admin/categories", data, {
    //   headers: {
        // "Content-Type": "multipart/form-data",
    //   },
    });
    if (response.status === 201) {
        return true;
    }
  } catch {
    return false;
  }
};

export const getCategories = async () => {
  try {
    const response = await http.get("/shop/admin/categories");
   
    if (response.status === 200) {
      return response.data;
        
    }
    

  } catch {
    return false
  }
};

