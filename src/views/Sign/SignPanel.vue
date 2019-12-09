<template>
    <w-card class="sign-panel">
        <header>
            <h1>{{isAid ? '补签成功，' : ''}}{{signedTime > 0 ? '已连续签到' + signedTime + '天' : '现在开始福力签'}}</h1>
            <span @click="handleRules">签到规则</span>
        </header>
        <main>
            <ul class="sign-list">
                <w-sign-item
                    v-for="item in signList"
                    :signed="item.signed"
                    :missed="item.missed"
                    :final="item.final"
                    :label="item.label"
                    :key="item.id"
                />
            </ul>
            <div v-if="signedTime < 5">
                <div v-if="haveMissed">
                    <div class="missed-btn">
                        <x-button type="primary" @click.native="handleShare">分享补签</x-button>
                        <x-button type="primary" plain @click.native="handlePay">出血补签</x-button>
                    </div>
                    <span class="re-sign" @click="handleResign">重新签到</span>
                </div>
                <x-button
                    type="primary"
                    @click.native="handleSign"
                    :disabled="signDone"
                    v-else
                >{{signDone ? '已签到' :'签 到'}}</x-button>
            </div>
            <div v-else class="sign-done">
                <p class="done-text">您已连续签到5天，关注公众号领福利吧</p>
                <x-button type="primary" @click.native="showQrCode">领取福利</x-button>
            </div>
        </main>
        <div>
            <x-dialog
                v-model="shareDialog.show"
                class="share-dialog"
                :dialog-style="{'max-width': '100%', height: '50%', 'background-color': 'transparent', 'margin': '18px 34px'}"
                hide-on-blur
            >
                <div class="share-content">
                    <div class="empty"></div>
                    <div class="box">
                        <h2>你已连续签到</h2>
                        <div class="box-main-area">{{signedTime}} 天</div>
                        <div class="remaind-text">点击右上角分享，让好友帮忙补签</div>
                    </div>
                    <div class="share-close" @click="shareDialog.show=false">
                        <span>遗憾离开</span>
                    </div>
                </div>
            </x-dialog>
            <x-dialog
                v-model="rulesDialog.show"
                class="rules-dialog"
                :dialog-style="{'max-width': '100%', 'background-color': 'transparent', 'margin': '97px 30px'}"
            >
                <div class="box">
                    <h2>签到规则</h2>
                    <p class="content">
                        1. 用户在福力签连续签到满5天，即可领取商户提供的指定免费福利，同一家店的福利使用完后才能再次领取。<br>
                        2. 领取的福利限在店享用，可分多次使用。<br>
                        3. 福利自领取后180天内有效，过期作废。<br>
                        4. 福力签保留对本活动最终解释权。<br>
                        5. 使用中有任何问题，请关注公众号【福力签】咨询。<br>
                    </p>
                </div>
                <div class="rules-close" @click="rulesDialog.show = false"></div>
            </x-dialog>
            <x-dialog
                v-model="qrCodeDialog.show"
                class="empty-dialog"
                :dialog-style="{'max-width': '100%', 'background-color': 'transparent', 'margin': '153px 34px'}"
            >
                <div class="qr-code">
                    <img src="@/assets/qrcode.jpg" width="200" height="200" alt />
                    <p class="tips">
                        长按扫码关注微信公众号
                        <br />在公众号内领取福利
                    </p>
                </div>
            </x-dialog>
        </div>
    </w-card>
</template>
<script>
/**
 * @description 签到板（组件）
 * @author 顾超<beyondc@foxmail.com>
 */
