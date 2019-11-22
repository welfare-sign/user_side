import router from '@/router/index'
import {authority} from '@/plugins/wechat-sdk'
function isIos() {
  const u = navigator.userAgent;
  return u.indexOf("iPhone") > -1 || u.indexOf("Mac OS") > -1;
}

function getWechatSignUrl(to){
    if(isIos()) {
      return window.location.href;
    } else {
      return window.location.origin + to.fullPath
    }
}

router.beforeEach((to, from, next) => {
    const url = getWechatSignUrl(to)
    authority(url)
    next()
})