import { createRouter, createWebHistory } from 'vue-router'
import BackendLayout from '@/components/BackendLayout.vue'
// 路由配置
const backendRoutes = [
  {
    path: '/back',
    component: BackendLayout
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: backendRoutes
})

export default router
