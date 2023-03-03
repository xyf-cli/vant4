<script setup>
import { getCurrentInstance, ref } from 'vue';
const { proxy } = getCurrentInstance();
const value = ref('3');
function showMe() {
  proxy.$showToast('yyyyy');
  proxy.$request('get','/dms/equipment/card/renew/order')
  console.log(import.meta.env)
}
</script>

<template>
  <main>
    <div>123</div>
    <van-button type="primary" @click="showMe">主要按钮</van-button>
  </main>
</template>

<style lang="less" scoped>
.box {
  width: 750px;
  height: 300px;
  background-color: gray;
}
</style>
