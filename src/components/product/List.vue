<script setup>
import { computed, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const params = reactive({
  keyword: '',
  price: '',
  page: 1,
  limit: 12,
  order: 'product_name,ASC'
})

onMounted(async () => {
  await store.dispatch('getProductList', params)
})

const productList = computed(() => store.state.product.list)
const formatName = (name) => {
  name = name.split('-')
  if(name.length > 1) {
    return name[1]
  }
  return name.join('')
}
const setImage = (images) => {
  let url = ''
  images.forEach(image => {
    if(image['is_primary']) {
      url = image['image_url']
    }
  })
  return url
}

</script>

<template>
  <div>
    <div class="grid grid-cols-3 gap-x-4 gap-y-[2.188rem] pt-[2.125rem] px-[1.125rem]">
      <div v-for="product in productList" :key="product.id" class="text-center border rounded-[4px] px-4 pt-6 shadow-md">
        <img :src="setImage(product.images)" :alt="product.name" class="relative">
        <div class="py-5">
          <h1>{{ formatName(product.name) }}</h1>
          <p>{{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>