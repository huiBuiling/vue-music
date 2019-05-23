<template>
  <div id="app">
    <!--header-->
    <Header />

    <!--tab-->
    <Tab />

    <!--router-->
    <router-view />
  </div>
</template>

<script>
import Header from 'components/container/header/header'
import Tab from 'components/container/tab/tab'
/**
 * @author hui
 * @date 2019/5/23
 * @Description: app
*/
export default {
  name: 'App',
  components: {
    Header,
    Tab
  }
}
</script>

<style lang="stylus"></style>
