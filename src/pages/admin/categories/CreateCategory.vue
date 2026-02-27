<script setup>
import { createCategory } from "@/api/admin/category.api";
import { ref } from "vue";
import { useRouter } from "vue-router";

// import router from '@/router';
const router = useRouter();
const title = ref();

// const handleCreate = () => {
//   router.push()
// }

const reset = () => {
  title.value = "";
};

const submit = async () => {
  if (title.value && title.value.length) {
    const data = {
      meta: {
        title: title.value,
      },
    };
    const response = await createCategory(data);
    if (response) {
      router.push({ name: "categories" });
    }
  }
};
</script>
<template>
  <div class="card card-primary">
    <div class="card-header">
      <h3 class="text-lg font-medium text-gray-800">Basic Form Elements</h3>
    </div>
    <div class="card-body">
      <div class="form-group">
        <label class="form-label">Title</label>
        <input
          v-model.trim="title"
          type="text"
          class="form-control"
          placeholder="Enter title category..."
        />
      </div>

      <div class="form-group">
        <label class="form-label">File Input</label>
        <input type="file" class="form-control" />
      </div>

      <div class="flex gap-2">
        <button @click="submit" class="btn btn-primary">Submit</button>
        <button @click="reset" class="btn btn-secondary">Reset</button>
      </div>
    </div>
  </div>
</template>
