const cookieparser = process.server ? require('cookieparser') : undefined
// store 文件夹名称是固定的
// 在服务端渲染期间运行的都是同一个实例
// 为了防止数据冲突，务必要把 state 定义成一个函数，返回数据对象
export const state = () => {
  return {
    // 当前登录用户的登录状态
    user: null
  }
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

export const actions = {
  // 是一个特殊的action方法
  // 这个 action 会在服务端渲染期间自动调用
  // 作用：初始化容器数据，传递数据给客户端使用
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      // 使用 cookieparaser 把cookie字符串转为 js 对象
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {

      }
    }
    commit('setUser', user)
  }
}