import firebase from 'firebase/app'

// ========== UNDER DEVELOP ==================

export default {
  state: {
    users: []
  },

  mutations: {
    SET_USERS(state) {
      state.pages = []
    },
  },

  actions: {
    async FETCH_USERS({ dispatch, commit }) {
      try {
        const users =
          (
            await firebase
              .database()
              .ref(`/users/`)
              .once('value')
          ).val() || {}
        commit('SET_USERS', users)
        return users
      } catch (error) {
        throw error
      }
    },
  },

  getters: {
    USERS: (s) => s.users,
  },

}
