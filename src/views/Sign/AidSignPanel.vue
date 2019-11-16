<template>
    <w-card class="sign-panel">
        <header>
            <x-img :default-src="avatar" class="avatar" />
            <div class="content">
                <span class="user">James：</span>
                <h2>“在福力签薅羊毛，一起签到领啤酒”</h2>
            </div>
        </header>
        <main>
            <ul class="sign-list">
                <w-sign-item
                    v-for="item in list"
                    :signed="item.signed"
                    :missed="item.missed"
                    :final="item.final"
                    :label="item.label"
                    :key="item.id"
                />
            </ul>
            <x-button type="primary">签到助力</x-button>
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
        }
    },
    data() {
        return {
            today: new Date(),
            currentItem: null
        }
    },
    methods: {
        isMissed(today, needDate) {
            const diff = (today - needDate) / (1000 * 60 * 60 * 24)
            return diff
        },
        handleSign() {
            this.$emit('sign', this.currentItem.day)
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