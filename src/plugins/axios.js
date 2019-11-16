import Vue from 'vue'
import router from '@/router'

// 依赖
import { AjaxPlugin, ToastPlugin } from 'vux'
Vue.use(AjaxPlugin)
Vue.use(ToastPlugin)
import Cookies from 'js-cookie'

const http = Vue.http.create({
	baseURL: '',
	timeout: 60 * 1000 // Timeout
	// withCredentials: true, // Check cross-site Access-Control
})
http.interceptors.request.use(
	config => {
		const url = config.url
		const loginReg = /login$/
		if (!loginReg.test(url)) {
			const Authorization = Cookies.get('Authorization')
			if (!Authorization) {
				router.push({ name: 'login'})
				// router.push({ name: 'login' , query: {code: '001gO5uf2nGunI0baksf268Htf2gO5ui'}})
			} else {
				config.headers.Authorization = Authorization
			}
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

http.interceptors.response.use(
	response => {
		const data = response.data
		if (data.status) {
			return {
				data: data.data,
				res: data
			}
		} else {
			if (data.code === 'NO_PERMISSION') {
				router.replace({ name: 'login' })
				// router.replace({ name: 'login', query: {code: '001gO5uf2nGunI0baksf268Htf2gO5ui'} })
			} else {
				// TODO 这个组件不是这样用的
				Vue.$vux.toast.show({
					text: data.message,
					type: 'text'
				})
			}
			return {
				data: {},
				res: data
			}
		}
	},
	error => {
		return Promise.reject(error)
	}
)

export default http
