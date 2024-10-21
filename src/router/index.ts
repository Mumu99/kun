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
    path: '/patients',
    name: 'Patients',
    component: Patient,
    props: true, // 允许将路由参数作为组件的 props
    children: [
      {
        path: 'appointmentRegistration',
        name: 'appointmentRegistration',
        component: () =>
          import(
            '@/views/patients/components/appointmentRegistration/index.vue'
          )
      },
      {
        path: 'patientsDetail',
        name: 'patientsDetail',
        component: () =>
          import('@/views/patients/components/patientsDetail/index.vue')
      },
      {
        path: 'appointmentInstructions',
        name: 'appointmentInstructions',
        component: () =>
          import(
            '@/views/patients/components/appointmentInstructions/index.vue'
          )
      },
      {
        path: 'qutpatientInfo',
        name: 'qutpatientInfo',
        component: () =>
          import('@/views/patients/components/qutpatientInfo/index.vue')
      },
      {
        path: 'queryCancellation',
        name: 'queryCancellation',
        component: () =>
          import('@/views/patients/components/queryCancellation/index.vue')
      }
    ]
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
