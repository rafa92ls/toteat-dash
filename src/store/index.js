import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    token: null,
    isLoading: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setIsLoading(state, loading) {
      state.isLoading = loading;
    },
  },
  actions: {},
  getters: {
    isLoggedIn(state) {
      return !!state.token || !!localStorage.getItem('Token')
    },
  },
});