import firebase from 'firebase/app'

export default {
  state: {
    pages: {
      contacts: ``,
      about: ``,
      delivery: ``
    },
  },

  mutations: {
    SET_PAGES(state, pages) {
      state.pages = pages
    },
    CLEAR_PAGES(state) {
      state.pages = []
    },
  },

  actions: {
    async UPDATE_PAGES({dispatch, commit, getters}, toUpdate) { // обновить тексты
      const updatedData = {...getters.PAGES, ...toUpdate}
      try {
        commit('SET_PAGES', updatedData)
        return await firebase
          .database()
          .ref(`/texts/`)
          .set(updatedData)
      } catch (error) {
        console.log(error.message, 'error')
        throw error
      }
    },
    async FETCH_TEXTS({ dispatch, commit }) { // получить тексты от сервера
      try {
        const texts =
          (
            await firebase
              .database()
              .ref(`/texts/`)
              .once('value')
          ).val() || {}
        commit('SET_PAGES', texts)
        return texts
      } catch (error) {
        throw error
      }
    },
  },

  getters: {
    PAGES: (s) => s.pages,
  },
}
