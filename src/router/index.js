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
        component: () => import('@/views/dashboard/Dashboard.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: backendRoutes
})

export default router
