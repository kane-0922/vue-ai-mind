import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 可以在这里添加token等认证信息
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const { data, config } = response
    if (data.code === '200') {
      return data.data
    } else {
      if (data.code === '-1') {
        if (!config.url?.includes('/login')) {
          ElMessage.error(data.msg || '登录过期，请重新登录')
          // 清除登录信息
          localStorage.removeItem('token')
          // 清除用户信息
          localStorage.removeItem('userInfo')
          // 跳转到登录页
          window.location.href = '/auth/login'
        } else {
          ElMessage.error(data.msg || '登录过期，请重新登录')
          return Promise.reject('网络请求失败')
        }
      }
    }
    return response
  },
  (error) => {
    // 可以在这里处理错误
    return Promise.reject(error)
  }
)

export default request
