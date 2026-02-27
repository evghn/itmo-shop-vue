// "BiAZikV9d76jI78wmv9_J5KZ2alwVPtnW8T"

import { useUserStore } from "@/stores/store.user";
import { http } from "../client.http";

const urlProducts = "/shop/admin/products";

export const createProduct = async (data) => {
  try {
    const response = await http.post(urlProducts, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.status < 300 && response.status > 199;
  } catch {}
  return false;
};

export const updateProduct = async (id, data) => {
  try {
    const response = await http.patch(`${urlProducts}/${id}`, data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.status === 200;
  } catch {}
  return false;
};

export const getProducts = async (id = null) => {
  try {
    const url = id ? `${urlProducts}/${id}` : urlProducts;
    const response = await http.get(url);

    if (response.status === 200) {
      return response.data;
    }
  } catch {
    return false;
  }
};

export const deleteProduct = async (id = null) => {
  try {
    const response = await http.delete(`${urlProducts}/${id}`);
    return response.status === 204;
  } catch {}
  return false;
};
