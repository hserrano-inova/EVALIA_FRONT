import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import LicitacionesView from '../views/LicitacionesView.vue'
import LicitacionesDataView from '../views/LicitacionesDataView.vue'
import EvaluacionesView from '../views/EvaluacionesView.vue'
import EvaluacionesDataView from '../views/EvaluacionesDataView.vue'
import ErrorView from '../views/ErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/lview',
      name: 'lview',
      component: LicitacionesView,
      meta: { requiresAuth: true } 
    },
    {
      path: '/ldata',
      name: 'ldata',
      component: LicitacionesDataView,
      meta: { requiresAuth: true } 
    },
    {
      path: '/eview',
      name: 'eview',
      component: EvaluacionesView,
      meta: { requiresAuth: true } 
    },
    {
      path: '/edata',
      name: 'edata',
      component: EvaluacionesDataView,
      meta: { requiresAuth: true } 
    },
    {
      path: '/error',
      name: 'error',
      component:ErrorView
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/error",
    },
    
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Esta ruta requiere autenticación
    if (!isAuthenticated()) {
      // Si no está autenticado, redirige a la página de login
      next('/login')
    } else {
      next() // Si está autenticado, permite la navegación
    }
  } else {
    next() // Asegúrate de llamar siempre a next()!
  }
})

// Función para verificar si el usuario está autenticado
function isAuthenticated() {
  const token = localStorage.getItem('evalia_token') // o donde sea que almacenes el token
  return !!token // Retorna true si el token existe, false si no
}

export default router
