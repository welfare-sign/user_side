<template>
    <div class="welfare-exchange">
        <ul class="list">
            <li v-for="item in welfareList" :key="item.id" @click="handleSelect(item.id)">
                <w-card class="item">
                    <div class="item-content">
                        <input
                            class="w-radio"
                            type="radio"
                            name="select"
                            :id="item.id"
                            :checked="item.id === selected"
                        />
                        <label class="w-radio-next" :for="item.id">
                            <span :class="['radio-box', {'checked': item.id === selected}]"></span>
                            <w-merchant-item
                                :name="item.store_name"
                                :address="item.address"
                                :desc="item.desc"
                                :logo="item.store_avatar"
                            />
                        </label>
                    </div>
                </w-card>
            </li>
        </ul>
        <footer>
            <x-button type="primary" :disabled="!selected" @click.native="handleExchange">领取福利</x-button>
        </footer>
        <x-dialog
            v-model="mobileDialog.show"
            class="mobile-dialog"
            :dialog-style="{'max-width': '100%', 'background-color': 'transparent', 'margin': '184px 34px'}"
        >
            <div class="box">
                <div class="content">
                    <h2 class="title">输入手机号，领取您的福利</h2>
                    <group class="form-group">
                        <x-input
                            placeholder="请输入手机号"
                            type="text"
                            is-type="china-mobile"
                            v-model="mobile"
                        >
                            <w-countdown
                                slot="right"
                                v-model="countStart"
                                :color="countColor"
                                @click-event="handleStart"
                            />
                        </x-input>
                        <x-input placeholder="请输入验证码" v-model="code"></x-input>
                    </group>
                </div>
                <div class="btn">
                    <x-button
                        mini
                        type="primary"
                        @click.native="exchange"
                        :disabled="exchangeDisabled"
                    >领取福利</x-button>
                </div>
            </div>
        </x-dialog>
        <x-dialog
            v-model="emptyDialog.show"
            class="empty-dialog"
            :dialog-style="{'max-width': '100%', 'background-color': 'transparent', 'margin': '184px 34px'}"
        >
            <div class="box">
                <div class="content">
                    <div class="pic"></div>
                    <p>你还没有完成签到任我哦</p>
                </div>
                <div class="btn">
                    <x-button
                        mini
                        type="primary"
                        @click.native="handleGoSign"
                    >去签到</x-button>
                </div>
            </div>
        </x-dialog>
    </div>
</template>
<script>
/**
 * @description 福利兑换（组件）
 * @author 顾超<beyondc@foxmail.com>
 */
// 组件
import WCard from '@/components/WCard'
import WMerchantItem from '@/components/WMerchantItem'
import WCountdown from '@/components/WCountdown'

// 接口
import { user_detail, near_merchant, get_issue, verify_code } from '@/api/index'
// 依赖
import Qs from 'qs'
import baseUrl from '@/utils/doman'
const wx = require('weixin-js-sdk')

