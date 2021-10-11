import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'main' },
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    meta: { layout: 'main' },
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/catalog',
    name: 'Catalog',
    meta: { layout: 'main' },
    component: () => import('@/views/Catalog.vue'),
  },
  {
    path: '/delivery',
    name: 'Delivery',
    meta: { layout: 'main' },
    component: () => import('@/views/Delivery.vue'),
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: () => import('@/views/Contacts.vue'),
  },
  {
    path: '/testpage',
    name: 'TestPage',
    meta: { layout: 'admin' },
    component: () => import('@/views/TestPage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'main' },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'main' },
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/product/:id',
    name: 'Product',
    meta: { layout: 'main' },
    component: () => import('@/views/Product.vue'),
  },
  {
    path: '/compare/',
    name: 'Compare',
    meta: { layout: 'main' },
    component: () => import('@/views/Compare.vue'),
  },
  {
    path: '/cabinet',
    name: 'Cabinet',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Cabinet.vue'),
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    meta: { layout: 'main' },
    component: () => import('@/views/Edit.vue'),
  },

  {
    path: '*',
    name: 'NotFound',
    meta: { layout: 'main' },
    component: () => import('@/views/NotFound.vue'),
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  to.meta.auth && !currentUser ? next('/login') : next()
})


export default router
