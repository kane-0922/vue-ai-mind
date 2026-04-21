import request from '@/utils/request'

// 注册
export const register = (data) => {
  return request.post('/user/add', data)
}

// 创建新的会话
export const startSession = (data) => {
  return request.post('/psychological-chat/session/start', data)
}

// 获取咨询会话列表
export const getSessionList = (params) => {
  return request.get('/psychological-chat/sessions', { params })
}

// 删除咨询会话
export const deleteSession = (sessionId) => {
  return request.delete(`/psychological-chat/sessions/${sessionId}`)
}

// 获取会话消息详情
export const getSessionDetail = (sessionId) => {
  return request.get(`/psychological-chat/sessions/${sessionId}/messages`)
}

// 获取会话情绪分析结果
export const getSessionEmotion = (sessionId) => {
  return request.get(`/psychological-chat/session/${sessionId}/emotion`)
}
