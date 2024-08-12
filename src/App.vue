<template>
<div v-if="['login','error'].includes($route.name)" >
    <router-view/>
  </div>

  <div v-else>
    <NavBar @logout="logout"/>
    <div class="container">
      <router-view/>
    </div>
    <footer class="bg-light text-center fixed-bottom">
  <div class="container">
    <a href="https://inovalabs.es/" target="_blank"><img src="@/assets/img/logo_inova.png" alt="Bootstrap" class="d-inline-block align-text-top"></a>
    <span style="vertical-align:bottom;">© 2024 Copyright: <b>Inovalabs.es</b></span>
  </div>
</footer>
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

