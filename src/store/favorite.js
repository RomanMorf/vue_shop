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
    FAVORITE_GET_FROM_LOCAL_STORE({ dispatch, commit, getters }) {
      if (localStorage.favorite) {
        const favorite = localStorage.getItem('favorite') || []
        commit('SET_TO_FAVORITE', JSON.parse(favorite))
      }
    },
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
        localStorage.setItem('favorite', JSON.stringify(favorite))
      }
      if (index !== -1) {
        favorite.splice(index, 1)
        commit('SET_TO_FAVORITE', favorite)
        localStorage.setItem('favorite', JSON.stringify(favorite))
      }
    },
    FAVORITE_CLEAR({ dispatch, commit, getters }) {
      commit('CLEAR_FAVORITE')
      localStorage.removeItem('favorite')
    }
  },
  getters: {
    FAVORITE: (s) => s.favorite,
  },
}
