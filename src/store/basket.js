import firebase from 'firebase/app'

export default {
  state: {
    basket: [],
  },
  mutations: {
    SET_PRODUCT_TO_BASKET(state, products) {
      state.basket = products
    },
    CLEAR_BSKET(state) {
      state.basket = []
    },
  },
  actions: {
    ADD_TO_BASKET({ dispatch, commit, getters }, data) {
      const id = data.id
      const basket = getters.BASKET
      const index = basket.findIndex((el) => el.id === id)
      if (index === -1) {
        const product = {
          ...data,
          count: 1,
        }
        basket.push(product)
        commit('SET_PRODUCT_TO_BASKET', basket)
      }
      if (index !== -1) {
        basket[index].count++
        commit('SET_PRODUCT_TO_BASKET', basket)
      }
    },
    DELETE_FROM_BASKET({ dispatch, commit, getters }, id) {
      const basket = getters.BASKET
      const index = basket.findIndex((el) => el.id === id)
      if (index !== -1) {
        basket.splice(index, 1)
        commit('SET_PRODUCT_TO_BASKET', basket)
      }
    },
  },
  getters: {
    BASKET: (s) => s.basket,
  },
}
