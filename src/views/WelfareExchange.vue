<template>
    <div class="welfare-exchange">
        <ul class="list">
            <li v-for="item in list" :key="item.id" @click="handleSelect(item.id)">
                <w-card class="item">
                    <div class="item-content">
                        <input
                            class="w-radio"
                            type="radio"
                            name="select"
                            :id="item.id"
                            :checked="item.id === selected"
                        />
                        <label class="w-radio-next" :for="item.id">
                            <span :class="['radio-box', {'checked': item.id === selected}]"></span>
                            <w-merchant-item
                                :name="item.name"
                                :address="item.address"
                                :desc="item.desc"
                                :logo="item.logo"
                            />
                        </label>
                    </div>
                </w-card>
            </li>
        </ul>
        <footer>
            <x-button type="primary">领取福利</x-button>
        </footer>
    </div>
</template>
<script>
/**
 * @description 福利兑换（组件）
 * @author 顾超<beyondc@foxmail.com>
 */
// 组件
import WCard from '@/components/WCard'
import WMerchantItem from '@/components/WMerchantItem'
export default {
    name: 'WelfareExchange',
    components: {
        WCard,
        WMerchantItem
    },
    data() {
        return {
            selected: '1',
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
    },
    methods: {
        handleSelect(id) {
            /**
             * @description 单选框选中事件的返回函数
             * @return (void)
             *
             * @id (string): 当前商家id
             */
            this.selected = id
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../styles/index');
.welfare-exchange {
    background: #f6f6f6;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
}
.list {
    flex: 1;
    overflow: auto;
    padding: @normal-gap;
    & > li + li {
        margin-top: @assist-gap;
    }
}
.item {
    padding: @assist-gap;
    background: #fff;
}
.item-content {
    display: flex;
    align-items: center;
}
.w-radio {
    width: 20px;
    height: 20px;
    opacity: 0;
    margin-right: 8px;
}
.w-radio-next {
    position: relative;
    & > .radio-box {
        position: absolute;
        top: 35px;
        left: -28px;
        width: 20px;
        height: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 20px;
        &.checked {
            border-width: 0;
            .linear-gradient-horizontal();
            box-shadow: 0px 0px 3px 3px rgba(255, 141, 0, 0.4);
            &::before {
                content: '';
                position: absolute;
                top: -1px;
                left: 0;
                width: 100%;
                height: 100%;
                background: url('../assets/sign_right.png');
                background-position: center;
                background-size: 60%;
                background-repeat: no-repeat;
            }
        }
    }
}
footer {
    height: 46px;
    padding: 10px @normal-gap;
    background: #fafafa;
}
</style>