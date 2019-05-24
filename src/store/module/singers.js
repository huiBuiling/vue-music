// 要设置的全局访问的state对象
const state = {
  singerImg: 'http://y.gtimg.cn/music/photo_new/T001R150x150M0000020PeOh4ZaCw1.webp'
}

// 实时监听state值的变化且改变
const getters = {
  onChange(state) {
    return state.singerImg
  }
}

// 设置值
const mutations = {
  change(state, img) {
    state.singerImg = img
  }
}

// 执行方法
const actions = {
  changImg(context, img) {
    context.commit('change', img)
  }
}

export default {
  // 用于在全局引用此文件里的方法时标识这一个的文件名
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
