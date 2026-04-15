import { createRouter, createWebHistory } from 'vue-router'
import BackendLayout from '@/views/layout/BackendLayout.vue'

// 路由配置
const backendRoutes = [
  {
    path: '/back',
    component: BackendLayout,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
        meta: {
          title: '数据分析',
          icon: 'PieChart'
        }
      },
      {
        path: 'knowledge',
        component: () => import('@/views/knowledge/Knowledge.vue'),
        meta: {
          title: '知识文章',
          icon: 'ChatLineSquare'
        }
      },
      {
        path: 'consultations',
        component: () => import('@/views/consultations/Consultations.vue'),
        meta: {
          title: '咨询记录',
          icon: 'Message'
        }
      },
      {
        path: 'emotional',
        component: () => import('@/views/emotional/Emotional.vue'),
        meta: {
          title: '情绪日志',
          icon: 'User'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: backendRoutes
})

export default router
