import firebase from 'firebase/app'

export default {
  actions: {
    async LOGIN ({commit}, {email, password}) { // Авторизация
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password) // авторизация через firebase
      } catch (e) {
        commit('setError', e)
        console.log(e, 'message from store')
        throw e
      }
    },

    async LOGOUT({commit}) {  // Выйти из аккаунта
      await firebase.auth().signOut()
      commit('CLEAR_INFO')

      this.$router.push('/login')
    },

    async GET_UID ({commit}) { // получить ID пользователя
      const user = await firebase.auth().currentUser
      return user ? user.uid : null
    },

    async GET_USER_DATA() { // получить данные из формы аутентификации
      const userData = await firebase.auth().currentUser
      return userData ? userData : null
    },

    async REGISTER ({dispatch, commit}, data) { // регистрация
      try {
        console.log(data, 'from store')
        const { name, email, password, tel } = data

        await firebase.auth().createUserWithEmailAndPassword(email, password)

        // await firebase.auth().sendPasswordResetEmail
        // await firebase.auth().verifyPasswordResetCode
        // await firebase.auth().confirmPasswordReset

        const uid = await dispatch('GET_UID');

        await firebase.database().ref(`/users/${uid}/userInfo`).set({
          name: name,
          email: email,
          tel: tel,
        })

      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
  },
}
