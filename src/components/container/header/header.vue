<template>
  <div class="m-header">
    <div class="m-header-con">
      <div class="icon"></div>
      <h1 class="text">Chicken Music</h1>
      <!--<router-link tag="div" class="mine" to="/user">
        <i class="icon-mine" />
      </router-link>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {}
  }
}
</script>

<style lang="stylus">
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"

  .m-header
    position: fixed
    top 0
    left 0
    width 100%
    height 44px
    background $color-background
    text-align: center
    color $color-theme
    font-size: 0
    z-index 2
    .m-header-con
      width 100%
      text-align: center
      .icon
        display inline-block
        vertical-align top
        margin-top 6px
        width 30px
        height 32px
        margin-right 9px
        bg-image('logo')
        background-size 30px 32px
      .text
        display: inline-block
        vertical-align top
        line-height 44px
        font-size $font-size-large
        text-align center
      .mine
        position absolute
        top 0
        right 0
        .icon-mine
          display block
          padding 12px
          font-size 20px
          color $color-theme
</style>
