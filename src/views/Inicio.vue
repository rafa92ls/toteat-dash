<template>
  <div class="about">
    <h1>Bienvenido(a) al sistema de gestión de
      <p>La pikada de la esquina!</p>
    </h1>
    <p>
      A tu izquierda encontrarás los distintos paneles con la información
      de ventas, agrupadas por:
    </p>
    <ul>
      <li>Categorías</li>
      <li>Productos</li>
      <li>Zonas</li>
      <li>Personal</li>
      <li>Medios de pago</li>
      <li>Búsqueda avanzada</li>
    </ul>
    <p>Podrás ver el total de ventas y cantidades vendidas, para todo el periodo o por fechas específicas (desde el 01-01-2019
      hasta el 31-03-2019)</p>
    <p id="firstTutorial">Puedes navegar en la barra lateral por las distintas opciones de visualización</p>
    <img src="../assets/tutorial2.gif" class="animated-gif"/>
    <p>Y también puedes ocultar la barra lateral</p>
    <img src="../assets/tutorial1.gif" class="animated-gif"/>
    <br />
  </div>
</template>

<script>
import router from '../router/index'
export default {
    created() {
      if(!localStorage.getItem('Token')) {
        router.push('/')
      }
    }
}
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

ul {
  text-align: left;
}

h1 {
  text-align: center;
}

img.animated-gif{
  width: 600px;
  height: auto;
}

#firstTutorial {
  border-top: 1px solid gray;
  padding-top: 25px;
}
</style>
