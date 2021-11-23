export default {
  state: {
    basket: [],
  },
  mutations: {
    SET_PRODUCT_TO_BASKET(state, products) {
      state.basket = products
    },
    CLEAR_BASKET(state) {
      state.basket = []
    },
  },
  actions: {
    BASKET_GET_FROM_LOCAL_STORE({ dispatch, commit, getters }) { // получить массив из локального хранилища
      if (localStorage.basket) {
        const basket = localStorage.getItem('basket') || []
        commit('SET_PRODUCT_TO_BASKET', JSON.parse(basket))
      }
    },
    ADD_TO_BASKET({ dispatch, commit, getters }, data) { // добавть товар в корзину
      const id = data.id || data
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
    DELETE_FROM_BASKET({ dispatch, commit, getters }, id) { // удалить товар из корзины
      const basket = getters.BASKET
      const index = basket.findIndex((el) => el.id === id)
      if (index !== -1) {
        basket.splice(index, 1)
        commit('SET_PRODUCT_TO_BASKET', basket)
        localStorage.setItem('basket', JSON.stringify(basket))
      }
    },
    CLEARE_BASKET({ dispatch, commit, getters }) { // очистить корзину
      const basket = []
      commit('SET_PRODUCT_TO_BASKET', basket)
      localStorage.setItem('basket', JSON.stringify(basket))
    },
    BASKET_PRODUCT_INCREMENT({ dispatch, commit, getters }, data) { // увеличить количество товара в корзине на 1
      const id = data.id || data
      const basket = getters.BASKET
      const index = basket.findIndex((el) => el.id === id)
      basket[index].count++
      commit('SET_PRODUCT_TO_BASKET', basket)
      localStorage.setItem('basket', JSON.stringify(basket))
    },
    BASKET_PRODUCT_DECREMENT({ dispatch, commit, getters }, data) { // уменьшить количество товара в корзине на 1
      const id = data.id || data
      const basket = getters.BASKET
      const index = basket.findIndex((el) => el.id === id)
      if (basket[index].count == 1) {
        basket.splice(index, 1)
        commit('SET_PRODUCT_TO_BASKET', basket)
        localStorage.setItem('basket', JSON.stringify(basket))
      } else {
        basket[index].count--
        commit('SET_PRODUCT_TO_BASKET', basket)
        localStorage.setItem('basket', JSON.stringify(basket))
      }
    },
  },
  getters: {
    BASKET: (s) => s.basket,
  },
}
