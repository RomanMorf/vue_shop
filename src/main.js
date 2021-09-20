import Vue from 'vue'
import {App} from './App.vue'
import router from './router'
import store from './store'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyBe-uq9ugjQF0p3Ga7GVdk8Jc0rpRzcSkw',
  authDomain: 'romario-vue-shop.firebaseapp.com',
  databaseURL:'https://romario-vue-shop-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'romario-vue-shop',
  storageBucket: 'romario-vue-shop.appspot.com',
  messagingSenderId: '492072039756',
  appId: '1:492072039756:web:81a8e7a3891adbae014be9',
  measurementId: 'G-VZ87V7G0CH',
  storageBucket: 'gs://romario-vue-shop.appspot.com',
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
