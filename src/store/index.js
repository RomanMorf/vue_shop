import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth.js'
import products from './products.js'
import categories from './categories.js'
import info from './info.js'
import basket from './basket.js'
import favorite from './favorite.js'
import compare from './compare.js'
import interfaceInfo from './interfaceInfo'
import pages from './pages'
import admin from './admin'

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
    basket,
    favorite,
    compare,
    interfaceInfo,
    pages,
    admin,
  },
})
