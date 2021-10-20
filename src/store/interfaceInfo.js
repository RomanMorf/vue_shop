export default {
  state: {
    interface: {
      sideBarIsOpen: true,
    },
  },

  mutations: {
    SET_INTERFACE(state, info) {
      state.interface = info
    },
    CLEAR_INTERFACE (state) {
      state.interface = {}
    }
  },

  actions: {
    SIDE_BAR_INTERFACE_TOGGLE({dispatch, commit, getters}) {
      const data = {...getters.INTERFACE}
      data.sideBarIsOpen = !data.sideBarIsOpen
      commit('SET_INTERFACE', data)
    }
  },

  getters: {
    INTERFACE: s => s.interface
  }
}