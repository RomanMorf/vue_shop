import firebase from 'firebase/app'

export default {
  state: {
    categories: [],
  },
  mutations: {
    setCatalog(state, categories) {
      state.categories = categories
    },
    clearCatalog(state) {
      state.categories = []
    },
  },
  actions: {
    async createCategory({ dispatch, commit, getters }, data) {
      try {
        return await firebase
          .database()
          .ref(`/categories/`)
          .push(data)
      } catch (error) {
        throw error.message
      }
    },
    async editCategory({ dispatch, commit }, newInfo) {
      try {
        const uid = await dispatch('getUid')
        await firebase
          .database()
          .ref(`/catalog/category/`)
          .child(newInfo.id)
          .set(newInfo)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async fetchCategories({ dispatch, commit }) {
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
    categories: (s) => s.categories,
  },
}