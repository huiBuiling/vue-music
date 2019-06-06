<template>
  <div id="app">
    <!--header-->
    <Header />

    <!--tab-->
    <Tab />

    <!--router-->
    <div class="m-all">
      <router-view />
    </div>

    <!--播放器-->
    <player
      v-show="showPlayer || mini"
    />

  </div>
</template>

<script>
import Header from 'components/container/header/header'
import Tab from 'components/container/tab/tab'
import Player from './components/player/player'
import { musicMixin } from './utils/mixin'
/**
 * @author hui
 * @date 2019/5/23
 * @Description: app
*/
export default {
  name: 'App',
  components: {
    Header,
    Tab,
    Player
  },
  mixins: [musicMixin]
}
</script>

<style lang="stylus"></style>
