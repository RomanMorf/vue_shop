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
    BASKET_GET_FROM_LOCAL_STORE({ dispatch, commit, getters }) {
      const basket = localStorage.getItem('basket') || []
      commit('SET_PRODUCT_TO_BASKET', JSON.parse(basket))
    },
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
        localStorage.setItem('basket', JSON.stringify(basket))

      }
      if (index !== -1) {
        basket[index].count++
        commit('SET_PRODUCT_TO_BASKET', basket)
        localStorage.setItem('basket', JSON.stringify(basket))
      }
    },
    DELETE_FROM_BASKET({ dispatch, commit, getters }, id) {
      const basket = getters.BASKET
      const index = basket.findIndex((el) => el.id === id)
      if (index !== -1) {
        basket.splice(index, 1)
        commit('SET_PRODUCT_TO_BASKET', basket)
        localStorage.setItem('basket', JSON.stringify(basket))
      }
    },
  },
  getters: {
    BASKET: (s) => s.basket,
  },
}
