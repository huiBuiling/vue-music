<template>
  <div class="m-singer-detail">
    <!--详情-->
    <div v-if="!showPlayer" class="m-singer-all">
      <!--img-->
      <div class="admin-img" :style="bgStyle">
        <van-icon
          name="arrow-left"
          style="position: absolute;left: 10px;top: 10px;color: #fff"
          @click="goBack"
        />

        <van-button type="warning">随机播放全部</van-button>
      </div>

      <!--list-->
      <!--<div class="m-singer-detail-con">-->
        <van-tabs v-model="active" @click="checkType" animated>
          <!--单曲-->
          <van-tab title="单曲"></van-tab>
          <van-tab title="专辑"></van-tab>
          <van-tab title="MV"></van-tab>
        </van-tabs>

        <div class="m-singer-detail-li">
          <!--<scroll>-->
          <ul ref="wrapper"  v-if="active === 0">
            <li v-for="(item, index) in musicDatas" :key="index" @click="goPlayer(item)">
              <div class="m-detail-songs">
                <p>{{item.name}}</p>
                <p>
                      <span v-for="(itemA, indexA) in item.ar" :key="indexA">
                        {{itemA.name}}{{(indexA + 1) === item.ar.length ? '':','}}
                      </span>
                </p>
              </div>
            </li>
          </ul>
          <!--</scroll>-->

          <!--专辑-->
          <ul v-if="active === 1">
            <li v-for="(item, index) in albumDatas" :key="index">
              <div class="m-detail-album">
                <img :src="item.picUrl" alt="">
                <div>
                  <p>{{item.name}}</p>
                  <p>{{item.artist.name}}</p>
                </div>
              </div>
            </li>
          </ul>

          <!--MV-->
          <ul v-if="active === 2">
            <li v-for="(item, index) in mvDatas" :key="index">
              <div class="m-detail-mv">
                <img :src="item.imgurl" alt="">
                <div>
                  <p>{{item.name}}</p>
                  <p>{{item.artistName}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      <!--</div>-->
    </div>

    <!--播放器-->
    <player
      v-if="showPlayer || mini"
      @showDetail="showDetail"
      :mini="mini"
    />
  </div>
</template>

<script>
/**
 * @author hui
 * @date 2019/5/23
 * @Description: 歌手详情
 */
import Vue from 'vue'
import {query} from '../../utils/AxiosUtil'
import Player from './player'
import { Tab, Tabs } from 'vant'
import { musicMixin } from '../../utils/mixin'
// import BScroll from 'better-scroll'
Vue.use(Tab).use(Tabs)
export default {
  name: 'SingerDetail',
  components: {
    Player
  },
  props: {
    admin: String
  },
  mixins: [musicMixin],
  data () {
    return {
      // tab active
      active: 0,
      // 单曲列表
      musicDatas: [],
      musicUrl: '/netease/song/artist?id=',
      // 专辑列表
      albumDatas: [],
      albumUrl: '/netease/album/artist?id=',
      // MV列表
      mvDatas: [],
      mvUrl: '/netease/mv/artist?id=',
      // 是否显示播放器
      showPlayer: false,
      // mini模式
      mini: false
    }
  },
  methods: {
    // 根据type获对应取列表
    getSingerDetail(id, type) {
      let url = ''
      if (type === '单曲') {
        url = this.musicUrl
      } else if (type === '专辑') {
        url = this.albumUrl
      } else if (type === 'MV') {
        url = this.mvUrl
      }
      query(`${url}${id}`).then((res) => {
        if (res.code === 200) {
          if (type === '单曲') {
            this.musicDatas = res.data
          } else if (type === '专辑') {
            this.albumDatas = res.data
          } else if (type === 'MV') {
            this.mvDatas = res.data
          }
          this.$toast.clear()
          // this.showPlayer = true
        }
      })
    },
    // 切换类型
    checkType(index, title) {
      this.$toast.loading({
        mask: true,
        message: '加载中...'
      })
      this.active = index
      const id = this.$route.params.id
      this.getSingerDetail(id, title)
    },
    // 返回
    goBack() {
      this.$router.push({path: '/singer'})
    },
    // 显示播放器
    goPlayer(item) {
      /* const curSong = {
        id: item.id,
        singer: item.ar,
        name: item.name,
        img: item.al.picUrl
      } */
      const curSong = {
        id: '1357999894',
        singer: [{name: '花粥'}, {name: '胜男'}],
        name: '归去来兮',
        img: 'http://p4.music.126.net/H6dt7IgvXNWhRM_w7XbcqQ==/109951163990575387.jpg',
        url: 'http://www.ytmp3.cn/down/50354.mp3'
      }
      // this.$store.dispatch('singers/setCurrentSong', this.currentSong)
      // 使用 musicMixin
      this.setCurrentSong(curSong)

      this.showPlayer = true
      this.mini = false
    },
    // 显示详情
    showDetail() {
      this.showPlayer = false
      this.mini = true
    }
  },
  computed: {
    bgStyle() {
      // return `background-image:url(${this.$store.state.singers.singerImg})`
      return `background-image:url(${this.singerImg})`
    }
  },
  /* mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {})
    })
  }, */
  created() {
    this.$toast.loading({
      mask: true,
      message: '加载中...'
    })
    const id = this.$route.params.id
    this.getSingerDetail(id, '单曲')
  }
}
</script>

<style lang="stylus">
  @import "~assets/stylus/index"
  .m-singer-detail
    new-main()
    background: $color-background
    .m-singer-all
      width: 100%
      height: 100%
      overflow: hidden
      .admin-img
        position: relative
        width: 100%
        height: 200px
        -webkit-transform-origin: top
        transform-origin: top
        background-size: cover
        .van-button--warning
          position: absolute
          bottom: 10px
          left: calc(50% - 4em)
          background: transparent
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 20px
          height: 30px
          line-height: 30px
          font-size: $font-size-small
      .van-tabs
        color: $color-theme
        font-size: $font-size-small
        .van-tabs__nav
          background: $color-background
          .van-tabs__line
            background: $color-theme
        .van-tab
          background: $color-background
          color: $color-theme
        .van-hairline--top-bottom::after
          border: none
      .m-singer-detail-li
        width: 100%
        height: calc(100% - 245px)
        overflow-x: hidden
        ul
          height: 100%
          overflow-x: hidden
          padding: 10px 20px
          li
            width: 100%
            clear: both
            margin-bottom: 5px
            overflow: hidden
            .m-detail-songs
              overflow: hidden
              font-size: $font-size-small
              p
                line-height: 20px
                color: $color-text
                &:last-child
                  color: $color-text-d
            .m-detail-album
              font-size: $font-size-small
              margin-bottom: 5px
              overflow: hidden
              img
                width: 40px
                height: 40px
                margin-right: 10px
                float: left
              div
                float: left
                p
                  color: $color-text
                  line-height: 20px
                  &:last-child
                    color: $color-text-d
            .m-detail-mv
              font-size: $font-size-medium
              margin-bottom: 5px
              overflow: hidden
              background: $color-dialog-background
              border-radius: 5px
              padding: 10px
              img
                width: 60px
                height: 60px
                margin-right: 10px
                float: left
              div
                float: left
                p
                  color: $color-text
                  line-height: 30px
                  &:last-child
                    color: $color-text-d
                    font-size: $font-size-small
</style>
