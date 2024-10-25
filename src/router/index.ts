// createRouter 创建路由实例，createWebHistory 创建基于浏览器 history 的路由历史记录，routes 定义路由规则
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
import Patient from '@/views/patients/index.vue'
import UserInfo from '@/views/userInfo/index.vue'
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
        // 具体科室号源页面
        path: 'step',
        name: 'step',
        component: () =>
          import('@/views/patients/components/appointmentRegistration/step.vue')
      },
      {
        // 挂号页面
        path: 'booking',
        name: 'booking',
        component: () =>
          import(
            '@/views/patients/components/appointmentRegistration/booking.vue'
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
    path: '/userInfo',
    name: 'userInfo',
    component: UserInfo,
    props: true, // 允许将路由参数作为组件的 props
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/userInfo/user/index.vue')
      },
      {
        // 具体科室号源页面
        path: 'order',
        name: 'order',
        component: () => import('@/views/userInfo/order/index.vue')
      },
      {
        // 挂号页面
        path: 'patientManage',
        name: 'patientManage',
        component: () => import('@/views/userInfo/patientManage/index.vue')
      },
      {
        path: 'editUserInfo',
        name: 'editUserInfo',
        component: () => import('@/views/userInfo/editUserInfo/index.vue')
      },
      {
        path: 'remark',
        name: 'remark',
        component: () => import('@/views/userInfo/remark/index.vue')
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
