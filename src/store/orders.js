import firebase from 'firebase/app'

export default {
  state: {
    newOrders: [],
    orders: [],
  },
  mutations: {
    SET_ORDERS(state, orders) {
      state.orders = orders
    },
    SET_NEW_ORDERS(state, newOrders) {
      state.orders = newOrders
    },
    CLEAR_ORDERS(state) {
      state.orders = []
    },
    CLEAR_NEW_ORDERS(state) {
      state.newOrders = []
    },
  },
  actions: {
    async CREATE_NEW_ORDER({ dispatch, commit, getters }, order) {
      try {
        return await firebase
          .database()
          .ref(`/orders/new/`)
          .push(order)
      } catch (error) {
        console.log(error.message, 'error')
        throw error
      }

    },
    async FETCH_NEW_ORDERS({ dispatch, commit }) {
      try {
        const orders =
          (
            await firebase
              .database()
              .ref(`/orders/new/`)
              .once('value')
          ).val() || {}
        const ordersWithId = Object.keys(orders).map((key) => ({
          ...orders[key],
          id: key,
        }))
        commit('SET_NEW_ORDERS', ordersWithId)
        return ordersWithId
      } catch (error) {
        throw error
      }
    },
    async FETCH_ORDERS({ dispatch, commit }) {
      try {
        const orders =
          (
            await firebase
              .database()
              .ref(`/orders/processed`)
              .once('value')
          ).val() || {}
        const ordersWithId = Object.keys(orders).map((key) => ({
          ...orders[key],
          id: key,
        }))
        console.log(ordersWithId, 'FETCH_ORDERS from store');
        commit('SET_ORDERS', ordersWithId)
        return ordersWithId
      } catch (error) {
        throw error
      }
    },

  },
  getters: {
    NEW_ORDERS: (s) => s.newOrders,
    ORDERS: (s) => s.orders,
  },
}
