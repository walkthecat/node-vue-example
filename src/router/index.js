import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login'
import Reg from '@/page/register'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/pic',
      component: resolve => require(['@/page/pic'], resolve),
      meta: {
        title: 'picture'
      }
    },
    {
      path: '/table',
      component: resolve => require(['@/page/table'], resolve),
      meta: {
        title: 'table'
      }
    },
    {
      path: '/reg',
      name: 'register',
      component: Reg
    }
  ]
})
