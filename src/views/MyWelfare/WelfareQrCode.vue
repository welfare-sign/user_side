<template>
    <w-card class="welfare-qr-code">
        <h2>福利码</h2>
        <div style="text-align: center;">
            <x-img :src="qrCode" :default-src="qrCode" style="width: 180px; height: 180px;"></x-img>
            <!-- <qrcode class="qrcode" value="https://vux.li?x-page=demo_qrcode" :size="180" type="img"></qrcode> -->
            <p class="tips">向商家出示此二维码兑换福利</p>
        </div>
    </w-card>
</template>
<script>
/**
 * @description 福利码（组件）
 * @author 顾超<beyondc@foxmail.com>
 */
// 组件
import WCard from '@/components/WCard'
import baseUrl from '@/utils/doman'

// 依赖
import Cookies from 'js-cookie'
export default {
    name: 'WelfareQrCode',
    components: {
        WCard
    },
    data() {
        return {
            qrCode: `${baseUrl}v1/customers/qrcode?access_token=${Cookies.get(
                'Authorization'
            )}`
        }
    }
    // props: {
    //     qrCode: {
    //         type: String,
    //         required: true
    //     }
    // }
}
</script>
<style lang="less" scoped>
@import url('../../styles/index');
.welfare-qr-code {
    overflow: hidden;
    position: relative;
    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 15px;
        background: linear-gradient(
            180deg,
            rgba(255, 152, 0, 1) 0%,
            rgba(255, 95, 0, 1) 200%
        );
        z-index: -1;
    }
}
h2 {
    width: 115px;
    height: 30px;
    margin: 0 auto;
    color: #fff;
    border-radius: 0 0 18px 18px;
    line-height: 30px;
    text-align: center;
    background: linear-gradient(
        180deg,
        rgba(255, 152, 0, 1) 0%,
        rgba(255, 95, 0, 1) 100%
    );
    margin-bottom: @normal-gap * 2;
}
.qrcode {
    text-align: center;
}
.tips {
    margin: 20px auto;
    text-align: center;
    font-size: @sub-title-font-size;
}
</style>