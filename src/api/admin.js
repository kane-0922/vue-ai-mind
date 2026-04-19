import request from '@/utils/request'

// 登录
export const login = (data) => {
  return request.post('/user/login', data)
}

// 获取分类
export const getCategoryTree = () => {
  return request.get('/knowledge/category/tree')
}

// 获取文章列表
export const articlePage = (params) => {
  return request.get('/knowledge/article/page', { params })
}

// 图片上传
export const uploadFile = (file, businessInfo) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('businessType', 'ARTICLE')
  formData.append('businessId', businessInfo.businessId)
  formData.append('businessField', 'cover')
  return request.post('/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 发布文章
export const createArticle = (data) => {
  return request.post('/knowledge/article', data)
}

// 获取文章详情
export const getArticleDetail = (id) => {
  return request.get(`/knowledge/article/${id}`)
}
