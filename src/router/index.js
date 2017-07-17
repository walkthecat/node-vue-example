import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login'
import Reg from '@/page/register'
import Box from '@/page/box'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/pic',
      component: resolve => require(['@/page/pic'], resolve),//等同于 () => import('@/page/pic'),
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
      path: '/box',
      name: 'box',
      component: Box
    },
    {
      path: '/reg',
      name: 'register',
      component: Reg
    }
  ]
})
