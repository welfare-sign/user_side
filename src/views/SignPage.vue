<template>
    <div class="sign-page">
        <sign-panel @sign="handleSign" @resign="handleResign" @pay="handlePay" :list="list" :is-aid="isAidSign" />
        <user-info :info="info" />
        <merchant-recommend :list="merchantList" />
        <div>
            <x-dialog
                v-model="payDialog.show"
                class="pay-dialog"
                :dialog-style="{'max-width': '100%', 'margin': '112px 34px', 'background-color': 'transparent'}"
                hide-on-blur
            >
                <div class="box">
                    <img class="wx-logo" src="@/assets/wechat-pay.png"/>
                    <p>微信支付{{payDialog.amount}}元即可补签</p>
                    <div class="btn-group">
                        <span class="cancel" @click="handleCancel">我再想想</span>
                        <span class="confirm" @click="handleConfirm">微信支付</span>
                    </div>
                </div>
                <div class="pay-close" @click="handleResign">
                    <span>重新签到</span>
                </div>
            </x-dialog>
        </div>
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
import {
    user_detail,
    checkin_record,
    near_merchant,
    checkin,
    re_checkin,
    wx_pay,
    is_supplement
} from '@/api/index'

// 依赖
const wx = require('weixin-js-sdk')

import {startWXPay, setWxShare} from '@/plugins/wechat-sdk'

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
            merchantList: [],
            payDialog: {
                show: false,
                amount: 5,
                options: {}
            },
            shareOptions: {
                title: '分享标题',
                desc: '分享描述',
                shareId: '',
                imgUrl: `${window.location.origin}/assets/icon.jpg`
            },
            isAidSign: false
        }
    },
    created() {
        this.initPage()
    },
    methods: {
        initPage() {
            this.getInfo()
            this.getList()
            this.getSignStatus()
        },
        getInfo() {
            user_detail().then(({ data, res }) => {
                this.info = data ? data : {}
                this.shareOptions.shareId = data && data.id
                // 分享需要当前用户信息所以要拿到用户信息才能设置
                this.setShare()
            })
        },
        getList() {
            checkin_record().then(({ data, res }) => {
                this.list = data ? data : []
                this.getStoreList()
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
        getSignStatus() {
            is_supplement().then(({data, res}) => {
                this.isAidSign = data
            })
        },
        handleSign() {
            checkin().then(({ res }) => {
                this.getList()
            })
        },
        handleResign() {
            this.payDialog.show = false
            re_checkin().then(res => {
                console.log('重新签到执行成功', res)
                this.getList()
            })
        },
        handlePay() {
            wx_pay().then(({data}) => {
                data = JSON.parse(data)
                this.payDialog.options = data
                this.payDialog.amount = ((data.payFee)/100).toFixed(2)
                this.payDialog.show = true
            })
        },
        handleCancel() {
            this.payDialog.show = false
        },
        handleConfirm() {
            startWXPay(this.payDialog.options).then(res => {
                console.log('支付成功', res)
                this.payDialog.show = false
                this.$vux.toast.show({
                    type: 'text',
                    text: '支付成功'
                })
                this.getList()
            })
        },
        setShare() {
            setWxShare(this.shareOptions)
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
.pay-dialog {
    font-size: @sub-title-font-size;
    font-weight: 400;
    .box {
        border-radius: @main-radius;
        background: #fff;
        color: @main-font-color;
        text-align: center;
        .wx-logo {
            margin-top: 26px;
            margin-bottom: 12px;
            width: 50px;
            height: 45px;
        }
        .btn-group {
            margin-top: 26px;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            display: flex;
            &>span {
                flex: 1;
                display: block;
                padding: @assist-gap 0;
            }
            .cancel {
                color: @normal-font-color;
            }
            .confirm {
                color: #1FBB22;
            }
        }
    }
    .pay-close {
        color: #fff;
        margin-top: 20px;
        text-decoration: underline;
    }
}
</style>