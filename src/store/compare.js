export default {
  state: {
    compare: [],
  },
  mutations: {
    SET_TO_COMPARE(state, products) {
      state.compare = products
    },
    CLEAR_COMPARE(state) {
      state.compare = []
    },
  },
  actions: {
    COMPARE_GET_FROM_LOCAL_STORE({ dispatch, commit, getters }) {
      if (localStorage.compare) {
        const compare = localStorage.getItem('compare') || []
        commit('SET_TO_COMPARE', JSON.parse(compare))
      }
    },
    COMPARE_TOGGLE({ dispatch, commit, getters }, data) {
      const id = data.id || data
      const compare = getters.COMPARE
      const index = compare.findIndex((el) => el.id === id)
      if (index === -1) {
        const product = {
          ...data
        }

        if (compare.length == 4) { // если есть 4 товара для сравнения - удалем первый елемент, и добавляем новый
          compare.splice(0, 1)
          compare.push(product)
          commit('SET_TO_COMPARE', compare)
          localStorage.setItem('compare', JSON.stringify(compare))  
        } else {
          compare.push(product)
          commit('SET_TO_COMPARE', compare)
          localStorage.setItem('compare', JSON.stringify(compare))
        }
      } else {
        compare.splice(index, 1)
        commit('SET_TO_COMPARE', compare)
        localStorage.setItem('compare', JSON.stringify(compare))
      }
    },


  },
  getters: {
    COMPARE: (s) => s.compare,
  },
}
