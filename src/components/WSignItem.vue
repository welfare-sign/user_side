<template>
    <li class="w-sign-item">
        <div :class="['icon', {'disabled': !signed || missed}, {'final': final}]">
            <span class="badge" v-if="badge">{{badge}}</span>
            <x-img class="ico-img" :default-src="icon"/>
        </div>
        <label :class="{'disabled-text': !signed || missed}">{{label}}</label>
    </li>
</template>
<script>
/**
 * @description 签到状态（组件）
 * @author 顾超<beyondc@foxmail.com>
 */
export default {
    name: 'WSignItem',
    props: {
        signed: {
            type: Boolean,
            required: true
        },
        missed: {
            type: Boolean,
            default: false
        },
        final: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            required: true
        }
    },
    computed: {
        badge () {
            let label
            if (this.missed) {
                label = '待补签'
            } else if (this.final) {
                label = '领啤酒'
            } else {
                label = false
            }
            return label
        },
        icon () {
            let src
            if (this.final) {
                src = require('@/assets/sign_gift.png')
            } else {
                src = require('@/assets/sign_right.png')
            }
            return src
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../styles/index.less');
.icon {
    width: 44px;
    height: 44px;
    border-radius: 22px;
    box-shadow: 0px 0px 3px 3px rgba(255,141,0,0.4);
    .linear-gradient-horizontal();
    position: relative;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.ico-img {
    width: 22px;
    height: 22px;
}
.disabled {
    position: relative;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.5);
    }
}
.disabled-text {
    color: @assist-font-color
}
.badge {
    position: absolute;
    top: -10px;
    right: -10px;
    background: linear-gradient(135deg,#F24343 0%,#E02020 100%);
    font-size: @assist-font-size;
    color: #fff;
    padding: 1px 4px;
    border-radius: 8px 9px 9px 2px;
    z-index: 1;
}
</style>