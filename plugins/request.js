import axios from 'axios'
export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

// 通过插件机制获取到上下文对象（query， params， app, store）
// 插件导出函数必须作为default成员
export default ({ store }) => {
  console.log(123)
  // 请求拦截器
  request.interceptors.request.use(function (config) {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config
  }, function (error) {
    // 请求未发出去就失败的话，会进入这里
    return Promise.reject(error)
  })
}

