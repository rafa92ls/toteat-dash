import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/Login.vue'
import Inicio from '../views/Inicio.vue'
import Categories from '../views/MenuViews/Categories'
import CategoriesDates from '../views/MenuViews/CategoriesDates'
import Products from '../views/MenuViews/Products'
import ProductsDates from '../views/MenuViews/ProductsDates'
import Zones from '../views/MenuViews/Zones'
import ZonesDates from '../views/MenuViews/ZonesDates'
import Personal from '../views/MenuViews/Personal'
import PersonalDates from '../views/MenuViews/PersonalDates'
import AdvancedSearch from '../views/MenuViews/AdvancedSearch'

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
    path: '/productos',
    name: 'productos',
    component: Products
  },
  {
    path: '/productos/fechas',
    name: 'productosFechas',
    component: ProductsDates
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
    path: '/personal',
    name: 'personal',
    component: Personal
  },
  {
    path: '/personal/fechas',
    name: 'personalFechas',
    component: PersonalDates
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
