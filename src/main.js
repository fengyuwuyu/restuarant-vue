// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import 'babel-polyfill'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueTabs from 'vue-nav-tabs'
// import Mint from 'mint-ui'
import store from './store'
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'
import 'swiper/dist/css/swiper.css'
import 'vue-nav-tabs/themes/vue-tabs.css'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)
Vue.use(VueTabs)
// Vue.use(Mint)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

Vue.prototype.getResourceUrl = function (item) {
  console.log(item)
  return '/api/resource/download?id=' + item.id + '&hash=' + item.hash
}

Vue.prototype.getWeekDay = function () {
  let day = new Date()
  return day.getDay()
}
