<template>
  <div class="m-sheet-list">
    <!--详情-->
    <div v-if="listDatas.playCount" class="m-sheet-all">
      <!--img-->
      <div class="admin-img" :style="bgStyle">
        <van-icon
          name="arrow-left"
          style="position: absolute;left: 10px;top: 10px;color: #fff"
          @click="goBack"
        />

        <div class="m-s-count" v-show="listDatas.tracks">
          <div>
            <p>歌曲数</p>
            <p>{{filterNum(listDatas.playCount)}}</p>
          </div>
          <div style="border-left: 1px solid #ddd">
            <p>播放数</p>
            <p>{{listDatas.tracks.length}}</p>
          </div>
        </div>

        <div class="m-s-detail">
          <p style="color: #ffcd32;font-size: 14px;font-weight: bold;margin-bottom: 8px"><van-button type="warning">精品歌单</van-button>{{listDatas.name}}</p>
          <p>
            <span>
              by {{listDatas.creator.nickname}}
            </span>
            <span style="float: right;">
              标签：
              <span style="color: #ffcd32" v-for="(tag, indexT) in listDatas.tags" :key="indexT">
                {{tag}}{{indexT === (listDatas.tags.length - 1) ? '':'/'}}
              </span>
            </span>
          </p>
          <p class="m-s-intro">简介：{{listDatas.description}}</p>
        </div>
      </div>

      <!--list-->
      <div class="m-sheet-list-li" v-show="listDatas.tracks">
        <ul >
          <li v-for="(item, index) in listDatas.tracks" :key="index" @click="goPlayer(item)">
            <div class="m-detail-songs">
              <img :src="item.album.picUrl" alt="">
              <p class="m-sheet-names">
                <span>{{item.name}} - </span>
                <span v-for="(itemA, indexA) in item.artists" :key="indexA" style="font-size: 12px">
                    {{itemA.name}}{{index === (item.artists.length - 1) ? '':','}}
                  </span>
              </p>
              <p>专辑：{{item.album.name}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @author hui
 * @date 2019/5/23
 * @Description: 歌手详情
 */
import {query} from '../../utils/AxiosUtil'
import { musicMixin } from '../../utils/mixin'
export default {
  name: 'SheetDetail',
  mixins: [musicMixin],
  data () {
    return {
      listDatas: []
    }
  },
  methods: {
    getSingerDetail(id) {
      query(`/netease/songList?id=${id}&pageSize=20`).then((res) => {
        if (res.code === 200) {
          this.listDatas = res.data
          this.$toast.clear()
        }
      })
    },
    // 返回
    goBack() {
      this.$router.push({path: '/sheet'})
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
      this.setCurrentSong(curSong)
      this.setShowPlayer(true)
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
  created() {
    this.$toast.loading({
      mask: true,
      message: '加载中...'
    })
    const id = this.$route.params.id
    this.getSingerDetail(id)
  }
}
</script>

<style lang="stylus">
  @import "~assets/stylus/index"
  .m-sheet-list
    new-main()
    background: $color-background
    .m-sheet-all
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
        font-size: $font-size-small
        .van-button--warning
          background: transparent
          color: $color-theme
          border-color: $color-theme
          border-radius: 2px
          height: 20px
          line-height: 20px
          font-size: $font-size-small
          padding: 0 5px
          margin-right: 5px
        .m-s-count
          position: absolute
          right: 0
          top: 10px
          color: $color-text
          div
            float: left
            text-align: center
            padding: 0 10px
            p
              font-size: $font-size-medium
              &:last-child
                font-size: $font-size-small
                margin-top: 5px
        .m-s-detail
          position: absolute
          left: 10px
          bottom: 10px
          color: $color-text
          width: calc(100% - 20px);
          p
            font-size: $font-size-small
            color: $color-text-ll
            margin-bottom: 7px
          .m-s-intro
            no-warp()
      .m-sheet-list-li
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
            overflow: hidden
            margin-bottom: 7px
            border: 1px solid $color-dialog-background
            .m-detail-songs
              overflow: hidden
              font-size: $font-size-small
              padding: 7px
              img
                width: 40px;
                height: 40px;
                border-radius: 50%;
                float: left;
                margin-right: 10px;
              p
                line-height: 20px
                color: $color-text-d
                no-warp()
                &.m-sheet-names
                  color: $color-text
                  font-size: $font-size-medium
</style>
