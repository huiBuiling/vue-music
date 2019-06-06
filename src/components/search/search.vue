<template>
  <div class="m-search">
    <div class="m-search-input">
      <van-search
        placeholder="请输入搜索关键词"
        v-model="value"
        @search="onSearch"
      />
    </div>
    <div v-show="results.length === 0">
      <h5>热门搜索</h5>
      <div class="m-search-tags">
        <van-tag plain v-for="(item, index) in tagList" :key="index" @click="setValue(item)">{{item}}</van-tag>
      </div>
    </div>

    <div v-show="results.length > 0">
      <h5>搜索结果</h5>
      <ul>
        <li v-for="(item, index) in results" :key="index" @click="goPlayer">
          <span class="name">{{item.name}} - </span>
          <span v-for="(itemA, indexA) in item.ar" :key="indexA">{{itemA.name}}<span v-show="indexA < (item.ar.length - 1)">,</span></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
 * @author hui
 * @date 2019/5/23
 * @Description: 搜索
 */
import Vue from 'vue'
import {Search, Tag} from 'vant'
import {query} from '../../utils/AxiosUtil'
import {musicMixin} from '../../utils/mixin'
Vue.use(Search).use(Tag)
export default {
  name: 'Search',
  mixins: [musicMixin],
  data() {
    return {
      value: '',
      tagList: ['邓紫棋', '你曾是少年', '有一种悲伤', '我的一个道姑朋友', '兄弟', '孤身', '汪峰', '薛子谦', '毛不易', '都是夜归人', '贝加尔湖畔'],
      results: []
    }
  },
  methods: {
    onSearch() {
      const url = `/netease/search?keyword=${this.value}&type=song&pageSize=20&page=0`
      query(url).then(res => {
        if (res.code === 200) {
          this.results = res.data.songs
          console.log(res.data.songs)
        }
      })
    },
    setValue (val) {
      this.value = val
      this.onSearch()
    },
    // 显示播放器
    goPlayer() {
      const curSong = {
        id: '1',
        singer: [{name: '花粥'}, {name: '胜男'}],
        name: '归去来兮',
        img: 'http://p4.music.126.net/H6dt7IgvXNWhRM_w7XbcqQ==/109951163990575387.jpg',
        url: 'http://www.ytmp3.cn/down/50354.mp3'
      }
      this.setCurrentSong(curSong)
      this.setShowPlayer(true)
      this.setMini(false)
    }
  }
}
</script>

<style lang="stylus">
  @import "~assets/stylus/index"
  .m-search
    background: $color-background
    padding: 10px 20px
    .m-search-input
      width: 100%
      .van-search
        background: $color-background
        padding: 0
        border-radius: 5px;
        .van-search__content.van-search__content--square
          background-color: $color-highlight-background
          .van-cell.van-field
            background: $color-highlight-background
            border-radius: 5px
            color: $color-text
            input.van-field__control
              color: $color-text
    h5
      color: $color-text-l
      font-size: $font-size-small
      margin: 30px 0 15px
    .m-search-tags
      .van-tag {
        margin: 0 10px 10px 0
        background: $color-highlight-background
      }
    ul
      padding-left: 10px
      li
        font-size: $font-size-small-s
        margin-bottom: 10px
        color: $color-text-l
        .name
          font-size: $font-size-medium
</style>
