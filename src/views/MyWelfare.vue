<template>
    <div class="my-welfare">
        <welfare-qr-code/>
        <welfare-list/>
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
export default {
    name: 'MyWelfare',
    components: {
        WelfareQrCode,
        WelfareList
    }
}
</script>
<style lang="less" scoped>
@import url('../styles/variables');
.my-welfare {
    padding: @assist-gap @normal-gap;
}
</style>