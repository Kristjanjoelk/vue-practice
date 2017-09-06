import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations } from './mutations'

Vue.use(Vuex)
/* eslint-disable no-new */
export default new Vuex.Store({
  state,
  mutations
})
