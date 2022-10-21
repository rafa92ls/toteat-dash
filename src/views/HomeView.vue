<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: "hola"
    }
  },
  created() {
    console.log('"das"')
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        console.log('ASD')
        const data = await axios.get('https://toteat-dash-backend.herokuapp.com/api/tutorials')
        this.msg = "axios"
        
      } catch (error) {
        this.msg = "error"
        console.log('ERROR', error)        
      }
    }
  }
}
</script>
