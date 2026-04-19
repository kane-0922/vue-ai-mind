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

// 更新知识文章
export const updateArticle = (id, data) => {
  return request.put(`/knowledge/article/${id}`, data)
}

// 更新文章状态
export const changeArticleStatus = (id, data) => {
  return request.put(`/knowledge/article/${id}/status`, data)
}

// 删除文章
export const deleteArticle = (id) => {
  return request.delete(`/knowledge/article/${id}`)
}

// 获取咨询记录列表
export const getConsultationPage = (params) => {
  return request.get('/psychological-chat/sessions', { params })
}

// 获取会话消息列表
export const getSessionDetail = (sessionId) => {
  return request.get(`/psychological-chat/sessions/${sessionId}/messages`)
}
