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
            <div class="missed-btn" v-if="!haveMissed">
                <x-button type="primary" @click.native="handleShare">分享补签</x-button>
                <x-button type="primary" plain @click.native="handlePay">出血补签</x-button>
            </div>
            <x-button
                type="primary"
                @click.native="handleSign"
                :disabled="signDone"
                v-else
            >{{signDone ? '已签到' :'签 到'}}</x-button>
        </main>
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
        }
    },
    data() {
        return {
            today: new Date(),
            currentItem: {}
        }
    },
    methods: {
        isMissed(today, needDate) {
            const diff = (today - needDate) / (1000 * 60 * 60 * 24)
            return diff
        },
        handleSign() {
            this.$emit('sign', this.currentItem.day)
        },
        handleShare() {
            // TODO 分享
            debugger
            this.$wechat.ready(() => {
                debugger
                // TODO
                this.$watch.updateAppMessageShareData({
                    title: '分享标题', // 分享标题
                    desc: '分享描述', // 分享描述
                    link: `${window.location.origin}/aid_sign`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: '', // 分享图标
                    success() {
                        debugger
                        this.$vux.toast.show({
                            type: 'text',
                            message: '分享成功'
                        })
                    }
                })
            })
        },
        handlePay() {
            // TODO 支付
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
        margin-right: 12px;
        margin-top: 15px;
    }
}
</style>