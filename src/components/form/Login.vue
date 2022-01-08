<template>
  <form class="box-form" @submit.prevent="login">
    <div class="pt-[2.625rem] pb-[2.125rem]">
      <h1 class="text-red-text font-bold text-[1.625rem]">Masuk</h1>
      <div class="flex flex-col gap-y-[1.563rem] pt-9 pb-5">
        <div>
          <input v-model="form.email" type="email" placeholder="Email" class="input-form">
          <p v-if="empty.email" class="text-red-text text-xs">Email tidak boleh kosong</p>
        </div>
        <div>
          <input v-model="form.password" type="password" placeholder="Password" class="input-form">
          <p v-if="empty.password" class="text-red-text text-xs">Password tidak boleh kosong</p>
        </div>
      </div>
      <div class="flex justify-end pb-7">
        <router-link to="#" class="text-red-text text-xs">Lupa Password?</router-link>
      </div>
      <input type="submit" class="button-form cursor-pointer" value="Masuk">
    </div>
    <div class="text-center border-t mx-10 border-[#C2C2C2] pt-9 pb-[1.813rem]">
      <p>Belum punya akun? <router-link to="/register" class="text-red-text font-bold">Daftar Sekarang</router-link></p>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useCookies } from "vue3-cookies"
import router from '../../router';

const store = useStore()

const { cookies } = useCookies()

const empty = reactive({
  email: false,
  password: false
})

const form = reactive({
  email: '',
  password: ''
})

const login = async () => {
  const user = { ...form }

  for(const key in user){
    if(!user[key]) {
      empty[key] = true
    }
  }

  try {
    const res = await store.dispatch('login', user)
    cookies.set('jwt', res)
    return router.push({
      name: 'Home'
    })
  } catch (error) {    
    console.log(error)
    alert('username atau password salah')
  }
}
</script>