<template>
    <w-card class="merchant-recommend">
        <header>
            <h1>附近福利店铺</h1>
            <span class="text-btn" @click="showAll">查看全部</span>
        </header>
        <group>
            <cell-box v-for="item in list" :key="item.id">
                <w-merchant-item
                    :name="item.name"
                    :address="item.address"
                    :desc="item.desc"
                    :logo="item.logo"
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
export default {
    name: 'MerchantRecommend',
    components: {
        WCard,
        WMerchantItem
    },
    data() {
        return {
            list: [
                {
                    id: '1',
                    name: '西域狼烧烤（云南路店）',
                    address: '云南南路100号',
                    desc: '签到5天，即享30瓶啤酒',
                    logo: require('@/assets/imgs/1.png')
                },
                {
                    id: '2',
                    name: '小付烧烤（云南路店）',
                    address: '云南南路100号',
                    desc: '签到5天，即享30瓶啤酒',
                    logo: require('@/assets/imgs/2.png')
                },
                {
                    id: '3',
                    name: '新疆麦麦提烧烤（云南路店）',
                    address: '云南南路100号',
                    desc: '签到5天，即享30瓶啤酒',
                    logo: require('@/assets/imgs/3.png')
                }
            ]
        }
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