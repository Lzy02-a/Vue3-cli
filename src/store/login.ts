import {defineStore} from "pinia";
import {ref} from "vue";

export const useLoginStore = defineStore('login', () => {
    const isLoggedIn = ref(false);
    const getLoginStatus = () => {
        const token = localStorage.getItem('token');
        isLoggedIn.value = !!token;
    }
    return {
        isLoggedIn,
        getLoginStatus
    };
    
});