import { request } from '@/plugins/request'

// 获取公共的文章列表
export const getArticles = (params) => {
  console.log('[arr = ', params)
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}
// 获取用户关注的文章列表
export const getFeedArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}
// 添加点赞
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}
// 取消点赞
export const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}
//获取文章详情
export const getArtile = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}
//获取文章评论
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}
// 关注作者
export const followUser = username => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`
  })
}
// 取消关注作者
export const unfollowUser = username => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`
  })
}
// 发布评论
export const addComments = ({ slug, data }) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data
  })
}
// 新建文章
export const createArticle = (data) => {
  return request({
    method: 'POST',
    url: '/api/articles',
    data
  })
}