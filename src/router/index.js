import { createRouter, createWebHistory } from 'vue-router'
import BackendLayout from '@/views/layout/BackendLayout.vue'
import AuthLayout from '@/views/layout/AuthLayout.vue'
import FrontendLayout from '@/views/layout/FrontendLayout.vue'

// 路由配置
// 后台路由
const backendRoutes = [
  {
    path: '/back',
    redirect: '/back/dashboard',
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
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: () => import('@/views/login/LoginPage.vue'),
        meta: {
          title: '登录'
        }
      },
      {
        path: 'register',
        component: () => import('@/views/register/RegisterPage.vue'),
        meta: {
          title: '注册'
        }
      }
    ]
  }
]

// 前台路由
const frontendRoutes = [
  {
    path: '/',
    redirect: '/home',
    component: FrontendLayout,
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/Home.vue')
      },
      {
        path: 'consultation',
        component: () => import('@/views/frontendConsultation/Consultation.vue')
      },
      {
        path: 'emotion-diary',
        component: () => import('@/views/frontendEmotionalDiary/EmotionalDairy.vue')
      },
      {
        path: 'knowledge',
        component: () => import('@/views/frontendKnowledge/Knowledge.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...backendRoutes, ...frontendRoutes]
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // 当前用户是否登录
  if (token) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    // 如果是后台用户
    if (userInfo.userType === 2) {
      if (to.path.startsWith('/back')) {
        next()
      } else {
        next('/back/dashboard')
      }
    } else if (userInfo.userType === 1) {
      if (to.path.startsWith('/auth') || to.path.startsWith('/back')) {
        next('/')
      } else {
        next()
      }
    } else {
      if (to.path.startsWith('/back')) {
        next('/auth/login')
      } else {
        next()
      }
    }
  } else {
    // 未登录用户只能访问登录、注册页面和前台页面
    if (to.path.startsWith('/auth') || (to.path.startsWith('/') && !to.path.startsWith('/back'))) {
      next()
    } else {
      next('/auth/login')
    }
  }
})

export default router
