
<script setup>
import { useUserStore } from '@/store/useUsers.js';
import { ref, defineAsyncComponent } from 'vue';
const CardNote = defineAsyncComponent(() => import('@/components/CardNote.vue'))
const CreateNote = defineAsyncComponent(() => import('@/components/CreateNote.vue'))
import { useAuthStore } from '@/store/useAuth.js';
import router from '@/router';

const useStore = useUserStore()
const auth = useAuthStore()

await useStore.fetchUser()

const user = useStore.getUser

let isOpen = ref(false)

if (useStore.expireToken) router.push({ name: "signin"})

const logout = () =>{
    auth.logout()
    router.push({ name: "signin"})
}

</script>

<template>
    <div>
        <div class="flex place-content-between w-full max-h-50 items-center">
            <button  type="button" class=" flex w-18 h-8 p-2 m-1 rounded-md bg-gray-200 hover:bg-emerald-500 text-center items-center hover:drop-shadow-md hover:text-white" @click="isOpen = true"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span class="absolute hidden group-hover:flex -top-2 -right-3 translate-x-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm before:content-[''] before:absolute before:top-1/2  before:right-[100%] before:-translate-y-1/2 before:border-8 before:border-y-transparent before:border-l-transparent before:border-r-gray-700"
                > This is some extra useful information</span></button>
            <h2 class="flex flex-row w-24" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> {{ user.username }}</h2>
            <button class="flex w-18 h-8 p-2 m-1 rounded-md bg-gray-200	 hover:bg-emerald-500 text-center items-center hover:drop-shadow-md hover:text-white" @click.prevent="logout"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></button>
        </div>
        <div class="flex flex-col items-center pt-2 justify-center min-h-screen">
            <div class="w-11/12 h-96 mt-1 rounded-md shadow-md bg-emerald-500 bg-auto flex flex-col items-center justify-center text-white font-bold">
                <h1 class="text-[40px]">BIENVENIDO!</h1>
                <h2 class="text-[34px] overline">{{ user.name }} {{ user.lastname  }}</h2>
            </div>
            <div class="grid lg:grid-cols-3 md:grid-cols-2" >
                <div v-for="note in user.notes" :key="note.id">
                    <CardNote :note="note"/>
                </div>
            </div>
        </div>
        <teleport to='body'>
            <CreateNote :open="isOpen" @close="isOpen = !isOpen"/>
        </teleport>
    </div>
</template>

<style scoped>

</style>