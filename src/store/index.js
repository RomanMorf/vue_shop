import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth.js'
import products from './products.js'
import categories from './categories.js'
import info from './info.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
  },
  actions: {},
  getters: {
    error: (s) => s.error,
  },
  modules: {
    products,
    categories,
    auth,
    info,
  },
})
