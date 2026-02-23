// "BiAZikV9d76jI78wmv9_J5KZ2alwVPtnW8T"

import { useUserStore } from "@/stores/store.user";
import { http } from "../client.http"

export const userLogin = async (user) => {
    try {
        const user = useUserStore()
        // console.log(user);
        // const response = await http.post("/shop/admin/users/login", user); 
        user.setToken("BiAZikV9d76jI78wmv9_J5KZ2alwVPtnW8T")
        return true
    } catch {

    }

}

export const userLogout = async () => {
    try {
        const user = useUserStore()
        
        // const response = await http.post("/shop/admin/users/login", user); 
        // user.token = "BiAZikV9d76jI78wmv9_J5KZ2alwVPtnW8T"
        return true;
    } catch {

    }

}

