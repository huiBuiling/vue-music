// 设置的全局访问的state对象
const state = {
  singerImg: 'http://y.gtimg.cn/music/photo_new/T001R150x150M0000020PeOh4ZaCw1.webp',
  showPlayer: false,
  mini: false,
  currentSong: {},
  songLists: [
    {
      id: '1',
      singer: [{name: '花粥'}],
      name: '归去来兮',
      img: 'http://p4.music.126.net/H6dt7IgvXNWhRM_w7XbcqQ==/109951163990575387.jpg',
      url: 'http://www.ytmp3.cn/down/50354.mp3'
    },
    {
      id: '2',
      singer: [{name: '吉田潔'}],
      name: 'はるかな旅(TV Opening)',
      img: 'http://img.ytmp3.cn/image/17.jpg',
      url: 'http://www.ytmp3.cn/down/49058.mp3'
    },
    {
      id: '3',
      singer: [{name: '李健'}],
      name: '贝加尔湖畔',
      img: 'http://img.ytmp3.cn/image/86.jpg',
      url: 'http://www.ytmp3.cn/down/44146.mp3'
    },
    {
      id: '4',
      singer: [{name: 'Fleurie'}],
      name: 'Breathe',
      img: 'http://img.ytmp3.cn/image/68.jpg',
      url: 'http://www.ytmp3.cn/down/51824.mp3'
    },
    {
      id: '5',
      singer: [{name: 'Iridescent'}],
      name: 'Linkin Park',
      img: 'http://img.ytmp3.cn/image/27.jpg',
      url: 'http://www.ytmp3.cn/down/73494.mp3'
    }
  ]
}

const mutations = {
  'SET_SHOW_PLAYER': (state, show) => {
    state.showPlayer = show
  },
  'SET_MINI': (state, mini) => {
    state.mini = mini
  },
  'SET_CURRENT_SONG_DETAIL': (state, newSong) => {
    state.currentSong = newSong
  },
  'SET_SINGER_IMG': (state, newSingerImg) => {
    state.singerImg = newSingerImg
  }
}

const actions = {
  setShowPlayer({ commit }, show) {
    commit('SET_SHOW_PLAYER', show)
  },
  setMini({ commit }, mini) {
    commit('SET_MINI', mini)
  },
  setCurrentSong({ commit }, currentSong) {
    commit('SET_CURRENT_SONG_DETAIL', currentSong)
  },
  setSingerImg({ commit }, singerImg) {
    commit('SET_SINGER_IMG', singerImg)
  }
}

// 实时监听state值的变化且改变
const getters = {
  showPlayer: state => state.showPlayer,
  mini: state => state.mini,
  currentSong: state => state.currentSong,
  songLists: state => state.songLists,
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
