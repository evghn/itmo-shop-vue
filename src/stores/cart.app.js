import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { addCartProduct, decCartProduct, getUserCart } from "@/api/shop/cart.api";
import { useAppStore } from "./store.app";

export const useCartStore = defineStore("cart", () => {
  const _cart = ref({
    items: {

    },
    amount: 0,
    total: 0,
  });
  
  const cart = computed(() => _cart.value); 

  const getCart = async () => {
    try {
      const res = await getUserCart(); 
      const data = res.data.data;
      _cart.value = {
        ...data.cart
      }


      if (data.items.length) {
        const dataItems = {};
        data.items.forEach(item => {
          dataItems[item.product_id] = item;          
        })

        _cart.value["items"] = dataItems
        console.log(_cart.value);
        
      }
    } catch (err) {
      console.log(err);
      
    }
  } 


  const addToCart = async (product_id) => {
       
    try {
      let amount = 1;

     
      
      if (product_id in _cart.value.items) {
        amount = _cart.value.items[product_id].amount + 1
        console.log(amount);
      } 

      const res = await addCartProduct(product_id, amount); 
      if (res) {
        const app = useAppStore();
        app.setFlash("Товар успешно добавлен в корзину");
        await getCart()
        return true
      }
      console.log(res);
     

    } catch (err) {
      console.log(err);
      
    }
  } 


  
const decInCart = async (product_id) => {
       
    try {
      let amount = 1;
    if (product_id in _cart.value.items) {
        amount = _cart.value.items[product_id].amount - 1
        
      } 
      
      const res = await decCartProduct(product_id, amount); 
      if (res) {
        const app = useAppStore();
       
        await getCart()
        return true
      }
      console.log(res);
     

    } catch (err) {
      console.log(err);
      
    }
  } 


  



  return {
    cart,
    getCart,
    addToCart,
    decInCart,
  };
});
