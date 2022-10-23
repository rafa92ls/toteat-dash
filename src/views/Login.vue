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
import axios from '../axios'

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
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        await localStorage.setItem('Token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjY2NTYwNTMwLCJleHAiOjE2NjY2NDY5MzB9.K9eFJBx03zXl72jG9i2mjcWMdbNZfp6o9MbSyv52R18')
        const data = await axios.get('api/ventas')
        
      } catch (error) {
        this.msg = "error"   
      }
    }
  }
}
</script>
