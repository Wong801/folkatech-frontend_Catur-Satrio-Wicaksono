<script setup>
import LayoutHeader from '@/components/layout/Header.vue'
import ProductList from '@/components/product/List.vue'
import { onMounted } from 'vue';
import { useCookies } from 'vue3-cookies';
import router from '../router';

const { cookies } = useCookies()

onMounted(() => {
  if(!cookies.get('jwt')) {
    router.push('/login')
  }
})
</script>
<template>
  <LayoutHeader />
  <div class=" px-[4.375rem]">
    <ProductList />
  </div>
</template>
