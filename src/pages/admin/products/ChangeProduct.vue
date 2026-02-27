<script setup>
import { getCategories } from "@/api/admin/category.api";
import {
  createProduct,
  getProducts,
  updateProduct,
} from "@/api/admin/product.api";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCategoriesData } from "../lib/getCategories";

// import router from '@/router';
const router = useRouter();
const route = useRoute();
const title = ref();
const categories = ref([]);
const categoryId = ref();
const productId = ref();
const images = ref([])
const inputImages = ref()
const responseError = ref(false)
const recommended = ref(false)
const price = ref(0)


const reset = () => {
  title.value = "";
};
const back = () => {
  router.push({name: "products"});
};

const submit = async () => {
  if (title.value && title.value.length) {
    const meta = {
      title: title.value,
      recommended: recommended.value,
      price: price.value
    };
    const formData = new FormData();
    formData.append('meta', JSON.stringify(meta));
    formData.append("category_id", categoryId.value);


    const files = inputImages.value?.files;

    if (files && files.length > 0) {
      Array.from(files).forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });
    }

    const response = await (async () => {
      if (productId.value) {
        //update\
        return await updateProduct(productId.value, formData);
      } else {
        // create
        return await createProduct(formData);
      }
    })();
    if (response) {
      router.push({ name: "products" });
    }
  }
};

onMounted(async () => {
  console.log(route.params?.id);

  if (route.params?.id) {
    productId.value = route.params.id;
    const response = await getProducts(productId.value);

    if (response) {
      const data = response.data[0];
      title.value = data.meta.title;
      categoryId.value = data.category_id;
      recommended.value = data.meta.recommended;
      price.value = data.meta?.price ?? 0
      if (data.images.length) {
         images.value = [ ...data.images ]; 
      }

    } else {
      responseError.value = true
    }
  }

  const responseCategories = await getCategories();
  if (responseCategories) {
    categories.value = getCategoriesData(responseCategories.data);
  }
});
</script>
<template>
  <div class="card card-primary">
    <div class="card-header">
      <h3 class="text-lg font-medium text-gray-800">
        <span v-if="productId">Редактирование товара</span>
        <span v-else>Создание товара</span>
      </h3>
    </div>
    <div class="card-body">
      <div class="form-group">
        <label class="form-label">Select category</label>
        <select class="form-control" v-model="categoryId">
          <option v-for="item in categories" :key="item.id" :value="item.id">
            {{ item.title }}
          </option>
        </select>
      </div>
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
        <label class="form-label">Price</label>
        <input
          v-model.number="price"
          type="text"
          class="form-control"
          placeholder="Enter title category..."
        />
      </div>
     
        

      <div class="form-check my-3">
        <input type="checkbox" class="form-check-input" v-model="recommended"  >
        <label class="form-check-label" for="check1">Рекомендуемый товар</label>
      </div>

      <div class="form-group">
        <label class="form-label">Product images</label>
        <input type="file" class="form-control" ref="inputImages" multiple  />
      </div>

       <div class="mt-3 mb-4">
         <div>Текущие фото</div>
              <div v-if="images.length" class="flex gap-3 p-3">
                <img v-for="(image, key) in images"
                  :key
                  :src="image"
                  class="w-50  border border-gray-300 rounded"
                  :alt="title"
                 />

              </div>
                  <div v-else>Фото отсутствует </div> 
      </div>

      <div class="flex gap-2">
        <button @click="back" class="btn btn-info">Back</button>
        <button @click="submit" class="btn btn-primary">Submit</button>
        <button @click="reset" class="btn btn-secondary">Reset</button>
      </div>
    </div>
    <div v-if="responseError" class="p-5 bg-red-800 text-gray-200 m-3">
       Ошибка запроса на сервер
    </div>
  </div>
</template>
