import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Register from '@/views/register'
import MyAccount from '@/views/myAccount'
import CreateNewRezolution from '@/views/createNewRezolution'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/myAccount/:memberId',
      component: MyAccount,
    },
    {
      path: '/myAccount/:memberId/createNewRezolution',
      component: CreateNewRezolution,
    },

  ]
})
