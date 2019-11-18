<template>
    <ul
        class="store-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
        infinite-scroll-immediate-check="false"
    >
        <li v-for="item in storeList" :key="item.id">
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
</template>
<script>
/**
 * @description 商户列表（页面）
 * @author 顾超<beyondc@foxmail.com>
 */
// 组件
import WCard from '@/components/WCard'
import WMerchantItem from '@/components/WMerchantItem'

// 接口
import { query_merchants } from '@/api/index'

// 依赖
import Qs from 'qs'
import baseUrl from '@/utils/doman'
export default {
    name: 'StoreList',
    components: {
        WCard,
        WMerchantItem
    },
    created() {
        this.initStores()
    },
    data() {
        return {
            page_no: 1,
            page_size: 10,
            total: 0,
            list: [],
            busy: false
        }
    },
    computed: {
        storeList() {
            const list = this.list.concat([])
            return list.map(item => {
                item.desc = `签到${item.checkin_days}天，即享${item.checkin_num}瓶啤酒`
                const file = {
                    filename: item.store_avatar,
                    type: 'avatar'
                }
                const regx = /type=avatar$/i
                item.store_avatar = regx.test(item.store_avatar) ? item.store_avatar : `${baseUrl}v1/files/download?${Qs.stringify(
                    file
                )}`
                return item
            })
        }
    },
    methods: {
        initStores() {
            this.getList()
        },
        getList(add = false) {
            const params = {
                page_no: this.page_no,
                page_size: this.page_size
            }
            this.busy = true
            query_merchants(params).then(({ data, res }) => {
                this.busy = false
                this.total = res.total
                if (add) {
                    this.list = this.list.concat(data)
                } else {
                    this.list = data
                }
                console.log(this.list)
            })
        },
        loadMore() {
            const length = this.list.length
            if (length < this.total) {
                this.page_no += 1
                this.getList(true)
            } else {
                this.busy = true
            }
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