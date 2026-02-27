import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const _sess_id = ref("vWmVRi6axj-OHkiWQU8Rdv2wVMqpbsOo")

  const sess_id = computed(() => _sess_id.value)
  
  return { 
    sess_id
  }
})
