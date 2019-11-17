<template>
    <div class="my-welfare">
        <welfare-qr-code :qr-code="qrCode" />
        <welfare-list :list="welfareList" />
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
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../styles/variables');
.my-welfare {
    padding: @assist-gap @normal-gap;
}
</style>