import request from '@/utils/request'

export const login = (data) => {
  return request.post('/user/login', data)
}

export const getCategoryTree = () => {
  return request.get('/knowledge/category/tree')
}

export const articlePage = (params) => {
  return request.get('/knowledge/article/page', { params })
}
