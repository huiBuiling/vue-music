import { mapGetters, mapActions } from 'vuex'
export const musicMixin = {
  computed: {
    ...mapGetters([
      'currentSong',
      'singerImg'
    ])
  },
  methods: {
    ...mapActions([
      'setCurrentSong'
    ])
  }
}
