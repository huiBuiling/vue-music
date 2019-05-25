<template>
  <div class="m-singer-detail">
    <!--详情-->
    <div v-show="!showPlayer">
      <div class="admin-img" :style="bgStyle">
        <van-icon
          name="arrow-left"
          style="position: absolute;left: 10px;top: 10px;color: #fff"
          @click="goBack"
        />

        <van-button type="warning">随机播放全部</van-button>
      </div>
      <ul>
        <li v-for="(item, index) in singersDeatil" :key="index" @click="goPlayer(item.musicData)">
          <div>
            <p>{{item.musicData.albumname}}</p>
            <p>{{item.musicData.singer[0].name}}</p>
          </div>
        </li>
      </ul>
    </div>

    <!--播放器-->
    <player v-if="showPlayer" @showDetail="showDetail"/>
  </div>
</template>

<script>
/**
 * @author hui
 * @date 2019/5/23
 * @Description: 歌手详情
 */
import {query} from '../../utils/AxiosUtil'
import Player from './player'
export default {
  name: 'SingerDetail',
  components: {
    Player
  },
  props: {
    admin: String
  },
  data () {
    return {
      singersDeatil: [],
      singersDeatilUrl: '/tencent/song/artist?id=',
      showPlayer: false,
      detail: []
    }
  },
  methods: {
    getSingerDetail(mid) {
      query(`${this.singersDeatilUrl}${mid}`).then((res) => {
        if (res.code === 200) {
          this.singersDeatil = res.data
        }
      })
    },
    goBack() {
      this.$router.push({path: '/singer'})
    },
    goPlayer(item) {
      this.showPlayer = true
      this.detail = item
    },
    showDetail() {
      this.showPlayer = false
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.$store.state.singers.singerImg})`
    }
  },
  created() {
    const mid = this.$route.params.id
    // this.getSingerDetail(mid)
    this.getSingerDetail(mid)
  }
}
</script>

<style lang="stylus">
  @import "~assets/stylus/variable"
  .m-singer-detail
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background $color-background
    z-index 100
    h3
      height 30px
      line-height 30px
      background $color-dialog-background
      color $color-theme
      font-size $font-size-small
      text-align left
      padding 0 10px
    .admin-img
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 50%;
      -webkit-transform-origin: top;
      transform-origin: top;
      background-size: cover;
      .van-button--warning
        position absolute
        bottom 10px
        left calc(50% - 4em)
        background transparent
        border 1px solid $color-theme
        color $color-theme
        border-radius 20px
        height 30px
        line-height 30px
        font-size $font-size-small
    ul
      padding 10px 20px
      li
        width 100%
        clear both
        margin-bottom 20px
        div
          font-size $font-size-small
          p
            line-height 20px
            &:last-child
              color $color-text-d
</style>
