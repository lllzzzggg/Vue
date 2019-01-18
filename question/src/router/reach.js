import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
console.log(location.pathname)
export default new Router({
  mode: 'history',
  base: '/reach',
  routes: [
    {
      name: 'reachIndex',
      path: '/',
      exact: true,
      component: () => import('@/pages/reach/HomePage')
    },
    {
      name: 'reachHome',
      path: '/home',
      component: () => import('@/pages/reach/HomePage')
    },
    {
      name: 'reachModule',
      path: '/module',
      component: () => import('@/pages/reach/ModulePage')
    },
    {
      name: 'reachQuestion',
      path: '/question',
      component: () => import('@/pages/reach/QuestionPage')
    },
    {
      name: 'reachReport',
      path: '/report',
      component: () => import('@/pages/reach/ReportPage')
    },
    {
      path: '*',
      redirect: 'reachIndex'
    }
  ]
})
