import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'main' },
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    meta: { layout: 'main' },
    component: () => import('../views/About.vue'),
  },
  {
    path: '/catalog',
    name: 'Catalog',
    meta: { layout: 'main' },
    component: () => import('../views/Catalog.vue'),
  },
  {
    path: '/delivery',
    name: 'Delivery',
    meta: { layout: 'main' },
    component: () => import('../views/Delivery.vue'),
  },
  {
    path: '/contacts',
    name: 'Contacts',
    meta: { layout: 'main' },
    component: () => import('../views/Contacts.vue'),
  },
  {
    path: '/testpage',
    name: 'TestPage',
    meta: { layout: 'admin' },
    component: () => import('../views/TestPage.vue'),
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
