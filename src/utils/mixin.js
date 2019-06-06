import { mapGetters, mapActions } from 'vuex'
export const musicMixin = {
  computed: {
    ...mapGetters([
      'showPlayer',
      'mini',
      'currentSong',
      'songLists',
      'singerImg',
      'playMode'
    ])
  },
  methods: {
    ...mapActions([
      'setShowPlayer',
      'setMini',
      'setCurrentSong',
      'setSingerImg',
      'setPlayMode'
    ]),
    filterNum(val) {
      const str = val.toString()
      if (str.length <= 4) {
        val = str[0] + '千'
      } else if (str.length >= 5) {
        val = str.slice(0, -4) + '万'
      }
      return val
    }
  }
}
