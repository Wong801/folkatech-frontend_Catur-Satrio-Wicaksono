<template>
  <header>
    <div class="flex relative justify-end py-7 gap-x-[1.563rem] px-[2.875rem] items-center">
      <div class="flex rounded-[9px] shadow-md">
        <input type="text" placeholder="Cari produk" class="rounded-l-[9px] px-6 w-[27.25rem]">
        <button class="bg-red-primary px-[1.875rem] py-4 rounded-r-[9px]">
          <i class="fas fa-search text-white text-2xl"></i>
        </button>
      </div>
      <button>
        <i class="far fa-heart text-2xl text-[#696969]"></i>
      </button>
      <button>
        <i class="fas fa-shopping-bag text-2xl text-[#696969]"></i>
      </button>
      <button class="flex items-center" @click="showMenu = !showMenu">
        <i class="far fa-user text-2xl text-[#696969]"></i>
        <i class="fas fa-caret-down px-1 text-[#696969]"></i>
      </button>
      <div v-if="showMenu" class="absolute bg-white border rounded-[9px] right-11 top-14 px-2 py-2 mt-8 text-center">
        <div v-if="token" class="flex flex-col gap-y-2">
          <p>Welcome, <span class="text-red-text font-semibold">{{ userData.name }}</span></p>
          <button class="bg-red-primary rounded-[7px] py-1 text-white" @click="logout">Logout</button>
        </div>
        <div v-else class="flex flex-col gap-y-2">
          <router-link to="/login" class="bg-red-primary rounded-[7px] py-1 px-8 text-white">Masuk</router-link>
          <router-link to="/register" class="bg-red-primary rounded-[7px] py-1 px-8 text-white">Daftar</router-link>
        </div>
      </div>
    </div>
    <div class="bg-[#F5F5F5] px-[4.375rem]">
      <button class="bg-red-primary text-white uppercase py-[1.375rem] px-11 text-xl">
        Belanja <i class="fas fa-caret-down px-1"></i>
      </button>
    </div>
  </header>
</template>

<script setup>
import { useStore } from 'vuex';
import { useCookies } from 'vue3-cookies';
import { parseJwt } from '../../helper/jwtParser';
import { ref } from 'vue';

const { cookies } = useCookies()
const store = useStore()
const showMenu = ref(false)
const token = cookies.get('jwt') || ''

const userData = store.state.user.userData || token ? parseJwt(token) : null

if(!store.state.user.token && token) {
  store.commit('setToken', token)
}

const logout = () => {
  cookies.remove('jwt')
  store.commit('setUserData', null)
  location.reload()
}

</script>