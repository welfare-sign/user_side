<template>
    <div class="sign-page">
        <sign-panel @sign="handleSign" :list="list"/>
        <user-info :info="info" />
        <merchant-recommend :list="merchantList" />
    </div>
</template>
<script>
/**
 * @description 签到页（入口页面）
 * @author 顾超<beyondc@foxmail.com>
 */
// 组件
import SignPanel from './Sign/SignPanel'
import UserInfo from './Sign/UserInfo'
import MerchantRecommend from './Sign/MerchantRecommend'

// 接口
import { user_detail, checkin_record, near_merchant, checkin } from '@/api/index'

export default {
    name: 'SignPage',
    components: {
        SignPanel,
        UserInfo,
        MerchantRecommend
    },
    data() {
        return {
            lon: '',
            lat: '',
            info: {},
            list: [],
            merchantList: []
        }
    },
    created() {
        this.initPage()
    },
    methods: {
        initPage() {
            this.getInfo()
            this.getList()
        },
        getInfo() {
            user_detail().then(({ data, res }) => {
                this.info = data ? data : {}
            })
        },
        getList() {
            checkin_record().then(({ data, res }) => {
                this.list = data ? data : []
                this.getStoreList()
            })
        },
        getStoreList() {
            debugger
            const _this = this
            this.getLocation().then(() => {
                debugger
                const params = {
                    lon: _this.lon,
                    lat: _this.lat
                }
                debugger
                near_merchant(params).then(({data, res}) => {
                    _this.merchantList = data ? data : []
                })
            })
        },
        getLocation() {
            const _this = this
            return new Promise((resolve, reject) => {
                debugger
                _this.$wechat.getLocation({
                    type: 'wgs84',
                    success: (res) => {
                        debugger
                        _this.lon = res.longitude
                        _this.lat = res.latitude
                        resolve()
                    }
                })
            })
        },
        handleSign(day) {
            const params = {day}
            checkin(params).then(({res}) => {
                this.getList()
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../styles/variables');
.sign-page {
    padding-left: @normal-gap;
    padding-right: @normal-gap;
    padding-bottom: 20px;
    position: relative;
}
</style>