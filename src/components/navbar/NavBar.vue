<template>
  <div class="navbar navbar-expand-lg fixed-top bg-primary" data-bs-theme="dark">
    <div class="container">
      <a href="/lview" class="navbar-brand">
        <img src="@/assets/img/applogo.png" alt="Bootstrap" class="d-inline-block align-text-top">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav">
          <li class="nav-item dropdown" data-bs-theme="light" v-for="v, k in links" :key="k">
            <router-link class="nav-link awhite dropdown-toggle" aria-current="page" :to="v">
              <!-- <i class="bi bi-box-arrow-right"></i> -->
              {{ $t(k) }}
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-md-auto">
          <!-- <li class="nav-item">
            <a target="_blank" rel="noopener" class="nav-link" href="https://github.com/thomaspark/bootswatch/"><i
                class="bi bi-github"></i><span class="d-lg-none ms-2">GitHub</span></a>
          </li> -->
          <li class="nav-item py-2 py-lg-1 col-12 col-lg-auto">
            <div class="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
            <hr class="d-lg-none my-2 text-white-50">
          </li>
          <li class="nav-item" data-bs-theme="light">
            <select class="form-select sm" v-model="selectedLanguage" @change="changeLanguage">
              <option value="es">ES</option>
              <option value="ga">GA</option>
              <option value="pt">PT</option>
            </select>
          </li>
          <li class="nav-item " data-bs-theme="light">
            <a class="nav-link  d-flex align-items-center" href="#">
              <span>v{{ version }}</span>
            </a>
          </li>
          <li class="nav-item py-2 py-lg-1 col-12 col-lg-auto">
            <div class="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
            <hr class="d-lg-none my-2 text-white-50">
          </li>
          <li class="nav-item" data-bs-theme="light">
            <a class="nav-link  d-flex align-items-center" href="#">
              <i class="bi bi-circle-half" @click="$emit('logout')"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import { ref } from 'vue'
import { useLanguage } from '@/composables/useLanguage';


export default {
  name: 'NavBar',

  data() {
    const links = ref({
      'Licitaciones': '/lview',
      'Evaluaciones': '/eview',
      'Comparaciones': '/cview',
      // 'Settings': '/settings',
    })

    const { setLanguage } = useLanguage();
    const selectedLanguage = ref(localStorage.getItem('language') || 'es');

    const changeLanguage = () => {
      setLanguage(selectedLanguage.value);
    }
    return {
      version: import.meta.env.VITE_APP_VERSION,
      links,
      selectedLanguage,
      changeLanguage
    };
  },
};
</script>