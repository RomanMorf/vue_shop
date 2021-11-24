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
    async FETCH_ORDERS_IN_PROCESSED({ dispatch, commit }) { // получить список ВЫПОЛНЯЕМЫХ заказов
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
    async FETCH_ORDER_BY_ID({ dispatch, commit }, order) { // получить список ВЫПОЛНЕНЫХ заказов
      try {
        const orderFromServer =
          (
            await firebase
              .database()
              .ref(`/orders/${order.category}`)
              .child(order.id)
              .once('value')
          ).val() || {}
        orderFromServer.id = order.id
        return orderFromServer
      } catch (error) {
        throw error
      }
    },
    async DELETE_ORDER_BY_ID({ dispatch, commit, getters }, data) { // удалить заказ по ID
      try {
        await firebase
          .database()
          .ref(`/orders/${data.status}`)
          .child(data.id)
          .remove()
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async CHANGE_ORDER_STATUS({ dispatch, commit, getters }, dataForChange) { // изменить статус заказа
      try {
        await firebase
          .database()
          .ref(`/orders/${dataForChange.newStatus}/`)
          .child(dataForChange.order.id)
          .set(dataForChange.order)
      } catch (error) {
        console.log(error.message, 'error')
        throw error
      }
      switch (dataForChange.newStatus) {
        case 'processed':
          const newOrdersInProcess = getters.ORDERS_IN_PROCESS
          newOrdersInProcess.push(dataForChange.order)
          commit('SET_ORDERS_IN_PROCESS', newOrdersInProcess)
          const newOrders = getters.ORDERS_NEW
          let idx
          newOrders.forEach((el, index) => {
            if (el.id === dataForChange.order.id) {
              idx = index
            }
          })
          newOrders.splice(idx, 1)
          commit('SET_ORDERS_NEW', newOrders)
          break;

          case 'done':
            const ordersDone = getters.ORDERS_DONE
            ordersDone.push(dataForChange.order)
            commit('SET_ORDERS_DONE', ordersDone)
            const oldOrdersInProcess = getters.ORDERS_IN_PROCESS
            let idxPrecess
            oldOrdersInProcess.forEach((el, index) => {
              if (el.id === dataForChange.order.id) {
                idxPrecess = index
              }
            })
            oldOrdersInProcess.splice(idxPrecess, 1)
            commit('SET_ORDERS_IN_PROCESS', oldOrdersInProcess)
            break;

          case 'new':
            const newOrdersArr = getters.ORDERS_NEW
            newOrdersArr.push(dataForChange.order)
            commit('SET_ORDERS_NEW', newOrdersArr)

            const oldOrdersDone = getters.ORDERS_DONE
            let idxDone
            oldOrdersDone.forEach((el, index) => {
              if (el.id === dataForChange.order.id) {
                idxDone = index
              }
            })
            oldOrdersDone.splice(idxDone, 1)
            commit('SET_ORDERS_DONE', oldOrdersDone)
            break;

        default:
          break;
      }
    },
  },
  getters: {
    ORDERS_NEW: (s) => s.ordersNew,
    ORDERS_IN_PROCESS: (s) => s.ordersInProcess,
    ORDERS_DONE: (s) => s.ordersDone,
  },
}
