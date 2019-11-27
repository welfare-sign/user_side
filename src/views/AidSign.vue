<template>
    <div class="aid-sign">
        <aid-sign-panel :info="info" :aid-able="aidAble" @aid-sign="handleAidSign" />
        <merchant-recommend :list="merchantList" />
    </div>
</template>
<script>
/**
 * @description 签到助力页（分享入口页面）
 * @author 顾超<beyondc@foxmail.com>
 */
// 组件
import AidSignPanel from './Sign/AidSignPanel'
import MerchantRecommend from './Sign/MerchantRecommend'

// 接口
import { user_detail, near_merchant, aid_checkin, login } from '@/api/index'

// 依赖
const wx = require('weixin-js-sdk')
import Cookies from 'js-cookie'
import Qs from 'qs'
const location = window.location
const wx_authrity_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?'

export default {
    name: 'SignPage',
    components: {
        AidSignPanel,
        MerchantRecommend
    },
    data() {
        return {
            code: '',
            shareId: '',
            aidAble: true,
            lon: '',
            lat: '',
            info: {},
            merchantList: []
        }
    },
    created() {
        const query = this.$route.query
        if (query) {
            this.code = query.code
            this.shareId = query.shareid
            sessionStorage.setItem('shareId', JSON.stringify(query.shareid))
        }
        this.code ? this.doAidSign() : this.initPage()
    },
    methods: {
        initPage() {
            this.getInfo()
            this.getStoreList()
        },
        getInfo() {
            user_detail({
                customer_id: this.shareId,
                is_help_checkin_page: true
            }).then(({ data, res }) => {
                if (res.code === 'ERR_HELP_CHECKIN_LIMIT') {
                    this.$router.push({ name: 'sign_page' })
                } else {
                    this.info = data ? data : {}
                }
            })
        },
        getStoreList() {
            const _this = this
            this.getLocation().then(() => {
                const params = {
                    lon: _this.lon,
                    lat: _this.lat,
                    distince: 99999
                }
                near_merchant(params).then(({ data, res }) => {
                    _this.merchantList = data ? data : []
                })
            })
        },
        getLocation() {
            const _this = this
            return new Promise((resolve, reject) => {
                wx.getLocation({
                    type: 'wgs84',
                    success: res => {
                        _this.lon = res.longitude
                        _this.lat = res.latitude
                        resolve()
                    }
                })
            })
        },
        handleAidSign() {
            const searchObj = {
                appid: sessionStorage.appid,
                redirect_uri: `${location.href}`,
                response_type: 'code',
                scope: 'snsapi_userinfo'
            }
            const searchStr = Qs.stringify(searchObj)
            const url = wx_authrity_url + searchStr + '#wechat_redirect'
            window.location.href = url
        },
        doAidSign() {
            const params = {
                code: this.code
            }
            login(params).then(({ data }) => {
                Cookies.set('Authorization', data)
                const datas = {
                    customer_id: JSON.parse(sessionStorage.shareId)
                }
                aid_checkin(datas).then(({ res }) => {
                    if (res.code === 'SUCCESS') {
                        this.$vux.toast.show({
                            text: '帮助好友签到成功！',
                            type: 'text'
                        })
                    }
                    this.aidAble = false
                    this.initPage()
                })
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../styles/index');
.aid-sign {
    .linear-gradient-horizontal();
    min-height: 100vh;
    padding: 20px @normal-gap;
    position: relative;
}
</style>