import firebase from 'firebase/app'

export default {
  state: {
    ordersNew: [],
    ordersDone: [],
    ordersInProcess: [],
  },
  mutations: {
    SET_ORDERS_NEW(state, ordersNew) {
      state.ordersNew = ordersNew
    },
    SET_ORDERS_IN_PROCESS(state, ordersInProcess) {
      state.ordersInProcess = ordersInProcess
    },
    SET_ORDERS_DONE(state, ordersDone) {
      state.ordersDone = ordersDone
    },
  },
  actions: {
    async CREATE_NEW_ORDER({ dispatch, commit, getters }, order) { // создать новый заказ
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
    async FETCH_ORDERS_NEW({ dispatch, commit }) { // получить список НОВЫХ заказов
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
        commit('SET_ORDERS_NEW', ordersWithId)
        return ordersWithId
      } catch (error) {
        throw error
      }
    },
    async FETCH_ORDERS_IN_PROCESS({ dispatch, commit }) { // получить список ВЫПОЛНЯЕМЫХ заказов
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
        commit('SET_ORDERS_IN_PROCESS', ordersWithId)
        return ordersWithId
      } catch (error) {
        throw error
      }
    },
    async FETCH_ORDERS_DONE({ dispatch, commit }) { // получить список ВЫПОЛНЕНЫХ заказов
      try {
        const orders =
          (
            await firebase
              .database()
              .ref(`/orders/done`)
              .once('value')
          ).val() || {}
        const ordersWithId = Object.keys(orders).map((key) => ({
          ...orders[key],
          id: key,
        }))
        commit('SET_ORDERS_DONE', ordersWithId)
        return ordersWithId
      } catch (error) {
        throw error
      }
    },

  },
  getters: {
    ORDERS_NEW: (s) => s.ordersNew,
    ORDERS_IN_PROCESS: (s) => s.ordersInProcess,
    ORDERS_DONE: (s) => s.ordersDone,
  },
}
