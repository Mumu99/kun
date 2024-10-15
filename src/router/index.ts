// createRouter 创建路由实例，createWebHistory 创建基于浏览器 history 的路由历史记录，routes 定义路由规则
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
import Patient from '@/views/patients/index.vue'
import NotFound from '@/views/notFound/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/patient',
    name: 'Patient',
    component: Patient
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
