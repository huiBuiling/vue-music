<template>
  <div class="m-singer-detail">
    <div class="admin-img" :style="bgStyle">
      <van-icon
        name="arrow-left"
        style="position: absolute;left: 10px;top: 10px;color: #fff"
        @click="goBack"
      />
    </div>
    <ul>
      <li v-for="(item, index) in singersDeatil" :key="index">
        <div>
          <p>{{item.musicData.singer[0].name}}</p>
          <p>{{item.musicData.albumname}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * @author hui
 * @date 2019/5/23
 * @Description: 歌手详情
 */
import {query} from '../../utils/AxiosUtil'
export default {
  name: 'SingerDetail',
  props: {
    // 'title':String,
    admin: String
  },
  data () {
    return {
      singersDeatil: [],
      singersDeatilUrl: '/tencent/song/artist?id='
    }
  },
  methods: {
    getSingerDetail(mid) {
      query(`${this.singersDeatilUrl}${mid}`).then((res) => {
        if (res.code === 200) {
          console.log(res.data[0])
          this.singersDeatil = res.data
        }
      })
    },
    goBack() {
      this.$router.push({path: '/singer'})
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.$store.state.singers.singerImg})`
    }
  },
  created() {
    this.getSingerDetail('001fNHEf1SFEFN')
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
    .admin-img{
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 50%;
      -webkit-transform-origin: top;
      transform-origin: top;
      background-size: cover;
    }
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
