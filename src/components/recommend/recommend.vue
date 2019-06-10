<template>
  <div class="m-recommend">
    <!--轮播图-->
    <div class="m-recommend-swipe">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in recommend_imgs" :key="index">
          <img :src="item.picUrl" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>

    <!--详情-->
    <div class="m-recommend-list">
      <h3>热门歌单推荐</h3>
      <ul>
        <li v-for="(item, index) in recommend_lists" :key="index">
          <div>
            <img :src="item.imgurl" alt="">
            <div>
              <p>{{item.creator.name}}</p>
              <p>{{item.dissname}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
 * @author hui
 * @date 2019/5/23
 * @Description: 推荐
*/
import Vue from 'vue'
import { Swipe, SwipeItem } from 'vant'
import {getRecommend} from '../../api/recommend'
import {query} from '../../utils/AxiosUtil'
Vue.use(Swipe).use(SwipeItem)
export default {
  name: 'Recommend',
  components: {
  },
  data () {
    return {
      recommend_imgs: [],
      recommend_lists: [],
      listUrl: '/tencent/songList/hot?cat=%E5%85%A8%E9%83%A8&pageSize=100&page=0'
    }
  },
  methods: {
    _getRecommend() {
      this.$toast.loading({
        mask: true,
        message: '加载中...'
      })
      getRecommend().then(res => {
        if (res.code === 0) {
          this.recommend_imgs = res.data.slider
        }
      })
    },
    getDiscList() {
      query(this.listUrl).then(res => {
        if (res.code === 200) {
          this.recommend_lists = res.data.list
          this.$toast.clear()
        }
      })
    }
  },
  created() {
    this._getRecommend()
    this.getDiscList()
  }
}
</script>

<style lang="stylus">
  @import "~assets/stylus/variable"

  .m-recommend
    width: 100%
    height: 100%
    .m-recommend-swipe
      width: 100%
      height: 170px
      overflow: hidden
      .van-swipe
        width: 100%
        height: 100%
        img
          width: 100%
          height: 100%
    .m-recommend-list
      padding: 10px
      h3
        text-align: center
        color: $color-theme
        margin-top: 5px
        font-size: $font-size-medium-x
      ul
        padding: 10px
        li
          width: 100%
          height: 60px
          clear: both
          margin-bottom: 10px
          div
            font-size: $font-size-medium
            img
              width: 60px
              height: 60px
              float: left
              margin-right: 10px
              border-radius: 2px
            div
              padding-top: 2px
              p
                line-height: 28px
                &:last-child
                  color: $color-text-d
                  font-size: $font-size-small
                  line-height: 20px
</style>
