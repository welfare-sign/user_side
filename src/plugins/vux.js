import Vue from "vue"
import {
	XButton,
	Group,
	CellBox,
	XImg,
	Qrcode,
	WechatPlugin,
	AjaxPlugin,
	XDialog,
	Confirm,
	ToastPlugin
} from "vux"

Vue.component("x-button", XButton)
Vue.component("group", Group)
Vue.component("cell-box", CellBox)
Vue.component("x-img", XImg)
Vue.component("qrcode", Qrcode)
Vue.component('x-dialog', XDialog)
Vue.component('confirm', Confirm)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(ToastPlugin)
