import firebase from 'firebase/app'

export default {
  state: {
    products: [],
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    CLEAR_SET_PRODUCTS(state) {
      state.products = []
    },
  },
  actions: {
    async CREATE_PRODUCT({ dispatch, commit, getters }, data) { // создать продукт
      console.log(data);
      try {
        return await firebase
          .database()
          .ref(`/products/${data.id}`)
          .set(data)
      } catch (error) {
        console.log(error.message, 'error')
        throw error
      }
    },
    async EDIT_PRODUCT({ dispatch, commit }, newInfo) { // редактировать продукт
      try {
        await firebase
          .database()
          .ref(`/products/`)
          .child(newInfo.id)
          .set(newInfo)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async DELETE_PRODUCT({ dispatch, commit }, data) { // удалить продукт
      try {
        await firebase
          .database()
          .ref(`/products/`)
          .child(data.id)
          .remove()
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async FETCH_PRODUCTS({ dispatch, commit }) { // получить все продукты от сервера
      try {
        const products =
          (
            await firebase
              .database()
              .ref(`/products/`)
              .once('value')
          ).val() || {}
        const newProducts = Object.keys(products).map((key) => ({
          ...products[key],
          id: key,
        }))
        commit('SET_PRODUCTS', newProducts)
        return newProducts
      } catch (error) {
        throw error
      }
    },
    async FETCH_PRODUCT_BY_ID({ dispatch, commit }, id) { // получить продукт по ID
      try {
        const product =
          (
            await firebase
              .database()
              .ref(`/products/`)
              .child(id)
              .once('value')
          ).val() || {}
        return product
      } catch (error) {
        throw error
      }
    },
  },
  getters: {
    PRODUCTS: (s) => s.products,
  },
}
