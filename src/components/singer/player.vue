<template>
  <div class="m-player">

    <!--header-->
    <div class="m-player-head">
      <van-icon name="arrow-left" @click="goBack"/>
      <span>{{currentSong.name}}</span>
    </div>

    <!--con-->
    <div class="m-player-con" :class="{'play':isPlay, 'pause':!isPlay}">
      <img v-if="currentSong.img" :src="currentSong.img" alt="">
    </div>

    <!--lrc-->
    <div class="m-player-lrc">
      <!--<div v-for="(item, index) in detail.lrc" :key="index" v-if="detail.lrc">
        <p>{{item}}</p>
      </div>-->
    </div>

    <div class="m-player-bot">
      <!--audio-->
      <audio
             autoplay="true"
             ref="audio"
             :src="currentSong.url"
             @error="error"
             @timeupdate="updateTime"
             @durationchange="init"
             @ended="end"
      />

      <!--slider-->
      <div class="m-player-slider">
        <span>{{format(currentTime)}}</span>
        <van-slider v-model="value" @change="setProgress" />
        <span>{{format(allTime)}}</span>
      </div>

      <!--bar-->
      <div class="m-player-bar">
        <span><i class="icon-p-sj"/></span>
        <span><i class="icon-p-pre"/></span>
        <!--播放-->
        <span v-show="isPlay"><i style="font-size: 38px" class="icon-p-bf'" @click="isPlayMusic(true)"/></span>
        <!--暂停-->
        <span v-show="!isPlay"><i style="font-size: 38px" class="icon-p-zt" @click="isPlayMusic(false)"/></span>
        <span><i class="icon-p-next"/></span>
        <span><i class="icon-p-xh"/></span>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @author hui
 * @date 2019/5/23
 * @Description: 音乐播放
*/
import Vue from 'vue'
import {query} from '../../utils/AxiosUtil'
import { Slider } from 'vant'
Vue.use(Slider)
export default {
  name: 'Player',
  /* props: {
    currentSong: {}
  }, */
  data () {
    return {
      lrcUrl: '/tencent/lrc?id=',
      isPlay: false,
      // 进度时间
      currentTime: 0,
      // 歌曲总长
      allTime: 0,
      // 进度值
      value: 0,
      currentSong: {
        id: '1357999894',
        name: '归去来兮',
        img: 'http://p4.music.126.net/H6dt7IgvXNWhRM_w7XbcqQ==/109951163990575387.jpg',
        // url: 'http://www.ytmp3.cn/down/59296.mp3'
        url: 'http://www.ytmp3.cn/down/50354.mp3'
      },
      // 音量
      volume: 10
    }
  },
  methods: {
    // 返回
    goBack() {
      this.$emit('showDetail')
    },
    // 获取音乐地址
    getMusicUrl(id) {
      query(`/netease/url?id=${id}&quality=flac`).then(res => {
        if (res.code === 200) {
          debugger
          console.log(res)
          this.detail.lrc = res.split(']')
        }
      })
    },
    // 获取歌词
    getLrc(id) {
      query(`${this.lrcUrl}${id}`).then(res => {
        if (res.code === 200) {
          console.log(res)
          this.detail.lrc = res.split(']')
        }
      })
    },
    /* 音乐操作 */
    // 播放 / 暂停
    isPlayMusic(flag) {
      const audios = this.$refs.audio
      if (flag) {
        // 播放
        this.isPlay = true
        audios.load()
        audios.play()
      } else {
        // 暂停
        this.isPlay = false
        audios.pause()
      }
    },
    // 播放完毕
    end() {
      this.isPlay = false
    },
    // 出错
    error() {
      this.isPlay = false
    },
    // 时间更新
    updateTime(e) {
      this.currentTime = e.target.currentTime
      this.value = this.currentTime / this.allTime * 100
    },
    // 初始化
    init() {
      const audios = this.$refs.audio
      this.currentTime = audios.currentTime
      this.allTime = audios.duration
      audios.volume = (this.volume / 100)
    },
    // 格式化时间
    format(interval) {
      interval = interval | 0
      const minute = interval / 60 | 0
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    },
    // 时间转换
    _pad(num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    // 设置进度
    setProgress (val) {
      const audios = this.$refs.audio
      // 更新audio进度
      audios.currentTime = val / 100 * this.allTime
      this.currentTime = audios.currentTime
      this.value = this.currentTime / this.allTime * 100
    }
  },
  mounted() {},
  created() {
    // const id = this.currentSong.id
    // this.getMusicUrl(id)
    // this.getLrc(id)
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
      margin 15% auto 0
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
    .m-player-bot
      position absolute
      bottom 0
      left 0
      width 100%
      .m-player-slider
        height 30px
        width 85%
        margin 0 auto 20px
        &>span
          float left
          display inline-block
          vertical-align: middle
          width: 60px
          line-height 30px
          text-align center
        .van-slider {
          float left;
          width calc(100% - 120px)
          vertical-align: middle
          margin-top 15px
        }
      .m-player-bar
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
