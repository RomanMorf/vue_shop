import firebase from 'firebase/app'

export default {
  state: {
    catalog: [],
  },
  mutations: {
    setCatalog(state, catalog) {
      state.catalog = catalog
    },
    clearCatalog(state) {
      state.catalog = []
    },
  },
  actions: {
    async createRecord({ dispatch, commit, getters }, data) {
      try {
        return await firebase
          .database()
          .ref(`/catalog/${data.category}/`)
          .push(data)
      } catch (error) {
        throw error.message
      }
    },
    async editRecord({ dispatch, commit }, newInfo) {
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
    async fetchRecord({ dispatch, commit }) {
      try {
        const records =
          (
            await firebase
              .database()
              .ref(`/catalog/Test Category/`)
              .once('value')
          ).val() || {}

        return Object.keys(records).map((key) => ({ ...records[key], id: key }))

      } catch (error) {
        throw error
      }
    },
  },
  getters: {
    catalog: (s) => s.catalog,
  },
}