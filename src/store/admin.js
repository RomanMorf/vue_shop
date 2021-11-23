import firebase from 'firebase/app'

// ========== UNDER DEVELOP ==================

export default {
  state: {
    users: []
  },

  mutations: {
    SET_USERS(state, users) {
      state.users = users
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
        const newUsers = Object.keys(users).map((key) => ({
          ...users[key],
          id: key,
        }))
        commit('SET_USERS', newUsers)
      } catch (error) {
        throw error
      }
    },
  },

  getters: {
    USERS: (s) => s.users,
  },

}
