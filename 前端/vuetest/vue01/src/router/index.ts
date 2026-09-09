//创建一个路由器并暴露出去
//引入createRouter
import {createRouter,createWebHistory} from 'vue-router'

//引入可能要呈现的组件
import Home from '@/component/Home.vue'
import Center from '@/component/Center.vue'
import User from '@/component/User.vue'
import Detail1 from '@/component/Detail1.vue'

const router = createRouter({
  history: createWebHistory(),//路由器的工作模式
  routes: [//路由规则
 {
    path: '/home',
    component: Home,
    children: [
      { path: '', redirect: '/home/detail1/intro' },//默认显示第一个
      { path: 'detail1/:id', component: Detail1 }
    ]
  },
  {
    path: '/center',
    component: Center,
    children: [
      { path: '', redirect: '/center/detail1/upload' },
      { path: 'detail1/:id', component: Detail1 }
    ]
  },
  {
    path: '/user',
    component: User
  }
  ]
})
//暴露出去router
export default router
