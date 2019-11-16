<template>
  <div class="w-merchant-item">
    <x-img class="logo" :default-src="logo" />
    <div class="content">
      <div>
        <h2>{{name}}</h2>
        <p class="sub">{{address}}</p>
      </div>
      <div>
          <span class="desc-label">{{desc}}</span>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * @description 商家信息（组件）
 * @author 顾超<beyondc@foxmail.com>
 */
export default {
  name: 'WMerchantItem',
  props: {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../styles/index');
.w-merchant-item {
    display: flex;
}
.logo {
    width: 90px;
    height: 90px;
    border-radius: @assist-radius;
    margin-right: @assist-gap;
}
.content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
}
h2 {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.sub {
    font-size: @assist-font-size;
    color: @normal-font-color;
    margin-top: 6px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.desc-label {
    .linear-gradient-horizontal-opacity();
    border-radius: 22px;
    color: #873708;
    font-size: @assist-font-size;
    padding: 2px 8px;
}
</style>