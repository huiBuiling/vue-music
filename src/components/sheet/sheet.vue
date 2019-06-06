<template>
  <div class="m-sheet">
    <ul class="m-sheet-con">
      <li v-for="(item, index) in datas" :key="index" @click="goDetail(item.id)">
        <img :src="item.creator.backgroundUrl" alt="">
        <div>
          <p class="name"><span>{{item.tag}}</span>{{item.name}}</p>
          <p class="nickname">by {{item.creator.nickname}}</p>
          <p class="copywriter">{{item.copywriter}}</p>
        </div>
      </li>
    </ul>

    <!--详情-->
    <router-view />
  </div>
</template>

<script>
/**
 * @author hui
 * @date 2019/5/23
 * @Description: 精品歌单
*/
import { query } from '../../utils/AxiosUtil'
export default {
  name: 'SongSheet',
  data () {
    return {
      datas: []
    }
  },
  methods: {
    getSongSheet () {
      this.$toast.loading({
        mask: true,
        message: '加载中...'
      })
      query('/netease/songList/highQuality?cat=全部&pageSize=20').then(res => {
        this.datas = res.data
        this.$toast.clear()
      })
    },
    // 跳转详情
    goDetail(id) {
      this.$router.push({
        path: `/sheet/${id}`
      })
    }
  },
  created () {
    this.getSongSheet()
  }
}
</script>

<style lang="stylus">
  @import "~assets/stylus/index"
  .m-sheet
    .m-sheet-con
      padding: 10px
      li
        background: $color-dialog-background
        overflow: hidden
        clear: both
        margin-bottom: 10px
        padding: 10px
        border-radius: 5px
        img
          width: 60px
          height: 60px
          border-radius: 5px
          float: left
          margin-right: 10px
        div
          float: left
          width: calc(100% - 90px)
          p
            color: $color-text
            margin-top: 4px
            margin-bottom: 8px
            no-warp()
            &.name
              font-size: $font-size-medium
              span
                background: $color-theme
                display: inline-block
                vertical-align: text-top
                font-size: $font-size-small
                padding: 3px 5px
                border-radius: 2px
                margin-right: 5px
            &.nickname
              font-size: $font-size-small
              color: $color-text-d
            &.copywriter
              font-size: $font-size-small
              color: $color-text-d
              margin-bottom: 0
</style>
