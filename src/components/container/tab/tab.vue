<template>
  <div class="m-tab">
    <div class="m-tab-con">
      <router-link tag="div" class="m-tab-item" to="/recommend">
        <span class="m-tab-link">推荐</span>
      </router-link>
      <router-link tag="div" class="m-tab-item" to="/singer">
        <span class="m-tab-link">歌手</span>
      </router-link>
      <router-link tag="div" class="m-tab-item" to="/sheet">
      <span class="m-tab-link">歌单
      </span>
      </router-link>
      <router-link tag="div" class="m-tab-item" to="/search">
        <span class="m-tab-link">搜索</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  data () {
    return {}
  }
}
</script>

<style lang="stylus">
  @import "~assets/stylus/variable"
  .m-tab
    position: fixed
    top: 44px
    left: 0
    width: 100%
    height: 44px
    background: $color-background
    z-index: 2
    .m-tab-con
      display: flex
      width: 100%
      height: 44px
      line-height: 44px
      font-size: $font-size-medium
      .m-tab-item
        flex: 1
        text-align: center
        .m-tab-link
          padding-bottom: 5px
          color: $color-text-l
        &.router-link-active
          .m-tab-link
            color: $color-theme
            border-bottom: 2px solid $color-theme
</style>
