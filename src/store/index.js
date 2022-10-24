import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {},
  getters: {
    isLoggedIn(state) {
      console.log(localStorage.getItem('Token'))
      return !!state.token || localStorage.getItem('Token') !== 'null'
    },
  },
});