<template>
  <form class="box-form" @submit.prevent="register">
    <div v-if="step === 1" class="pt-[2.625rem] pb-[2.125rem]">
      <h1 class="text-red-text font-bold text-[1.625rem]">Daftar Sekarang</h1>
      <div class="flex flex-col gap-y-[1.563rem] pt-9 pb-[2.875rem]">
        <input v-model="form.name" type="text" placeholder="Nama Depan" class="input-form" required>
        <input v-model="form.lastName" type="text" placeholder="Nama Belakang" class="input-form">
        <div class="w-full">
          <input v-model="form.email" type="email" placeholder="Email" class="input-form" @keyup="validateEmail">
          <p v-if="!emailValid" class="text-red-text text-xs">Format email salah</p>
        </div>
      </div>
      <button class="button-form" @click="step = 2">
        Selanjutnya
      </button>
    </div>
    <div v-else-if="step === 2" class="pt-[2.188rem] pb-[1.875rem]">
      <button class="flex items-center" @click="step = 1">
        <img src="@/assets/svg/arrow-left.svg" alt="">
        <h4 class="text-red-text font-semibold text-lg">Kembali</h4>
      </button>
      <div class="flex flex-col gap-y-[1.563rem] pt-9 pb-[2.875rem]">
        <input v-model="form.phone" type="number" placeholder="Nomor Telepon" class="input-form">
        <input v-model="form.password" type="password" placeholder="Password" class="input-form">
        <div class="w-full">
          <input v-model="form.confirmPassword" type="password" placeholder="Konfirmasi Password" class="input-form">
          <p v-if="form.confirmPassword && form.confirmPassword !== form.password" class="text-red-text text-xs">Password tidak sesuai</p>
        </div>
      </div>
      <input type="submit" value="Selanjutnya" class="button-form cursor-pointer">
    </div>
    <div class="text-center border-t mx-10 border-[#C2C2C2] pt-9 pb-[1.813rem]">
      <p>Sudah punya akun? <router-link to="/login" class="text-red-text font-bold">Masuk</router-link></p>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import router from '../../router';


const store = useStore()
const step = ref(1)
const emailValid = ref(true)

const form = reactive({
  name: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const validateEmail = () => {
  emailValid.value = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)
}

const register = async () => {
  let errors = []
  const user = { ...form }
  
  for(const key in user) {
    if(!user[key]){
      errors.push(`${key} tidak boleh kosong`)
    }
  }

  if(errors.length) {
    return alert('Silahkan isi semua input')
  }

  if(user.password.length < 8) {
    return alert('Password minimal 8 karakter')
  }

  const payload = {
    name: user.name,
    email: user.email,
    password: user.password,
    phone: user.phone
  }

  try {
    const res = await store.dispatch('register', payload)
    alert(res)
    return router.push('/login')
  } catch (error) {
    alert(error)
  }
}
</script>
