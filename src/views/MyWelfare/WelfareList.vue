<template>
    <div class="welfare-list">
        <h1>我的福利</h1>
        <ul class="list">
            <li v-for="item in welfareList" :key="item.id">
                <w-card class="item">
                    <w-merchant-item
                        :name="item.store_name"
                        :address="item.address"
                        :desc="item.desc"
                        :logo="item.store_avatar"
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
// 依赖
import Qs from 'qs'
import baseUrl from '@/utils/doman'
export default {
    name: 'WelfareList',
    components: {
        WCard,
        WMerchantItem
    },
    props: {
        list: {
            type: Array,
            require: true
        }
    },
    data() {
        return {
            storeItem: {
                    store_name: '',
                    address: '',
                    total_receive: '',
                    desc: '',
                    store_avatar: ''
                }
        }
    },
    computed: {
        welfareList () {
            return this.list.map(item => {
                const desc = `存有${item.total_receive - item.received}瓶啤酒`
                item = item.merchant
                const file = {
                    filename: item.store_avatar,
                    type: 'avatar'
                }
                item.desc = desc
                item.store_avatar = `${baseUrl}v1/files/download?${Qs.stringify(file)}`
                return item
            })
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