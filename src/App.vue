<template>
<div v-if="['login','error'].includes($route.name)" >
    <router-view/>
  </div>

  <div v-else>
    <NavBar @logout="logout"/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>


<script>
import { useRouter } from 'vue-router'
import NavBar from '@/components/navbar/NavBar.vue'
import AuthService from '@/authreq/auth';

export default {
  name: 'App',
  components: {NavBar},
  setup() {
    const router = useRouter();
    const logout = () => {
      AuthService.logout();
      router.push('/login');
    }
    return {
      logout
    };
  }
}
</script>

