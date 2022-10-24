import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

import './fontawesome'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

const app = createApp(App).use(store).use(router)
app.use(VueSidebarMenu)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
