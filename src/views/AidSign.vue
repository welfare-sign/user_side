<template>
    <div class="aid-sign">
        <aid-sign-panel :info="info" :list="list" />
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
import {
    user_detail,
    checkin_record,
    near_merchant,
    checkin
} from '@/api/index'

export default {
    name: 'SignPage',
    components: {
        AidSignPanel,
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
            this.getStoreList()
        },
        getInfo() {
            user_detail().then(({ data, res }) => {
                this.info = data ? data : {}
            })
        },
        getList() {
            checkin_record().then(({ data, res }) => {
                this.list = data ? data : []
            })
        },
        getStoreList() {
            const _this = this
            this.getLocation().then(() => {
                const params = {
                    lon: _this.lon,
                    lat: _this.lat
                }
                near_merchant(params).then(({ data, res }) => {
                    _this.merchantList = data ? data : []
                })
            })
        },
        getLocation() {
            const _this = this
            return new Promise((resolve, reject) => {
                this.$wechat.getLocation({
                    type: 'wgs84',
                    success: res => {
                        _this.lon = res.longitude
                        _this.lat = res.latitude
                        resolve()
                    }
                })
            })
        },
        handleSign(day) {
            const params = { day }
            checkin(params).then(({ res }) => {
                this.getList()
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../styles/index');
.aid-sign {
    .linear-gradient-horizontal();
    padding: 20px @normal-gap;
    position: relative;
}
</style>