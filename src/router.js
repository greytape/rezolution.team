import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import MyAccount from '@/views/myAccount'
import CreateNewRezolution from '@/views/createNewRezolution'
import CreateNewTeam from '@/views/createNewTeam'
import CreateUpdate from '@/views/createUpdate'
import ViewTeams from '@/views/viewTeams'
import ViewRezolution from '@/views/viewRezolution'
import EditRezolution from '@/views/editRezolution'
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
      path: '/myAccount/:userId/:rezolutionId/createUpdate',
      component: CreateUpdate,
    },
    {
      path: '/myAccount/:userId/:rezolutionId/editRezolution',
      component: EditRezolution,
    },
    {
      path: '/:rezolutionId/ViewRezolution',
      component: ViewRezolution,
    },
    {
      path: '/teams/:teamId',
      component: ViewTeams,
    }
  ],
})
