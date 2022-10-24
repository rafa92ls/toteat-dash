import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/Login.vue'
import Inicio from '../views/Inicio.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/inicio',
    name: 'inicio',
    component: Inicio
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
