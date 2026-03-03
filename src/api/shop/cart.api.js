// "BiAZikV9d76jI78wmv9_J5KZ2alwVPtnW8T"

import { http } from "../client.http";


const urlCart = "/shop/cart";

export const addCartProduct = async (id, amount) => {
  try {
    //"POST api/shop/cart/add/id"
    const url = `${urlCart}/add/${id}`;
    const data = {
      amount: amount
    }
    const response = await http.post(url, data, {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      }).catch(err => {
        
        console.log(err);
        throw err.response
      });
    return response;
    
  } catch (err) {
    throw err
  }  
};



export const decCartProduct = async (id, amount) => {
  try {
   
    const url = `${urlCart}/dec/${id}`;
    const data = {
      amount: amount
    }
    const response = await http.post(url, data, {
       
      }).catch(err => {
        
        console.log(err);
        throw err.response
      });
    return response;
    
  } catch (err) {
    throw err
  }  
};




export const getUserCart = async () => {
  try {
    const url = urlCart;
    const response = await http.get(url).catch(err => {
        
      
        throw err.response
      });
    return response;
    
  } catch (err) {
    throw err
  }
};
