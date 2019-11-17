<template>
    <div class="login" @click="handleLogin"></div>
</template>
<script>
// 接口
import { wx_config, login } from '@/api/index'
// 方法
import { wxAuthority } from '@/plugins/wechat-sdk'

// 依赖
import Qs from 'qs'
import Cookies from 'js-cookie'
const location = window.location
const wx_authrity_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?'
export default {
    name: 'Login',
    data() {
        return {
            options: {},
            code: ''
        }
    },
    // computed: {
    //     code() {
    //         return this.$route.query && this.$route.query.code
    //     }
    // },
    created() {
        const query = this.$route.query
        if (query) {
            this.code = query.code
            sessionStorage.setItem('fromPathName', JSON.stringify(query.from))
        }
        this.initLogin()
        if(this.code) {
            this.handleLogin()
        }
    },
    methods: {
        initLogin() {
            const url = location.href
            wx_config({ url }).then(({ data }) => {
                this.options = data
                wxAuthority(this.options)
            })
        },
        handleLogin() {
            const _this = this
            if (!this.code) {
                const searchObj = {
                    appid: this.options.appid,
                    redirect_uri: location.href,
                    response_type: 'code',
                    scope: 'snsapi_userinfo'
                }
                const searchStr = Qs.stringify(searchObj)
                const url = wx_authrity_url + searchStr + '#wechat_redirect'
                console.log(url)
                window.location.href = url
            } else {
                const params = {
                    code: _this.code
                }
                login(params).then(({ data }) => {
                    Cookies.set('Authorization', data)
                    const fromPathName = JSON.parse(sessionStorage.getItem('fromPathName'))
                    const name = fromPathName || 'sign_page'
                    this.$router.push({ name })
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.login {
    width: 100vw;
    height: 100vh;
    background: url(../assets/login.jpg);
    background-repeat: no-repeat;
    background-size: cover;
}
</style>