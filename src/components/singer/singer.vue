<template>
  <div>
    <div class="m-singer">
      <h3>歌手列表</h3>
      <ul v-show="showSinger">
        <li v-for="(item, index) in singers" :key="index" @click="goDetail(item.id)">
          <div>
            <img :src="item.img1v1Url" alt="">
            <span>{{item.name}}</span>
          </div>
        </li>
      </ul>
    </div>

    <!--详情-->
    <router-view admin="hahaahha"></router-view>
  </div>
</template>

<script>
/**
 * @author hui
 * @date 2019/5/23
 * @Description: 歌手
*/
import {query} from '../../utils/AxiosUtil'
export default {
  name: 'Singer',
  data () {
    return {
      singers: [],
      singerUrl: '/netease/artist/top?page=0&pageSize=30',
      name: '',
      showSinger: false
    }
  },
  methods: {
    // 获取歌手列表
    getSingerList() {
      query(this.singerUrl).then((res) => {
        if (res.code === 200) {
          this.singers = res.data
          this.showSinger = true
        }
      })
    },
    // 跳转详情
    goDetail(id) {
      // this.showSinger = false
      // this.$store.dispatch('singers/changImg', img)
      this.$router.push({
        path: `/singer/${id}`
      })
    }
  },
  created() {
    this.getSingerList()
  }
}
</script>

<style lang="stylus">
  @import "~assets/stylus/variable"
  .m-singer
    h3
      height 30px
      line-height 30px
      background $color-dialog-background
      color $color-theme
      font-size $font-size-small
      text-align left
      padding 0 10px
    ul
      padding 10px 20px
      li
        width 100%
        clear both
        margin-bottom 10px
        div
          font-size $font-size-medium
          img
            width 40px
            height 40px
            float left
            margin-right 10px
            border-radius 50%
          span
            color $color-text
            line-height 40px
</style>
