import { request } from '@/plugins/request'

// 登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}
// 注册
export const register = (data) => {
  return request({
    method: 'POST',
    url: '/api/users/',
    data
  })
}
// 获取用户资料
export const getUser = () => {
  return request({
    method: 'GET',
    url: '/api/user'
  })
}
export const getProfile = (username) => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`
  })
}
// 更新用户资料
export const updateUser = (data) => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data
  })
}
