import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VTooltip from 'v-tooltip'

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

import Loader from '@/components/Loader'
import ToTop from '@/components/ToTop'
import Modal from '@/components/Modal'
import Vuelidate from 'vuelidate'
import dateFilter from '@/filters/date.filter.js'
import localizeFilter from '@/filters/localize.filter.js'
import '@/assets/scss/style.scss'

import Paginate from 'vuejs-paginate'
Vue.component('Paginate', Paginate)


import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
const options = {}
Vue.use(Toast, options)
import messagePlugin from '@/utils/message.plugin'
Vue.use(messagePlugin)

Vue.filter('localize', localizeFilter)
Vue.filter('date', dateFilter)


Vue.config.productionTip = false

Vue.component('Loader', Loader)
Vue.component('ToTop', ToTop)
Vue.component('Modal', Modal)

const key = process.env.VUE_APP_API_KEY;
firebase.initializeApp({
  apiKey: key,
  authDomain: "romario-vue-shop.firebaseapp.com",
  databaseURL: "https://romario-vue-shop-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "romario-vue-shop",
  storageBucket: "romario-vue-shop.appspot.com",
  messagingSenderId: "492072039756",
  appId: "1:492072039756:web:81a8e7a3891adbae014be9",
  measurementId: "G-VZ87V7G0CH"
})

Vue.use(VTooltip)
Vue.use(Vuelidate)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')


