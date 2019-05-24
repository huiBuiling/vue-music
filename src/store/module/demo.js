// 要设置的全局访问的state对象
const state = {
  name: 'hui'
}

// 实时监听state值的变化且改变
const getters = {
  onChange(state) {
    debugger
    return state.name
  }
}

// 设置值
const mutations = {
  change(state) {
    state.name = 'niuer'
  },
  change2(state, name) {
    state.name = name
  }
}

// 执行方法
const actions = {
  changName(context) {
    context.commit('change')
  },
  changName2(context, name) {
    context.commit('change2', name)
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
