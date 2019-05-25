<template>
  <div class="m-player">
    <!--header-->
    <div class="m-player-head">
      <van-icon name="arrow-left" @click="goBack"/>
      <span v-for="(item, index) in detail.singer" :key="index" v-if="detail.singer">
        <span>{{item.name}}</span>
      </span>
    </div>

    <!--con-->
    <div class="m-player-con" :class="{'play':isPlay, 'pause':!isPlay}">
      <img v-if="detail.musicImg" :src="detail.musicImg" alt="">
    </div>

    <!--lrc-->
    <div class="m-player-lrc">
      <div v-for="(item, index) in detail.lrc" :key="index" v-if="detail.lrc">
        <p>{{item}}</p>
      </div>
    </div>

    <!--bar-->
    <div class="m-player-bar">
      <span><i class="icon-p-sj"/></span>
      <span><i class="icon-p-pre"/></span>
      <span><i style="font-size: 38px" :class="{'icon-p-bf':!isPlay, 'icon-p-zt':isPlay}" @click="isPlayMusic"/></span>
      <span><i class="icon-p-next"/></span>
      <span><i class="icon-p-xh"/></span>
    </div>
  </div>
</template>

<script>
/**
 * @author hui
 * @date 2019/5/23
 * @Description: 音乐播放
*/
import {query} from '../../utils/AxiosUtil'
export default {
  name: 'Player',
  data () {
    return {
      detailurl: '/tencent/song?id=',
      musicUrl: '/tencent/url?id=',
      musicImgUrl: '/tencent/pic?id=',
      lrcUrl: '/tencent/lrc?id=',
      detail: {},
      musicImg: '',
      isPlay: true
    }
  },
  methods: {
    goBack() {
      this.$emit('showDetail')
    },
    // 获取当前歌曲详情
    getDatail(mid) {
      query(`${this.detailurl}${mid}`).then(res => {
        if (res.code === 200) {
          console.log(this.detail)
          this.detail.name = res.data[0].name
          this.detail.singer = res.data[0].singer
        }
      })
    },
    // 获取音乐地址
    getUrl(mid) {
      query(`${this.musicUrl}${mid}&isRedirect=0`).then(res => {
        if (res.code === 200) {
          console.log(this.detail)
          this.detail.url = res.data
        }
      })
    },
    // 获取音乐图片
    getImg(mid) {
      query(`${this.musicImgUrl}${mid}&isRedirect=0`).then(res => {
        if (res.code === 200) {
          console.log(this.detail)
          this.detail.musicImg = res.data
        }
      })
    },
    // 获取歌词
    getLrc(mid) {
      query(`${this.lrcUrl}${mid}`).then(res => {
        if (res.code === 200) {
          debugger
          console.log(res)
          this.detail.lrc = res.split(']')
        }
      })
    },
    isPlayMusic() {
      this.isPlay = !this.isPlay
    }
  },
  created() {
    // const mid = '002E3MtF0IAMMY'
    const mid = this.$route.params.id
    console.log(mid)
    this.getDatail(mid)
    this.getUrl(mid)
    this.getImg(mid)
    this.getLrc(mid)
  }
}
</script>

<style lang="stylus">
  @import "~assets/stylus/variable"
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
  .m-player
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background $color-background
    z-index 100
    .m-player-head
      width 100%
      height 44px
      line-height 44px
      color $color-text
      text-align center
      .van-icon
        position absolute
        left 10px
        top 10px
      .title
        text-align center
    .m-player-con
      width 260px
      height 260px
      border-radius 50%
      //margin calc((100% - 100px) / 3) auto 0
      margin 50px auto 0
      border 5px solid $color-dialog-background
      &.play
        animation: rotate 10s linear infinite
      &.pause
        animation-play-state: paused
      img
        width 260px
        height 260px
        border-radius 50%
    .m-player-lrc
      padding 0 10px
    .m-player-bar
      position absolute
      bottom 0
      left 0
      width 100%
      height 56px
      display flex
      text-align center
      &>span
        flex 1
        font-size 30px
        color $color-theme
        i
          font-size 30px
          vertical-align: text-bottom;
</style>
