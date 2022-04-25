import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/HoMe.vue'
// const Home = () =>
//   import(/* webpackChunkName: "login" */ '../components/HoMe.vue')
import Login from '../components/LogIn.vue'
import Welcome from '../components/WelCome.vue'

import Users from '../components/user/UseRs.vue'

import Right from '../components/power/RigHt.vue'
import Roles from '../components/power/RoLes.vue'

import Cate from '../components/goods/CaTe.vue'
import Params from '../components/goods/ParaMs.vue'
import Goods from '../components/goods/GooDs.vue'

import Orders from '../components/order/OrDers.vue'

import Reports from '../components/report/RePorts.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/rights',
        component: Right
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/categories',
        component: Cate
      },
      {
        path: '/params',
        component: Params
      },
      {
        path: '/goods',
        component: Goods
      },
      {
        path: '/orders',
        component: Orders
      },
      {
        path: '/reports',
        component: Reports
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     return next()
//   }
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) {
//     return next('/login')
//   }
//   next()
// })
export default router
