import firebase from 'firebase/app'

export default {
  state: {
    info: {},
  },
  mutations: {
    SET_USER_INFO(state, info) {
      state.info = info
    },
    CLEAR_USER_INFO(state) {
      state.info = {}
    },
  },
  actions: {
    async FETCH_USER_INFO({ dispatch, commit }) {
      const user = await dispatch('GET_USER_DATA')
      commit('SET_USER_INFO', user)
    },
    async UPDATE_USER_INFO({ dispatch, commit, getters }, toUpdate) {
      const uid = await dispatch('GET_UID')
      console.log(uid);
    },
  },
  getters: {
    GET_USER_INFO: (s) => s.info,
  },
}