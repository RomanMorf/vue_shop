import firebase from 'firebase/app'

export default {
  state: {
    favorite: [],
  },
  mutations: {
    SET_TO_FAVORITE(state, products) {
      state.favorite = products
    },
    CLEAR_FAVORITE(state) {
      state.favorite = []
    },
  },
  actions: {
    FAVORITE_TOGGLE({ dispatch, commit, getters }, data) {
      const id = data.id || data
      const favorite = getters.FAVORITE
      const index = favorite.findIndex((el) => el.id === id)
      if (index === -1) {
        const product = {
          ...data
        }
        favorite.push(product)
        commit('SET_TO_FAVORITE', favorite)
      }
      if (index !== -1) {
        favorite.splice(index, 1)
        commit('SET_TO_FAVORITE', favorite)
      }
    },
  },
  getters: {
    FAVORITE: (s) => s.favorite,
  },
}