// 常量
// const mobileRegx = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
const mobileRegx = /^1[3456789]\d{9}$/
export default {
    name: 'WelfareExchange',
    components: {
        WCard,
        WMerchantItem,
        WCountdown
    },
    data() {
        return {
            selected: '',
            list: [],
            lon: '',
            lat: '',
            mobile: '',
            code: '',
            countStart: false,
            mobileDialog: {
                show: false
            },
            emptyDialog: {
                show: false
            }
        }
    },
    computed: {
        welfareList() {
            return this.list.map(item => {
                // debugger
                // item = item.merchant
                item.desc = `签到${item.checkin_days}天，即享${item.checkin_num}瓶啤酒`
                const file = {
                    filename: item.store_avatar,
                    type: 'avatar'
                }
                item.store_avatar = `${baseUrl}v1/files/download?${Qs.stringify(
                    file
                )}`
                return item
            })
        },
        countColor() {
            if (mobileRegx.test(this.mobile)) {
                return '#FF5F00'
            } else {
                return '#666'
            }
        },
        exchangeDisabled() {
            return !(mobileRegx.test(this.mobile) && this.code)
        }
    },
    created() {
        this.initExchage()
        this.initUser()
    },
    methods: {
        initUser() {
            user_detail().then(({ data }) => {
                this.mobile = data.mobile
            })
        },
        initExchage() {
            const _this = this
            this.getLocation().then(() => {
                const params = {
                    lon: _this.lon,
                    lat: _this.lat,
                    distince: 9999999,
                    num: 999999
                }
                near_merchant(params).then(({ data, res }) => {
                    _this.list = data ? data : []
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
        handleSelect(id) {
            /**
             * @description 单选框选中事件的返回函数
             * @return (void)
             *
             * @id (string): 当前商家id
             */
            this.selected = id
        },
        handleExchange() {
            if (this.mobile) {
                this.exchange()
            } else {
                this.mobileDialog.show = true
            }
        },
        exchange() {
            const data = {
                merchant_id: this.selected,
                mobile: this.mobile,
                code: this.code
            }
            get_issue(data).then(({ res }) => {
                this.mobileDialog.show = false
                if (res.code === 'ERR_NO_WELFARE') {
                    this.emptyDialog.show = true
                } else {
                    this.$vux.toast.show({
                        type: 'text',
                        text: res.message
                    })
                }
                this.initExchage()
            })
        },
        handleStart() {
            const _this = this
            if (mobileRegx.test(this.mobile)) {
                verify_code({ mobile: this.mobile }).then(({ res }) => {
                    // debugger
                    _this.$vux.toast.show({
                        type: 'text',
                        text: '验证码发送成功'
                    })
                    _this.countStart = true
                })
            }
        },
        handleGoSign() {
            this.$router.replace({name: 'sign_page'})
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../styles/index');
.welfare-exchange {
    background: #f6f6f6;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
}
.list {
    flex: 1;
    overflow: auto;
    padding: @normal-gap;
    & > li + li {
        margin-top: @assist-gap;
    }
}
.item {
    padding: @assist-gap;
    background: #fff;
}
.item-content {
    display: flex;
    align-items: center;
}
.w-radio {
    margin-left: 6px;
    // width: 20px;
    height: 20px;
    opacity: 0;
    margin-right: 8px;
}
.w-radio-next {
    position: relative;
    & > .radio-box {
        position: absolute;
        top: 35px;
        left: -28px;
        width: 20px;
        height: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 20px;
        &.checked {
            border-width: 0;
            .linear-gradient-horizontal();
            box-shadow: 0px 0px 3px 3px rgba(255, 141, 0, 0.4);
            &::before {
                content: '';
                position: absolute;
                top: -1px;
                left: 0;
                width: 100%;
                height: 100%;
                background: url('../assets/sign_right.png');
                background-position: center;
                background-size: 60%;
                background-repeat: no-repeat;
            }
        }
    }
}
footer {
    height: 46px;
    padding: 10px @normal-gap;
    background: #fafafa;
}
.mobile-dialog, .empty-dialog {
    .box {
        background: #fff;
        border-radius: @main-radius;
        .content {
            padding: @normal-gap 18px;
        }
        .btn {
            padding: @assist-gap;
            border-top: 1px solid #e6e6e6;
            &>button {
                width: 140px;
            }
        }
    }
    /deep/ .weui-cells:after {
        content: none;
    }
    /deep/ .weui-cell:before {
        content: none;
    }
    /deep/ .vux-x-input {
        background: #F0F0F0;
        border-radius: 44px;
        margin-top: @assist-gap;
        font-size: @normal-font-size;
    }
}
.empty-dialog {
    font-size: @normal-font-size;
    .pic {
        width: 163px;
        height: 135px;
        margin: @normal-gap auto;
        background-image: url(../assets/welfare_exchange_failed.png);
        background-repeat: no-repeat;
        background-size: contain;
    }
}
</style>