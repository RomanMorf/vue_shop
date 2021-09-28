import firebase from 'firebase/app'

export default {
  state: {
    basket: [],
  },
  mutations: {
    SET_PRODUCT_TO_BASKET(state, product) {
      state.basket = product
    },
    CLEAR_BSKET(state) {
      state.basket = []
    },
  },
  actions: {
    ADD_TO_BASKET({ dispatch, commit, getters }, data) {
      console.log(data, 'data from bastek')
    },
    async CREATE_PRODUCT({ dispatch, commit, getters }, data) {
      try {
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
    async FETCH_PRODUCT_BY_ID({ dispatch, commit }, id) {
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
    BASKET: (s) => s.basket,
  },
}
