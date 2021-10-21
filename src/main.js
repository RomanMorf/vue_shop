import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

import Loader from '@/components/Loader'
import Modal from '@/components/Modal'
import Vuelidate from 'vuelidate'

import '@/assets/scss/style.scss'
// import '@/assets/scss/_colors.scss'


Vue.config.productionTip = false

Vue.component('Loader', Loader)
Vue.component('Modal', Modal)

firebase.initializeApp({
  apiKey: "AIzaSyBe-uq9ugjQF0p3Ga7GVdk8Jc0rpRzcSkw",
  authDomain: "romario-vue-shop.firebaseapp.com",
  databaseURL: "https://romario-vue-shop-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "romario-vue-shop",
  storageBucket: "romario-vue-shop.appspot.com",
  messagingSenderId: "492072039756",
  appId: "1:492072039756:web:81a8e7a3891adbae014be9",
  measurementId: "G-VZ87V7G0CH"
})

Vue.use(Vuelidate)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')


