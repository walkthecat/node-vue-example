// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import './assets/css/bootstrap.min.css'
import './assets/js/bootstrap.min'
Vue.use(VueResource)
Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    menuIndex: 0
  },
  mutations: {
    changeIndexMutation(state, n) {
      state.menuIndex = n
    }
  },
  actions: {
    changeIndexAction({
      commit,
      state
    }, n) {
      commit('changeIndexMutation', n);
    }
  }
})
new Vue({
  el: '#app',
  store: store,
  router
})
