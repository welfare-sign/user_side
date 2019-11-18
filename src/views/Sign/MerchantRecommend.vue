<template>
    <w-card class="merchant-recommend">
        <header>
            <h1>附近福利店铺</h1>
            <span class="text-btn" @click="showAll">查看全部</span>
        </header>
        <group>
            <cell-box v-for="item in storeList" :key="item.id">
                <w-merchant-item
                    :name="item.store_name"
                    :address="item.address"
                    :desc="item.desc"
                    :logo="item.store_avatar"
                />
            </cell-box>
        </group>
        <footer @click="showAll">
            <span class="text-btn">查看全部店铺</span>
        </footer>
    </w-card>
</template>
<script>
/**
 * @description 商家推荐（组件）
 * @author 顾超<beyondc@foxmail.com>
 */
import WCard from '@/components/WCard'
import WMerchantItem from '@/components/WMerchantItem'
// 依赖
import Qs from 'qs'
import baseUrl from '@/utils/doman'
export default {
    name: 'MerchantRecommend',
    components: {
        WCard,
        WMerchantItem
    },
    props: {
        list: {
            type: Array,
            required: true,
        }
    },
    computed: {
        storeList () {
            return this.list.map(item => {
                item.desc = `签到${item.checkin_days}天，即享${item.checkin_num}瓶啤酒`
                const file ={
                    filename: item.store_avatar,
                    type: 'avatar'
                }
                item.store_avatar = `${baseUrl}v1/files/download?${Qs.stringify(file)}`
                return item
            })
        }
    },
    data() {
        return {}
    },
    methods: {
        showAll() {
            /**
             * @description 查看全部元素点击事件的返回函数
             *  - 跳转到商户列表页面
             * @return (void)
             */
            this.$router.push({ name: 'store_list' })
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../../styles/variables.less');
.merchant-recommend {
    background: #fff;
    margin-top: @normal-gap;
}
header {
    padding: 28px @normal-gap;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
footer {
    padding: 14px;
    text-align: center;
    font-size: @sub-title-font-size;
}
.text-btn {
    color: @primary-color;
}
</style>