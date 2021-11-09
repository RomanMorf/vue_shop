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
    SIDE_BAR_GET_FROM_LOCAL_STORE({dispatch, commit, getters}) {
      // console.log(localStorage.interface, 'localStorage.interface');
      if (localStorage.interface) {
        const interfaceInfo = localStorage.getItem('interface')
        commit('SET_INTERFACE', JSON.parse(interfaceInfo))
      }
    },
    SIDE_BAR_SHOW({dispatch, commit, getters}) {
      const data = {...getters.INTERFACE}
      data.sideBarIsOpen = true
      localStorage.setItem('interface', JSON.stringify(data))
      commit('SET_INTERFACE', data)
    },
    SIDE_BAR_HIDE({dispatch, commit, getters}) {
      const data = {...getters.INTERFACE}
      data.sideBarIsOpen = false
      localStorage.setItem('interface', JSON.stringify(data))
      commit('SET_INTERFACE', data)
    },
    SIDE_BAR_INTERFACE_TOGGLE({dispatch, commit, getters}) {
      const data = {...getters.INTERFACE}
      data.sideBarIsOpen = !data.sideBarIsOpen
      localStorage.setItem('interface', JSON.stringify(data))
      commit('SET_INTERFACE', data)
    }
  },

  getters: {
    INTERFACE: s => s.interface
  }
}
