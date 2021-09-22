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
    async CREATE_PRODUCT({ dispatch, commit, getters }, data) {
      console.log('stating create product');
      try {
        console.log(data, 'data')

        return await firebase
          .database()
          .ref(`/products/`)
          .push(data)
      } catch (error) {
        console.log(error.message, 'error')
        throw error
      }
    },
    async EDIT_PRODUCT({ dispatch, commit }, newInfo) {
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
    async DELETE_PRODUCT({ dispatch, commit }, data) {
      console.log(data.id, 'id')
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
    async FETCH_PRODUCTS({ dispatch, commit }) {
      try {
        const products =
          (
            await firebase
              .database()
              .ref(`/products/`)
              .once('value')
          ).val() || {}

        return Object.keys(products).map((key) => ({
          ...products[key],
          id: key,
        }))
      } catch (error) {
        throw error
      }
    },
  },
  getters: {
    GET_PRODUCTS: (s) => s.products,
  },
}
