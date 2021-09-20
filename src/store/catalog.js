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
      console.log('trying to create record');
      try {
        // console.log(firebase.database(), 'firebase.database()');
        return await firebase.database().ref(`/users/records`).push(data)
      } catch (error) {
        console.log(error, 'error');
        throw error
      }

    },
  },
  getters: {
    catalog: (s) => s.catalog,
  },
}