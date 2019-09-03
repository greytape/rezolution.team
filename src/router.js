import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Register from '@/views/register'
import MyAccount from '@/views/myAccount'
import CreateNewRezolution from '@/views/createNewRezolution'
import CreateNewTeam from '@/views/createNewTeam'
import CreateUpdate from '@/views/createUpdate'
import MyTeams from '@/views/myTeams'
import auth from '@/firebase/init'

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
      path: '/myAccount/:userId',
      component: MyAccount,
      meta: { requiresAuth: true },
    },
    {
      path: '/myAccount/:userId/createNewRezolution',
      component: CreateNewRezolution,
      meta: { requiresAuth: true },
    },
    {
      path: '/myAccount/:userId/createNewTeam',
      component: CreateNewTeam,
      meta: { requiresAuth: true },
    },
    {
      path: ':memberId/myTeams',
      component: MyTeams,
      meta: { requiresAuth: true },
    },
    {
      path: '/myAccount/:userId/:rezolutionId/createUpdate',
      component: CreateUpdate,
    },
  ],
})
