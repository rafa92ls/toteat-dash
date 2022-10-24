<template>
  <sidebar-menu
    v-model:collapsed="collapsed"
    :menu="menu"
    :theme="selectedTheme"
    :show-one-child="true"
    v-if="isLoggedIn"
  />
  <div
    id="demo"
    :class="[{'collapsed' : collapsed}, {'onmobile' : isOnMobile}]"
  >
    <div class="demo">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { h, markRaw } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapGetters } from 'vuex'

const faIcon = (props) => {
  return {
    element: markRaw({
      render: () => h('div', [
        h(FontAwesomeIcon, { size: 'lg', ...props })
      ])
    })
  }
}
export default {
  name: 'App',
  data () {
    return {
      menu: [
        {
          header: 'Menu',
          hiddenOnCollapse: true
        },
        {
          href: '/',
          title: 'Inicio',
          icon: faIcon({ icon: 'fa-solid fa-circle-play' })
        },
        {
          title: 'Categorías',
          icon: faIcon({ icon: 'fa-solid fa-list-ul' }),
          child: [
            {
              href: '/',
              title: 'Totales',
              icon: faIcon({ icon: 'fa-solid fa-file-alt', size: 'sm' })
            },
            {
              href: '/',
              title: 'Por fecha',
              icon: faIcon({ icon: 'fa-solid fa-file-alt', size: 'sm' })
            }
          ]
        },
        {
          title: 'Productos',
          icon: faIcon({ icon: 'fa-solid fa-bowl-food' }),
          child: [
            {
              href: '/',
              title: 'Totales',
              icon: faIcon({ icon: 'fa-solid fa-file-alt', size: 'sm' })
            },
            {
              href: '/',
              title: 'Por fecha',
              icon: faIcon({ icon: 'fa-solid fa-file-alt', size: 'sm' })
            }
          ]
        },
        {
          title: 'Zonas',
          icon: faIcon({ icon: 'fa-solid fa-location-dot' }),
          child: [
            {
              href: '/',
              title: 'Totales',
              icon: faIcon({ icon: 'fa-solid fa-file-alt', size: 'sm' })
            },
            {
              href: '/',
              title: 'Por fecha',
              icon: faIcon({ icon: 'fa-solid fa-file-alt', size: 'sm' })
            }
          ]
        },
        {
          title: 'Personal',
          icon: faIcon({ icon: 'fa-solid fa-users' }),
          child: [
            {
              href: '/',
              title: 'Totales',
              icon: faIcon({ icon: 'fa-solid fa-file-alt', size: 'sm' })
            },
            {
              href: '/',
              title: 'Por fecha',
              icon: faIcon({ icon: 'fa-solid fa-file-alt', size: 'sm' })
            }
          ]
        },
        {
          title: 'Busqueda avanzada',
          icon: faIcon({ icon: 'fa-solid fa-magnifying-glass' }),
        },
        {
          href: '/',
          title: 'Salir',
          icon: faIcon({ icon: 'fa-solid fa-right-from-bracket' })
        },
      ],
      collapsed: false,
      themes: [
        {
          name: 'White theme',
          input: 'white-theme'
        }
      ],
      selectedTheme: 'white-theme',
      isOnMobile: false
    }
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    onResize () {
      if (window.innerWidth <= 767) {
        this.isOnMobile = true
        this.collapsed = true
      } else {
        this.isOnMobile = false
        this.collapsed = false
      }
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');
body,
html {
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 18px;
  background-color: #f2f4f7;
  color: #262626;
}
#demo {
  padding-left: 290px;
  transition: 0.3s ease;
}
#demo.collapsed {
  padding-left: 65px;
}
#demo.onmobile {
  padding-left: 65px;
}
.sidebar-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
  z-index: 900;
}
.demo {
  padding: 50px;
}
.container {
  max-width: 900px;
}
</style>
