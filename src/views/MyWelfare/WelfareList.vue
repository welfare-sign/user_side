<template>
    <div class="welfare-list">
        <h1>我的福利</h1>
        <ul class="list">
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
    </div>
</template>
<script>
/**
 * @description 福利列表（组件）
 * @author 顾超<beyondc@foxmail.com>
 */
// 组件
import WCard from '@/components/WCard'
import WMerchantItem from '@/components/WMerchantItem'
export default {
    name: 'WelfareList',
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
                    desc: '存有30瓶啤酒',
                    logo: require('@/assets/imgs/1.png')
                },
                {
                    id: '2',
                    name: '小付烧烤（云南路店）',
                    address: '云南南路100号',
                    desc: '存有30瓶啤酒',
                    logo: require('@/assets/imgs/2.png')
                },
                {
                    id: '3',
                    name: '新疆麦麦提烧烤（云南路店）',
                    address: '云南南路100号',
                    desc: '存有30瓶啤酒',
                    logo: require('@/assets/imgs/3.png')
                },
                {
                    id: '4',
                    name: '新疆麦麦提烧烤（云南路店）',
                    address: '云南南路100号',
                    desc: '存有30瓶啤酒',
                    logo: require('@/assets/imgs/4.png')
                },
                {
                    id: '5',
                    name: '新疆麦麦提烧烤（云南路店）',
                    address: '云南南路100号',
                    desc: '存有30瓶啤酒',
                    logo: require('@/assets/imgs/5.png')
                }
            ]
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../../styles/variables');
.welfare-list {
    padding: 20px 0;
}
h1 {
    margin: 8px 0 @assist-gap 0;
}
.list {
    & > li + li {
        margin-top: @assist-gap;
    }
}
.item {
    padding: @assist-gap;
}
</style>