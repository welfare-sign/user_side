<template>
    <div class="w-card">
        <slot/>
    </div>
</template>
<script>
/**
 * @description 卡片（组件）
 * @author 顾超<beyondc@foxmail.com>
 */
export default {
    name: 'WCard'
}
</script>
<style lang="less" scoped>
@import url('../styles/variables.less');
.w-card {
    border-radius: @main-radius;
    box-shadow:0px 8px 16px 0px rgba(0,0,0,0.1);
}
</style>