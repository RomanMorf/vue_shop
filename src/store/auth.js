import firebase from 'firebase/app'

export default {
  actions: {

    async LOGIN ({commit}, {email, password}) { // Авторизация
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async LOGOUT({commit}) {  // Выйти из аккаунта
      await firebase.auth().signOut()
      // commit('clearInfo')
    },

    GET_UID () { // получить ID пользователя
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },

    GET_USER_DATA() { // получить данные из формы аутентификации
      const userData = firebase.auth().currentUser
      return userData ? userData : null
    },

    async REGISTER ({dispatch, commit}, {email, password, name, locale}) { // регистрация
      try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)

      // await firebase.auth().sendPasswordResetEmail
      // await firebase.auth().verifyPasswordResetCode
      // await firebase.auth().confirmPasswordReset

      const uid = await dispatch('GET_UID');

      await firebase.database().ref(`/users/${uid}/userInfo`).set({
        name: name,
        email: email,
      })

      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

  },
}
