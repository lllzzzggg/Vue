import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/layouts/Home'
// import Home from '@/layouts/layout'

import HelloWorld from '@/components/HelloWorld'
import HelloVue from '@/components/HelloVue'
import test1 from '@/components/test1'
import test2 from '@/components/test2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '导航一',
      component: Home,
      iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/HelloWorld', component: HelloWorld, name: 'HelloWorld'},
            { path: '/HelloVue', component: HelloVue, name: 'HelloVue' },
        ]
    },
    {
      path: '/nav',
      name: '导航二',
      component: Home,
      iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/test1', component: test1, name: 'test1'},
            { path: '/test2', component: test2, name: 'test2' },
        ]
    },
  ]
})
