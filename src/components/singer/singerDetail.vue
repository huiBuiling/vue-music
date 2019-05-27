<template>
  <div class="m-singer-detail">
    <!--详情-->
    <div v-if="!showPlayer">
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
      <div class="m-singer-detail-con">
        <van-tabs v-model="active" @click="checkType" animated>
          <!--单曲-->
          <van-tab title="单曲">
            <!--<scroll>-->
              <ul ref="wrapper">
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
          </van-tab>

          <!--专辑-->
          <van-tab title="专辑">
            <ul>
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
          </van-tab>

          <!--MV-->
          <van-tab title="MV">
            <ul>
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
          </van-tab>
        </van-tabs>
      </div>
    </div>

    <!--播放器-->
    <player v-if="showPlayer" @showDetail="showDetail" :currentSong="currentSong"/>
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
  data () {
    return {
      // 是否显示播放器
      showPlayer: true,
      // player 需要的属性
      currentSong: {
        id: '1357999894',
        name: '归去来兮',
        img: 'http://p4.music.126.net/H6dt7IgvXNWhRM_w7XbcqQ==/109951163990575387.jpg'
      },
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
      mvUrl: '/netease/mv/artist?id='
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
          this.showPlayer = true
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
    goBack() {
      this.$router.push({path: '/singer'})
    },
    goPlayer(item) {
      this.currentSong = {
        id: item.id,
        name: item.name,
        img: item.al.picUrl
      }
      console.log(item)
      this.showPlayer = true
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
  @import "~assets/stylus/variable"
  .m-singer-detail
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background $color-background
    z-index 100
    &>div
      width 100%
      height 100%
      .admin-img
        position: relative;
        width: 100%;
        height: 200px;
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
      .van-tabs
        color $color-theme
        font-size $font-size-small
        .van-tabs__line
          background $color-theme
        .van-tab
          background $color-background
          color $color-theme
        .van-hairline--top-bottom::after
          border none
      .m-singer-detail-con
        width 100%
        height calc(100% - 245px)
        overflow hidden
        ul
          height 100%
          overflow-x hidden
          overflow-y scroll
          padding 10px 20px
          li
            width 100%
            clear both
            margin-bottom 5px
            overflow hidden
            .m-detail-songs
              overflow hidden
              font-size $font-size-small
              p
                line-height 20px
                color $color-text
                &:last-child
                  color $color-text-d
            .m-detail-album
              font-size $font-size-small
              margin-bottom: 5px
              overflow hidden
              img
                width 40px
                height 40px
                margin-right 10px
                float left
              div
                float left
                p
                  color $color-text
                  line-height 20px
                  &:last-child
                    color $color-text-d
            .m-detail-mv
              font-size $font-size-medium
              margin-bottom: 5px
              overflow hidden
              background $color-dialog-background
              border-radius 5px
              padding: 10px
              img
                width 60px
                height 60px
                margin-right 10px
                float left
              div
                float left
                p
                  color $color-text
                  line-height 30px
                  &:last-child
                    color $color-text-d
                    font-size $font-size-small
</style>
