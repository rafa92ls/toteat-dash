import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/Login.vue'
import Inicio from '../views/Inicio.vue'
import Categories from '../views/MenuViews/Categories'
import CategoriesDates from '../views/MenuViews/CategoriesDates'
import Zones from '../views/MenuViews/Zones'
import ZonesDates from '../views/MenuViews/ZonesDates'
import Meseros from '../views/MenuViews/Meseros'
import Cajeros from '../views/MenuViews/Cajeros'
import AdvancedSearch from '../views/MenuViews/AdvancedSearch'
import PaymentMethods from '../views/MenuViews/PaymentMethods'

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
  },
  {
    path: '/categorias',
    name: 'categorias',
    component: Categories
  },
  {
    path: '/categorias/fechas',
    name: 'categoriasFechas',
    component: CategoriesDates
  },
  {
    path: '/zonas',
    name: 'zonas',
    component: Zones
  },
  {
    path: '/zonas/fechas',
    name: 'zonasFechas',
    component: ZonesDates
  },
  {
    path: '/meseros',
    name: 'meseros',
    component: Meseros
  },
  {
    path: '/cajeros',
    name: 'cajeros',
    component: Cajeros
  },
  {
    path: '/medios-pago',
    name: 'mediosPago',
    component: PaymentMethods
  },
  {
    path: '/busqueda-avanzada',
    name: 'busqueda',
    component: AdvancedSearch
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
