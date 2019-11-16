import Vue from 'vue'
import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)

export function wxAuthority(options) {
  // return new Promise((resolve, reject) => {
  // 	Vue.wechat.config({
  // 		debug: !(process.env.NODE_ENV === 'production'),
  // 		appId: options.appid, // 必填，公众号的唯一标识
  // 		timestamp: options.timestamp, // 必填，生成签名的时间戳
  // 		nonceStr: options.noncestr, // 必填，生成签名的随机串
  // 		signature: options.signature, // 必填，签名
  // 		jsApiList: [
  // 			'onMenuShareTimeline',
  // 			'onMenuShareAppMessage',
  // 			'getLocation',
  // 			'chooseWXPay'
  // 		] // 必填，需要使用的JS接口列表
  // 	})
  // 	Vue.wechat.ready(() => {
  // 		// Vue.watch.updateAppMessageShareData({
  // 		// 	title: '分享标题', // 分享标题
  // 		// 	desc: '分享描述', // 分享描述
  // 		// 	link: `${window.location.origin}/aid_sign`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  // 		// 	imgUrl: '', // 分享图标
  // 		// 	success() {
  // 		// 		debugger
  // 		// 		this.$vux.toast.show({
  // 		// 			type: 'text',
  // 		// 			message: '分享成功'
  // 		// 		})
  // 		// 	}
  //         // })
  // 		// debugger
  // 		resolve()
  // 	})
  // 	Vue.wechat.error(err => {
  // 		// debugger
  // 		reject(err)
  // 	})
  // })
  Vue.wechat.config({
    debug: !(process.env.NODE_ENV === 'production'),
    appId: options.appid, // 必填，公众号的唯一标识
    timestamp: options.timestamp, // 必填，生成签名的时间戳
    nonceStr: options.noncestr, // 必填，生成签名的随机串
    signature: options.signature, // 必填，签名
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'getLocation',
      'chooseWXPay'
    ] // 必填，需要使用的JS接口列表
  })
}
