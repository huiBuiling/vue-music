<template>
  <div class="m-player">
    <!--全屏-->
    <div class="m-player-screen" v-show="!mini && currentSong.name">
      <!--header-->
      <div class="m-player-head">
        <van-icon name="arrow-left" @click="goBack"/>
        <span>{{currentSong.name}}</span>
      </div>

      <!--con-->
      <div class="m-player-con" :class="{'play':isPlay, 'pause':!isPlay}">
        <img :src="currentSong.img" alt="">
      </div>

      <!--lrc-->
      <div class="m-player-lrc">
        <!--<div v-for="(item, index) in detail.lrc" :key="index">
          <p>{{item}}</p>
        </div>-->
      </div>

      <div class="m-player-bot">
        <!--slider-->
        <div class="m-player-slider">
          <span>{{format(currentTime)}}</span>
          <van-slider v-model="value" @change="setProgress" />
          <span>{{format(allTime)}}</span>
        </div>

        <!--bar-->
        <div class="m-player-bar">
          <span><i class="icon-p-sj"/></span>
          <span @click="pre"><i class="icon-p-pre"/></span>
          <!-- 播放 | 暂停-->
          <span><i style="font-size: 38px" :class="{'icon-p-bf': isPlay, 'icon-p-zt': !isPlay}" @click="isPlayMusic()"/></span>
          <span @click="next"><i class="icon-p-next"/></span>
          <span><i class="icon-p-xh"/></span>
        </div>
      </div>
    </div>

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

    <!--mini-->
    <div class="m-player-mini" v-show="mini && currentSong.name">
      <div class="m-player-mini-l" @click="showScreen">
        <img :src="currentSong.img" alt="">
        <div>
          <p>{{currentSong.name}}</p>
          <p>
            <span v-for="(item, index) in currentSong.singer" :key="index">{{item.name}}</span></p>
        </div>
      </div>

      <div class="m-player-mini-r">
        <!-- 播放 | 暂停-->
        <span><i style="font-size: 38px" :class="{'icon-p-bf': isPlay, 'icon-p-zt': !isPlay}" @click="isPlayMusic()"/></span>
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
import { musicMixin } from '../../utils/mixin'
import { Slider } from 'vant'
Vue.use(Slider)
export default {
  name: 'Player',
  mixins: [musicMixin],
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
      // 音量
      volume: 20
    }
  },
  methods: {
    // 返回
    goBack() {
      this.$emit('showDetail')
      this.setShowPlayer(false)
      this.setMini(true)
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
    // 显示全屏
    showScreen () {
      this.setShowPlayer(true)
      this.setMini(false)
    },
    /* 音乐操作 */
    // 播放 / 暂停
    isPlayMusic() {
      const audios = this.$refs.audio
      if (!this.isPlay) {
        // 在播放，当前执行暂停
        this.isPlay = true
        audios.load()
        audios.play()
      } else {
        // 暂停，当前执行播放
        this.isPlay = false
        audios.pause()
      }
    },
    // 上一首
    pre () {
      const audios = this.$refs.audio
      const id = this.currentSong.id
      const index = this.songLists.findIndex(item => item.id === id)
      const curSong = this.songLists[index - 1]
      if (index > 0) {
        audios.src = curSong.url
        audios.load()
        audios.play()
        this.setCurrentSong(curSong)
      }
    },
    // 下一首
    next () {
      const audios = this.$refs.audio
      const id = this.currentSong.id
      const index = this.songLists.findIndex(item => item.id === id)
      const curSong = this.songLists[index + 1]
      if (index < this.songLists.length) {
        audios.src = curSong.url
        audios.load()
        audios.play()
        this.setCurrentSong(curSong)
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
      this.isPlay = true
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
  @import "~assets/stylus/index"
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
  .m-player
    .m-player-mini
      position: fixed
      bottom: 0
      left: 0
      width: 100%
      height: 60px
      background: $color-background
      border-top: 1px solid $color-text-d
      .m-player-mini-l
        float: left
        padding: 10px
        img
          width: 40px
          height: 40px
          border-radius: 50%
          float: left
          margin-right: 10px
        div
          float: left
          text-align: left
          font-size: $font-size-small
          p
            line-height: 20px
            &:last-child
              color: $color-text-d
      .m-player-mini-r
        float: right
        margin-right: 10px
        padding-top: 13px
        span
          margin-right: 10px
          i
            color: $color-theme
    .m-player-screen
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: $color-background
      z-index: 100
      .m-player-head
        width: 100%
        height: 44px
        line-height: 44px
        color: $color-text
        text-align: center
        .van-icon
          position: absolute
          left: 10px
          top: 10px
        .title
          text-align: center
      .m-player-con
        width: 260px
        height: 260px
        border-radius: 50%
        //margin: calc((100% - 100px) / 3) auto 0
        margin: 15% auto 0
        border: 5px solid $color-dialog-background
        &.play
          animation: rotate 10s linear infinite
        &.pause
          animation-play-state: paused
        img
          width: 260px
          height: 260px
          border-radius: 50%
      .m-player-lrc
        padding: 0 10px
      .m-player-bot
        position: absolute
        bottom: 0
        left: 0
        width: 100%
        .m-player-slider
          height: 30px
          width: 85%
          margin: 0 auto 20px
          &>span
            float: left
            display: inline-block
            vertical-align: middle
            width: 60px
            line-height: 30px
            text-align: center
          .van-slider {
            float: left;
            width: calc(100% - 120px)
            vertical-align: middle
            margin-top: 15px
          }
        .m-player-bar
          height: 56px
          display: flex
          text-align: center
          &>span
            flex: 1
            font-size: 30px
            color: $color-theme
            i
              font-size: 30px
              vertical-align: text-bottom;
</style>
