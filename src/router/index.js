import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'
import store from '../store'
const { isNavigationFailure, NavigationFailureType } = VueRouter

Vue.use(VueRouter)

const routes = [
  { // main
    path: '/',
    name: 'Главная',
    meta: { layout: 'main' },
    component: () => import('@/views/Home.vue'),
  },
  { // about
    path: '/about',
    name: 'О нас',
    meta: { layout: 'main' },
    component: () => import('@/views/About.vue'),
  },
  { // catalog
    path: '/catalog',
    name: 'Каталог',
    meta: { layout: 'main' },
    component: () => import('@/views/Catalog.vue'),
  },
  { // catalog/:id
    path: '/catalog/:id',
    name: 'Каталог',
    meta: { layout: 'main' },
    component: () => import('@/views/Catalog.vue'),
  },
  { // delivery
    path: '/delivery',
    name: 'Доставка',
    meta: { layout: 'main' },
    component: () => import('@/views/Delivery.vue'),
  },
  { // contatcts
    path: '/contacts',
    name: 'Контакты',
    meta: { layout: 'main' },
    component: () => import('@/views/Contacts.vue'),
  },
  { // product/:id
    path: '/product/:id',
    name: 'Страница товара',
    meta: { layout: 'main' },
    component: () => import('@/views/Product.vue'),
  },
  { // order
    path: '/order',
    name: 'Заказ',
    meta: { layout: 'main' },
    component: () => import('@/views/Order.vue'),
  },
  { // compare
    path: '/compare',
    name: 'Сравнение',
    meta: { layout: 'main' },
    component: () => import('@/views/Compare.vue'),
  },
  { // thanks
    path: '/thanks',
    name: 'Благодарим за покупку',
    meta: { layout: 'main' },
    component: () => import('@/views/Thanks.vue'),
  },
  { // redirect
    path: '/catalog-redirect',
    redirect:   {
      path: '/catalog',
      name: 'Каталог',
      meta: { layout: 'main' },
      component: () => import('@/views/Catalog.vue'),
    },
    name: 'catalog-redirect',
    meta: { layout: 'main'},
  },
  { // cabinet
    path: '/cabinet',
    name: 'Личный кабинет',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Cabinet.vue'),
  },
  { // *
    path: '*',
    name: 'NotFound',
    meta: { layout: 'main' },
    component: () => import('@/views/NotFound.vue'),
  },
  //=============== LOGIN REGISTER ===============
  { //login
    path: '/login',
    name: 'Login',
    meta: { layout: 'main' },
    component: () => import('@/views/Login.vue'),
  },
  { //register
    path: '/register',
    name: 'Register',
    meta: { layout: 'main' },
    component: () => import('@/views/Register.vue'),
  },
  { //reset
    path: '/reset',
    name: 'Reset',
    meta: { layout: 'main' },
    component: () => import('@/views/ResetPassword.vue'),
  },
  // =============================================

  // =============== ADMIN ===============
  { // admin
    path: '/admin',
    name: 'Main',
    meta: { layout: 'admin', auth: true },
    component: () => import('@/views/admin/Main.vue'),
  },
  { // admin/orders
    path: '/admin/orders',
    name: 'Orders',
    meta: { layout: 'admin', auth: true },
    component: () => import('@/views/admin/Orders.vue'),
  },
  { // admin/editor
    path: '/admin/editor',
    name: 'Editor',
    meta: { layout: 'admin', auth: true },
    component: () => import('@/views/admin/Editor.vue'),
  },
  { // admin/profiles
    path: '/admin/profiles',
    name: 'Profiles',
    meta: { layout: 'admin', auth: true },
    component: () => import('@/views/admin/Profiles.vue'),
  },
  { // admin/products
    path: '/admin/products',
    name: 'Products',
    meta: { layout: 'admin', auth: true },
    component: () => import('@/views/admin/Products.vue'),
  },
  { // admin/create
    path: '/admin/create',
    name: 'ProductEdit',
    meta: { layout: 'admin', auth: true },
    component: () => import('@/views/admin/ProductEdit.vue'),
  },
  { // admin/categories
    path: '/admin/categories',
    name: 'Categories',
    meta: { layout: 'admin', auth: true, role: 'admin' },
    component: () => import('@/views/admin/Categories.vue'),
  },
  { // admin/edit/:id
    path: '/admin/edit/:id',
    name: 'Edit',
    meta: { layout: 'admin', auth: true },
    component: () => import('@/views/admin/ProductEdit.vue'),
  },
  { // admin/testpage
    path: '/admin/testpage',
    name: 'TestPage',
    meta: { layout: 'admin', auth: true },
    component: () => import('@/views/admin/TestPage.vue'),
  },
  { // admin/*
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
  to.meta.role === 'admin' ? console.log('you got to be admin') : null;

  // if (isNavigationFailure(NavigationFailureType.duplicated)) {
  //   // отображение уведомления пользователю
  //   console.log('router - DUPLICATED');
  //   // showToast('Необходимо авторизоваться для доступа к панели администрирования')
  // }
  next()
})


export default router
