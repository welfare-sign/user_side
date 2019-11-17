<template>
    <w-card class="sign-panel">
        <header>
            <x-img :default-src="info.headimgurl" class="avatar" />
            <div class="content">
                <span class="user">{{info.nickname}}：</span>
                <h2>“在福力签薅羊毛，一起签到领啤酒”</h2>
            </div>
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
            <x-button type="primary" @click.native="handleAidSign" :disabled="!haveMissed">{{haveMissed ? '签到助力' : '补签成功'}}</x-button>
            <x-button type="primary" @click.native="handleGoto" v-if="!haveMissed">我也要福利</x-button>
        </main>
    </w-card>
</template>
<script>
/**
 * @description 助力签到板（组件）
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
        info: {
            type: Object,
            required: true
        },
        list: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            today: new Date(),
            currentItem: null,
            shareId: ''
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
                item.missed = (diff >= 1 && !item.signed)
                item.label = `第${item.day}天`
                if (item.missed && !_this.currentItem) {
                    _this.currentItem = item
                }
                return item
            })
            return list
        },
        haveMissed() {
            const missedIndex = this.signList.findIndex(item => item.missed)
            return missedIndex > -1
        }
    },
    methods: {
        isMissed(today, needDate) {
            const diff = (today - needDate) / (1000 * 60 * 60 * 24)
            return diff
        },
        handleAidSign() {
            this.$emit('aid-sign')
        },
        handleGoto() {
            this.$router.push({name: 'sign_page'})
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../../styles/variables');
.sign-panel {
    //   margin-top: 72px;
    padding: 20px @normal-gap;
    background: #fff;
}
header {
    display: flex;
    padding: 8px 0;
}
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 10px;
}
.user {
    font-size: @assist-font-size;
}
.sign-list {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
}
</style>