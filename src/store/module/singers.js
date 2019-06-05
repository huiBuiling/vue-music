// 设置的全局访问的state对象
const state = {
  singerImg: 'http://y.gtimg.cn/music/photo_new/T001R150x150M0000020PeOh4ZaCw1.webp',
  currentSong: {}
}

const mutations = {
  'SET_CURRENT_SONG_DETAIL': (state, newSong) => {
    state.currentSong = newSong
  },
  'SET_SINGER_IMG': (state, newSingerImg) => {
    state.singerImg = newSingerImg
  }
}

const actions = {
  setCurrentSong({ commit }, currentSong) {
    commit('SET_CURRENT_SONG_DETAIL', currentSong)
  },
  setSingerImg({ commit }, singerImg) {
    commit('SET_SINGER_IMG', singerImg)
  }
}

// 实时监听state值的变化且改变
const getters = {
  currentSong: state => state.currentSong,
  singerImg: state => state.singerImg
}

export default {
  // 用于在全局引用此文件里的方法时标识这一个的文件名
  // namespaced: true,
  state,
  getters,
  mutations,
  actions
}
