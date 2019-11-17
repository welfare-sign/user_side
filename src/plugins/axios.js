import Vue from 'vue'
import router from '@/router'

// 依赖
import { AjaxPlugin, ToastPlugin } from 'vux'
Vue.use(AjaxPlugin)
Vue.use(ToastPlugin)
import Cookies from 'js-cookie'
import vm from '@/main'

import baseUrl from '@/utils/doman'
const http = Vue.http.create({
	baseURL: baseUrl || '',
	timeout: 60 * 1000 // Timeout
	// withCredentials: true, // Check cross-site Access-Control
})
http.interceptors.request.use(
	config => {
		const url = config.url
		const loginReg = /login$/
		if (!loginReg.test(url)) {
			const Authorization = Cookies.get('Authorization')
			const routeName = vm.$route.name
			if (!Authorization && routeName !== 'login') {
				router.push({ name: 'login', query: {from: routeName}})
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
			const routeName = vm.$route.name
			if (data.code === 'NO_PERMISSION' && routeName !== 'login' ) {
				router.replace({ name: 'login', query: {from: routeName} })
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
