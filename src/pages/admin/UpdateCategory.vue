<script setup>
import { categoryCreate } from '@/api/admin/category.api';
import { http } from '@/api/client.http';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// import router from '@/router';
const router = useRouter();
const route = useRoute()
const title = ref();
const category = ref()
const categoryId = ref()

const handleCreate = () => {
  router.push()
}

const reset = () => {
  title.value = ""
}

const submit = async () => {
  if (title.value && title.value.length) {
    const data = {
     meta: {
       title: title.value
     } 
    };
    const response = await http.patch(`/shop/admin/categories/${categoryId.value}`, data);
    console.log(response);
    
    if (response) {
      // router.push({name: "categories"})
    }
  }
}


onMounted(async () => {
   categoryId.value = route.params.id;

  const response = await http.get(`/shop/admin/categories/${categoryId.value}`)
  // console.log(response);
  if (response.status === 200) {
    title.value = response.data.data[0].meta.title;
  } 
  
})

</script>
<template>
  <div class="card card-primary">
    <div class="card-header">
      <h3 class="text-lg font-medium text-gray-800">Basic Form Elements</h3>
    </div>
    <div class="card-body">
      
        <div class="form-group">
          <label class="form-label">Title</label>
          <input v-model.trim="title" type="text" class="form-control" placeholder="Enter title category...">
        </div>

        <div class="form-group">
          <label class="form-label">File Input</label>
          <input type="file" class="form-control">
        </div>

        <div class="flex gap-2">
          <button @click="submit" class="btn btn-primary">Submit</button>
          <button @click="reset" class="btn btn-secondary">Reset</button>
        </div>
      
    </div>
  </div>
</template>