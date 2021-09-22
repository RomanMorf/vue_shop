import firebase from 'firebase/app'

export default {
  state: {
    categories: [],
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    CLEAR_CATEGORIES(state) {
      state.categories = []
    },
  },
  actions: {
    async CREATE_CATEGORY({ dispatch, commit, getters }, data) {
      try {
        console.log(data, 'data')

        return await firebase
          .database()
          .ref(`/categories/`)
          .push(data)
        commit
      } catch (error) {
        console.log(error.message, 'error')
        throw error
      }
    },
    async EDIT_CATEGORY({ dispatch, commit }, newInfo) {
      try {
        await firebase
          .database()
          .ref(`/categories/`)
          .child(newInfo.id)
          .set(newInfo)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async DELETE_CATEGORY({ dispatch, commit }, data) {
      console.log(data.id, 'id');
      try {
        await firebase
          .database()
          .ref(`/categories/`)
          .child(data.id)
          .remove()
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async FETCH_CATEGORIES({ dispatch, commit }) {
      try {
        const records =
          (
            await firebase
              .database()
              .ref(`/categories/`)
              .once('value')
          ).val() || {}

        return Object.keys(records).map((key) => ({ ...records[key], id: key }))
      } catch (error) {
        throw error
      }
    },
  },
  getters: {
    CATEGORIES: (s) => s.categories,
  },
}