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
    meta: { layout: 'main' },
    component: () => import('@/views/Contacts.vue'),
  },
  {
    path: '/product/:id',
    name: 'Product',
    meta: { layout: 'main' },
    component: () => import('@/views/Product.vue'),
  },
  {
    path: '/order',
    name: 'Order',
    meta: { layout: 'main' },
    component: () => import('@/views/Order.vue'),
  },
  {
    path: '/compare',
    name: 'Compare',
    meta: { layout: 'main' },
    component: () => import('@/views/Compare.vue'),
  },
  {
    path: '/cabinet',
    name: 'cabinet',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Cabinet.vue'),
  },
  {
    path: '*',
    name: 'NotFound',
    meta: { layout: 'main' },
    component: () => import('@/views/NotFound.vue'),
  },
  //=============== LOGIN REGISTER ===============
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
  // =============================================

  // =============== ADMIN ===============
  {
    path: '/admin',
    name: 'Main',
    meta: { layout: 'admin', auth: true },
    component: () => import('@/views/admin/Main.vue'),
  },
  {
    path: '/admin/orders',
    name: 'Orders',
    meta: { layout: 'admin', auth: true },
    component: () => import('@/views/admin/Orders.vue'),
  },
  {
    path: '/admin/editor',
    name: 'Editor',
    meta: { layout: 'admin', auth: true },
    component: () => import('@/views/admin/Editor.vue'),
  },
  {
    path: '/admin/profiles',
    name: 'Profiles',
    meta: { layout: 'admin', auth: true },
    component: () => import('@/views/admin/Profiles.vue'),
  },
  {
    path: '/admin/testpage',
    name: 'TestPage',
    meta: { layout: 'admin', auth: true },
    component: () => import('@/views/admin/TestPage.vue'),
  },
  {
    path: '/admin/edit/:id',
    name: 'Edit',
    meta: { layout: 'admin', auth: true },
    component: () => import('@/views/admin/Edit.vue'),
  },
  {
    path: '/admin/*',
    name: 'NotFound',
    meta: { layout: 'admin', auth: true },
    component: () => import('@/views/NotFound.vue'),
  },

// =============================================
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
