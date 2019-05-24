import Vue from 'vue'
import Vuex from 'vuex'
// import demo from './module/demo'
import singers from './module/singers'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // demo,
    singers
  }
})

export default store
