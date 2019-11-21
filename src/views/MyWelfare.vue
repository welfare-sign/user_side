<template>
    <div class="my-welfare">
        <welfare-qr-code :qr-code="qrCode" v-if="welfareList.length" />
        <welfare-list :list="welfareList" v-if="welfareList.length" />
        <div v-if="!welfareList.length">
            <div class="icon"></div>
            <p class="desc">抱歉，您还没有获得福利<br>快去首页签到领福利吧~</p>
            <x-button class="btn" type="primary" @click.native="handleToHome">去签到</x-button>
        </div>
    </div>
</template>
<script>
/**
 * @description 我的福利（页面）
 * @author 顾超<beyondc@foxmail.com>
 */
// 组件
import WelfareQrCode from './MyWelfare/WelfareQrCode'
import WelfareList from './MyWelfare/WelfareList'

// 接口
import { issue_list } from '@/api/index'
export default {
    name: 'MyWelfare',
    components: {
        WelfareQrCode,
        WelfareList
    },
    created() {
        this.initWelfare()
    },
    data() {
        return {
            qrCode: '',
            welfareList: []
        }
    },
    methods: {
        initWelfare() {
            this.getWelfare()
        },
        getWelfare() {
            issue_list().then(({ data }) => {
                this.welfareList = data
            })
        },
        handleToHome() {
            this.$router.push({name: 'sign_page'})
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../styles/variables');
.my-welfare {
    padding: @assist-gap @normal-gap;
    .icon {
        width: 190px;
        height: 180px;
        background: url(../assets/welfare_empty.png);
        background-size: contain;
        margin: 60px auto 16px;
    }
    .desc {
        text-align: center;
        color: @normal-font-color;
        font-size: @assist-font-size;
    }
    .btn {
        width: 140px;
        margin-top: @normal-gap;
    }
}
</style>