<template>
  <div class="m-sheet">
    <ul>
      <li v-for="(item, index) in datas" :key="index">
        <img :src="item.creator.backgroundUrl" alt="">
        <div>
          <p class="name"><span>{{item.tag}}</span>{{item.name}}</p>
          <p class="nickname">by {{item.creator.nickname}}</p>
          <p class="copywriter">{{item.copywriter}}</p>
        </div>
      </li>
    </ul>
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
    ul
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
            &.nickname
              font-size: $font-size-small
              color: $color-text-d
            &.copywriter
              font-size: $font-size-small
              color: $color-text-d
              margin-bottom: 0
</style>
