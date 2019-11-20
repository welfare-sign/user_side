import Vue from 'vue'

const wx = require('weixin-js-sdk')

const jsApiList = [
  'updateAppMessageShareData',
  'updateTimelineShareData',
  'onMenuShareTimeline',
  'onMenuShareAppMessage',
  'getLocation',
  'chooseWXPay'
]

export function wxAuthority(options) {
  wx.config({
    debug: false,
    appId: options.appid, // 必填，公众号的唯一标识
    timestamp: options.timestamp, // 必填，生成签名的时间戳
    nonceStr: options.noncestr, // 必填，生成签名的随机串
    signature: options.signature, // 必填，签名
    jsApiList // 必填，需要使用的JS接口列表
  })

  wx.ready(() => {
    wx.checkJsApi({
      jsApiList,
      success(res) {
        console.log(res)
      }
    })
  })
  wx.error(err => {
    console.log(err.message)
    // Vue.$vux.toast.show({
    //   text: `微信公众号授权失败${err}`,
    //   type: 'text'
    // })
  })
}

export function setWxShare(options) {
  wx.updateAppMessageShareData({
    title: options.title, // 分享标题
    desc: options.desc, // 分享描述
    link: `${window.location.origin}/aid_sign?shareid=${options.shareId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: options.imgUrl, // 分享图标
    success() {
      console.log('分享设置成功')
    }
  })
  wx.updateTimelineShareData({
    title: options.title, // 分享标题
    desc: options.desc, // 分享描述
    link: `${window.location.origin}/aid_sign?shareid=${options.shareId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: options.imgUrl, // 分享图标
    success() {
      console.log('分享设置成功')
    }
  })
}

export function startWXPay(options) {
  return new Promise((resolve, reject) => {
    wx.chooseWXPay({
      timestamp: options.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: options.nonceStr, // 支付签名随机串，不长于 32 位
      package: options.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
      signType: options.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: options.paySign, // 支付签名
      success(res) {
        resolve(res)
      }
    })
  })
}
