import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const sess_id = ref("vWmVRi6axj-OHkiWQU8Rdv2wVMqpbsOo")
  
  return { 
    sess_id
  }
})
