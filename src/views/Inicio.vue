<template>
  <div class="about">
    <h1>Bienvenido(a) al sistema de gestión de
      <p>La pikada de la esquina!</p>
    </h1>
    <p>A tu izquierda encontrarás los distintos paneles con la información
      de ventas, agrupadas por:
    </p>
    <ul>
      <li>Categorías</li>
      <li>Productos</li>
      <li>Zonas</li>
      <li>Personal</li>
      <li>Búsqueda avanzada</li>
    </ul>
    <p>ads</p>
  </div>
</template>

<script>
import router from '../router/index'
export default {
    created() {
      if(localStorage.getItem('Token') === 'null') {
        router.push('/')
      }
    }
}
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;;
  justify-content: center;
  align-items: center;
  text-align: center;
}

ul {
  text-align: left;
}
</style>
