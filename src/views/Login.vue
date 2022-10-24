<template>
  <div id="mainContainer">
    <Loading v-model:active="isLoading" :can-cancel="false" :is-full-page="true" />
    <div id="loginContainer">
      <h1>La pikada de la esquina</h1>
      <p>Bienvenido! - Sistema de Gestión</p>
      <div id="inputsContainer">
        <input v-model="usuario" type="text" name="usuario" placeholder="Usuario (admin)" v-on:keyup.enter="goLogin()">
        <input v-model="pass" type="password" name="pass" placeholder="Contraseña (123456)"
          v-on:keyup.enter="goLogin()">
        <button @click="goLogin()">Entrar</button>

      </div>
      <p v-if="loginError">Usuario o contraseña incorrectos</p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex"
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from '../axios'
import router from '../router/index'

export default {
  name: 'HomeView',
  components: {
    Loading
  },
  data() {
    return {
      usuario: null,
      pass: null,
      loginError: false,
      isLoading: false,
    }
  },
  methods: {
    ...mapMutations(["setUser", "setToken"]),
    async goLogin() {
      try {
        this.isLoading = true
        this.loginError = false
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(2000)
        const body = {
          user: this.usuario,
          pass: this.pass
        }

        const { data, status } = await axios.post('/api/login', body)

        if (!data.token) {
          this.setUser(null);
          this.setToken(null);
          localStorage.setItem('Token', null)
          return this.loginError = true
        }
        this.setUser(this.usuario);
        this.setToken(data.token);
        localStorage.setItem('Token', data.token)
        router.push('/inicio')

      } catch (error) {
        console.log(error);

      } finally {
        this.isLoading = false
      }
    }
  },
  created() {
    this.setUser(null);
    this.setToken(null);
    localStorage.setItem('Token', null)
  }
}
</script>

<style scoped>
#mainContainer {
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: url('../assets/login-background.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  justify-content: center;
  align-items: center;
}


#loginContainer {
  width: 50%;
  /* background-color: #3D70B2; */
  background: linear-gradient(118deg, rgba(3, 69, 154, 1) 0%, rgba(165, 240, 255, 1) 100%);
  position: relative;
  height: 50%;
  justify-content: center;
  align-items: center;
  color: #F5F7FA;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 100%);
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
}

#inputsContainer {
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 80px 0px;
  align-items: center;
  justify-content: center;
}

input {
  width: 60%;
  height: 20px;
  background: #e0dede;
  justify-content: center;
  display: flex;
  margin: 10px auto;
  padding: 5px;
  border: none;
  outline: none;
  border-radius: 5px;
}

button {
  width: 60%;
  height: 40px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: #fff;
  background: rgba(3, 69, 154, 1);
  font-size: 1em;
  font-weight: bold;
  margin-top: 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: .2s ease-in;
  cursor: pointer;
}

button:hover {
  background: rgb(36, 108, 202);
}

@media only screen and (max-width: 768px) {
  #mainContainer {
    display: flex;
    flex-direction: column;
    background-position: top;
  }

  #loginContainer {
    width: 90%;
    height: 60%;
  }

  #inputsContainer {
    padding: 60px 0px 100px 0px;
  }
}
</style>
