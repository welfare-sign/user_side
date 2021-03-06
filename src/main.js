import Vue from 'vue'
import App from './App.vue'
import FastClick from 'fastclick'
import router from './router'

// 插件
import './plugins/vux'
import './plugins/wechat-title'
import './plugins/infinit_scroll'

// 样式
import 'reset-css'
import './styles/theme.less'

// 全局设置权限
import '@/utils/wxAuthority'

import '@/utils/fixInput'

Vue.config.productionTip = false
FastClick.attach(document.body)

const vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')

export default vm