import firebase from 'firebase/app'

export default {
  state: {
    info: {},
  },

  mutations: {
    SET_INFO(state, info) {
      state.info = info
    },
    CLEAR_INFO (state) {
      state.info = {}
    }
  },

  actions: {
    async UPDATE_INFO({dispatch, commit, getters}, toUpdate) { // обновить инфо
      try {
        const uid = await dispatch('GET_UID')
        const updateData = {...getters.info, ...toUpdate}
        if (uid) {
          await firebase.database().ref(`/users/${uid}/userInfo`).set(updateData)
        }
        commit('SET_INFO', updateData)

      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async FETCH_INFO ({dispatch, commit}) { //получить инфо
      try {
        const uid = await dispatch('GET_UID')
        const info = (await firebase.database().ref(`/users/${uid}/userInfo`).once('value')).val();
        commit('SET_INFO', info)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
  },

  getters: {
    INFO: s => s.info
  }
}
