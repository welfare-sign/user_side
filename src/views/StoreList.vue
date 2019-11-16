<template>
    <ul class="store-list">
        <li v-for="item in list" :key="item.id">
            <w-card class="item">
                <w-merchant-item
                    :name="item.name"
                    :address="item.address"
                    :desc="item.desc"
                    :logo="item.logo"
                />
            </w-card>
        </li>
    </ul>
</template>
<script>
/**
 * @description 商户列表（页面）
 * @author 顾超<beyondc@foxmail.com>
 */
// 组件
import WCard from '@/components/WCard'
import WMerchantItem from '@/components/WMerchantItem'
export default {
    name: 'StoreList',
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
                },
                {
                    id: '4',
                    name: '新疆麦麦提烧烤（云南路店）',
                    address: '云南南路100号',
                    desc: '签到5天，即享30瓶啤酒',
                    logo: require('@/assets/imgs/4.png')
                },
                {
                    id: '5',
                    name: '新疆麦麦提烧烤（云南路店）',
                    address: '云南南路100号',
                    desc: '签到5天，即享30瓶啤酒',
                    logo: require('@/assets/imgs/5.png')
                },
                {
                    id: '6',
                    name: '新疆麦麦提烧烤（云南路店）',
                    address: '云南南路100号',
                    desc: '签到5天，即享30瓶啤酒',
                    logo: require('@/assets/imgs/6.png')
                },
                {
                    id: '7',
                    name: '新疆麦麦提烧烤（云南路店）',
                    address: '云南南路100号',
                    desc: '签到5天，即享30瓶啤酒',
                    logo: require('@/assets/imgs/7.jpeg')
                }
            ]
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../styles/variables');
.store-list {
    padding: @normal-gap;
    & > li + li {
        margin-top: @assist-gap;
    }
}
.item {
    padding: @assist-gap;
}
</style>