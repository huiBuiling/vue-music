import Vue from 'vue'
import Vuex from 'vuex'
import singers from './module/singers'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    singers
  }
})

export default store