// 组件
import WCard from '@/components/WCard'
import WSignItem from '@/components/WSignItem'
import { setWxShare } from '@/plugins/wechat-sdk'
export default {
    name: 'SignPanel',
    components: {
        WCard,
        WSignItem
    },
    props: {
        list: {
            type: Array,
            required: true
        },
        isAid: {
            type: Boolean,
            default: false
        },
        shareOptions: {
            type: Object
        }
    },
    data() {
        return {
            today: new Date(),
            currentItem: {},
            shareDialog: {
                show: false
            },
            rulesDialog: {
                show: false
            },
            qrCodeDialog: {
                show: false
            }
        }
    },
    computed: {
        signList() {
            const _this = this
            const list = this.list.map((item, index, arr) => {
                if (index === arr.length - 1) {
                    item.final = true
                }
                switch (item.status) {
                    case 'U':
                        item.signed = false
                        break
                    case 'A':
                        item.signed = true
                        break
                    default:
                        break
                }
                const diff = this.isMissed(
                    this.today,
                    new Date(item.need_checkin_time)
                )
                item.missed = diff >= 1 && !item.signed
                item.label = `第${item.day}天`
                if (diff === 0) {
                    _this.currentItem = item
                }
                return item
            })
            return list
        },
        signDone() {
            return this.currentItem.signed
        },
        haveMissed() {
            const missedIndex = this.signList.findIndex(item => item.missed)
            return missedIndex > -1
        },
        signedTime() {
            let time = 0
            this.signList.forEach(item => {
                if (item.signed) {
                    time += 1
                }
            })
            return time
        }
    },
    methods: {
        isMissed(today, needDate) {
            today = this.returnDay(today)
            needDate = this.returnDay(needDate)
            const diff = (today - needDate) / (1000 * 60 * 60 * 24)
            return diff
        },
        returnDay(date) {
            let y = date.getFullYear()
            let m = date.getMonth() + 1
            m = m > 9 ? m : `0${m}`
            let d = date.getDate()
            d = d > 9 ? d : `0${d}`
            return new Date(`${y}/${m}/${d}`)
        },
        handleSign() {
            this.$emit('sign')
        },
        handleResign() {
            this.$emit('resign')
        },
        handleShare() {
            const options = {
                ...this.shareOptions,
                title: '我的30瓶免费啤酒，就靠你了！帮我补签一下呗～',
                desc: '签到5天，领30瓶啤酒，人人有份！'
            }
            setWxShare(options, true)
            this.shareDialog.show = true
        },
        handlePay() {
            this.$emit('pay')
        },
        handleRules() {
            this.rulesDialog.show = true
        },
        showQrCode() {
            this.qrCodeDialog.show = true
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../../styles/variables');
@import '~vux/src/styles/close.less';
.sign-panel {
    margin-top: 72px;
    padding: 20px @normal-gap;
    background: #fff;
}
header {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    span {
        color: @normal-font-color;
    }
}
.sign-list {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
}
.missed-btn {
    display: flex;
    justify-content: space-between;
    & > button:first-child {
        margin-right: @assist-gap;
        margin-top: 15px;
    }
}
.re-sign {
    display: block;
    text-align: center;
    margin-top: 20px;
    font-size: @sub-title-font-size;
    color: @normal-font-color;
    font-weight: 400;
}
.share-dialog {
    font-size: @sub-title-font-size;
    line-height: 20px;
    font-weight: 400;
    .share-content {
        position: relative;
    }
    .empty {
        width: 100%;
        height: 79px;
        background-image: url(../../assets/arrow.png);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: right;
        margin-bottom: 15px;
    }
    .box {
        padding: @assist-gap;
        border-radius: @main-radius;
        background: #fff;
    }
    h2 {
        font-weight: 400;
    }
    .box-main-area {
        margin: 20px 0;
        padding: 0 28px;
        border-radius: @main-radius / 2;
        background: #e6e6e6;
        display: inline-block;
        font-size: 46px;
        line-height: 54px;
        color: @primary-color;
    }
    .remaind-text {
        padding-top: 14px;
        padding-bottom: 2px;
        text-align: center;
        color: @primary-color;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
    .share-close {
        color: #fff;
        margin-top: 20px;
        text-decoration: underline;
    }
}
.rules-dialog {
    .box {
        background: #fff;
        border-radius: @main-radius;
        height: 345px;
        padding: 25px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        & > h2 {
            padding-bottom: 18px;
            border-bottom: solid 1px #f0f0f0;
            margin-bottom: @normal-gap;
        }
        & > p {
            text-align: left;
            flex: 1;
            overflow-y: scroll;
            color: #4d4d4d;
            font-size: 14px;
            line-height: 1.5;
        }
    }
    .rules-close {
        width: 28px;
        height: 28px;
        display: inline-block;
        margin-top: @normal-gap;
        background: url(../../assets/close.png);
        background-size: contain;
    }
}
.sign-done {
    text-align: center;
    color: @primary-color;
    .done-text {
        margin-bottom: @assist-gap;
    }
}
.qr-code {
    background: #fff;
    border-radius: @main-radius;
    text-align: center;
    color: @main-font-color;
    padding-top: 14px;
    .tips {
        margin-top: 14px;
        border-top: 1px solid #e6e6e6;
        padding: 14px 0;
    }
}
</style>