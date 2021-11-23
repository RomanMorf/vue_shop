import firebase from 'firebase/app'

export default {
  actions: {
    async LOGIN ({commit}, {email, password}) { // Авторизация
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password) // авторизация через firebase
        console.log(firebase, 'firebase');
        console.log(firebase.auth(), 'firebase.auth()');
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

        const uid = await dispatch('GET_UID');

        await firebase.database().ref(`/users/${uid}/userInfo`).set({
          name: name,
          email: email,
          tel: tel,
          role: 'user'
        })

      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async RESET_PASSWORD ({commit}, email) { // сбросить пароль. восставновить через почту
      await firebase.auth().sendPasswordResetEmail(email)
          .then(function() {
            // console.log('success');
          })
          .catch(function(e) {
            commit('setError', e)
            throw e
          });

    }
  },
}
