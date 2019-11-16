<template>
    <div class="user-info">
        <div class="content">
            <div class="user">
                <x-img :default-src="info.headimgurl ? info.headimgurl : avatar" class="avatar" />
                <h2>欢迎 {{info.nickname}}</h2>
            </div>
            <button class="btn" @click="toWelfare">
                <x-img class="icon-gift" :default-src="iconGift" />
                <span>我的福利</span>
            </button>
        </div>
    </div>
</template>
<script>
/**
 * @description 登录信息（组件）
 * @author 顾超<beyondc@foxmail.com>
 */
export default {
    name: 'UserInfo',
    props: {
        info: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            avatar: require('@/assets/avatar.jpg'),
            iconGift: require('@/assets/icon_gift.png')
        }
    },
    methods: {
        toWelfare() {
            /**
             * @description 我的福利点击事件的返回函数
             *  - 跳转到我的福利列表页面
             * @return (void)
             */
            window.console.log('点击了我的福利')
            this.$router.push({ name: 'my_welfare' })
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../../styles/index');
.user-info {
    position: absolute;
    left: 0;
    top: -72px;
    width: 100%;
    height: 160px;
    color: #fff;
    .linear-gradient-horizontal();
    .primary-box-shadow();
    z-index: -1;
}
.content {
    padding-top: @normal-gap;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.user {
    margin-left: @normal-gap;
    display: flex;
    align-items: center;
}
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 10px;
}
.btn {
    padding: 10px 16px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 100px 0 0 100px;
    font-size: @sub-title-font-size;
    line-height: 1.2;
    display: flex;
    align-items: center;
    border: none;
    color: #fff;
}
.icon-gift {
    width: 16px;
    height: 16px;
    margin-right: 5px;
}
</style>