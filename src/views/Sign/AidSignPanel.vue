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
            <x-button type="primary" @click.native="handleAidSign" v-if="aidAble">签到助力</x-button>
            <p class="aid-success" v-else>已帮好友助力，你也去签到领福利吧</p>
            <x-button type="primary" @click.native="handleGoto" v-if="!aidAble">我也要福利</x-button>
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
        aidAble: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            shareId: ''
        }
    },
    methods: {
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
.aid-success {
    color: @primary-color;
    text-align: center;
    margin-bottom: @assist-gap;
}
</style>