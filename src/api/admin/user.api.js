// "BiAZikV9d76jI78wmv9_J5KZ2alwVPtnW8T"

import { useUserStore } from "@/stores/store.user";
import { http } from "../client.http"

export const userLogin = async (userData, admin) => {
    try {
        const user = useUserStore()
        if (admin) {
            const response = await http.post("/shop/admin/users/login", userData); 
            
            return response.data.data.token;
        }
        
        // user.setToken("BiAZikV9d76jI78wmv9_J5KZ2alwVPtnW8T")
        return true
    } catch {
        return false
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

