<template>
    <w-card class="sign-panel">
        <header>
            <h1>现在开始福力签</h1>
            <span>签到规则</span>
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
            <div v-if="!haveMissed">
                <div class="missed-btn">
                    <x-button type="primary" @click.native="shareDialog.show = true">分享补签</x-button>
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
            <!-- <x-button type="text">重新签到</x-button> -->
        </main>
        <div>
            <x-dialog
                v-model="shareDialog.show"
                class="share-dialog"
                :dialog-style="{'max-width': '100%', height: '50%', 'background-color': 'transparent', 'margin': '112px 34px'}"
                hide-on-blur
            >
                <div class="box">
                    <h2>你已连续签到</h2>
                    <div class="box-main-area">{{signedTime}} 天</div>
                    <div class="remaind-text">继续分享好友即可补签</div>
                </div>
                <div class="share-close" @click="shareDialog.show=false">
                    <span>遗憾离开</span>
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
        }
    },
    data() {
        return {
            today: new Date(),
            currentItem: {},
            shareDialog: {
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
                if (diff >= 0 && diff < 1) {
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
            const diff = (today - needDate) / (1000 * 60 * 60 * 24)
            return diff
        },
        handleSign() {
            this.$emit('sign')
        },
        handleResign() {
            this.$emit('resign')
        },
        handlePay() {
            this.$emit('pay')
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../../styles/variables');
.sign-panel {
    margin-top: 72px;
    padding: 20px @normal-gap;
    background: #fff;
}
header {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
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
        padding-top: @assist-gap;
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
</style>