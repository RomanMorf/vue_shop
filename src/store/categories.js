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
    async CREATE_CATEGORY({ dispatch, commit, getters }, data) { // создать категорию
      try {
        return await firebase
          .database()
          .ref(`/categories/${data.id}`)
          .set(data)
      } catch (error) {
        throw error
      }
    },
    async EDIT_CATEGORY({ dispatch, commit }, newInfo) { // редактировать категорию
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
    async DELETE_CATEGORY({ dispatch, commit }, data) { // удалить категорию
      try {
        await firebase
          .database()
          .ref(`/categories/`)
          .child(data.id)
          .remove()
      } catch (error) {
        // commit('setError', error)
        throw error
      }
    },
    async FETCH_CATEGORIES({ dispatch, commit }) { // получить все категории от сервера
      try {
        const categorise =
          (
            await firebase
              .database()
              .ref(`/categories/`)
              .once('value')
          ).val() || {}
        const newCategorise = Object.keys(categorise).map((key) => ({
          ...categorise[key],
          id: key,
        }))
        commit('SET_CATEGORIES', newCategorise)
        return newCategorise
      } catch (error) {
        throw error
      }
    },
  },
  getters: {
    GET_CATEGORIES: (s) => s.categories,
  },
}
