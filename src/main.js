import Vue from 'vue'
import App from './App.vue'
import FastClick from 'fastclick'
import router from './router'

// 插件
import './plugins/vux'
import './plugins/wechat-title'

// 样式
import 'reset-css'
import './styles/theme.less'

Vue.config.productionTip = false
FastClick.attach(document.body)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
