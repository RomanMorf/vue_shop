import firebase from 'firebase/app'

// ========== UNDER DEVELOP ==================

export default {
  actions: {
    async LOGIN_ADMIN ({commit}, {email, password}) { // Авторизация
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password) // авторизация через firebase
      } catch (e) {
        commit('setError', e)
        console.log(e, 'message from store')
        throw e
      }
    },

    async LOGOUT_ADMIN({commit}) {  // Выйти из аккаунта
      await firebase.auth().signOut()
      commit('CLEAR_INFO')

      this.$router.push('/login')
    },

    async GET_UID_ADMIN ({commit}) { // получить ID пользователя
      const user = await firebase.auth().currentUser
      return user ? user.uid : null
    },

    async GET_USER_DATA_ADMIN() { // получить данные из формы аутентификации
      const userData = await firebase.auth().currentUser
      return userData ? userData : null
    },
  },
}
