import Vue from 'vue'
import VueRouter from 'vue-router'
import SignPage from '@/views/SignPage'
import AidSign from '@/views/AidSign'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'sign_page',
		component: SignPage,
		meta: {
			title: '福力签'
		}
	},
	{
		path: '/aid_sign',
		name: 'aid_sign',
		component: AidSign,
		meta: {
			title: '分享补签'
		}
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/Login')
	},
	{
		path: '/my_welfare',
		name: 'my_welfare',
		component: () => import('@/views/MyWelfare'),
		meta: {
			title: '我的福利'
		}
	},
	{
		path: '/store_list',
		name: 'store_list',
		component: () => import('@/views/StoreList'),
		meta: {
			title: '全部商铺'
		}
	},
	{
		path: '/welfare_exchange',
		name: 'welfare_exchange',
		component: () => import('@/views/WelfareExchange'),
		meta: {
			title: '福利兑换'
		}
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
