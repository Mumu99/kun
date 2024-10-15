<template>
  <div class="footer-container">
    <div class="footer-left">
      <span class="left-item">困ICP备 13018369号</span>
      <span class="left-item">电话挂号 9999999999</span>
    </div>
    <div class="footer-right">
      <el-link :underline="false" type="info">联系我们</el-link>
      <el-link :underline="false" type="info">合作伙伴</el-link>
      <el-link :underline="false" type="info">用户协议</el-link>
      <el-link :underline="false" type="info">隐私协议</el-link>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.footer-container {
  --bg-color: #e1e5ec;
}
.dark .footer-container {
  --bg-color: #151515;
}
.footer-container {
  width: 100%;
  height: 50px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  background-color: var(--bg-color);
  border-color: var(--border-color);
  .footer-left {
    padding-left: 26px;
    color: var(--p-default-color);
  }
  .footer-right {
    padding-right: 26px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;
    a {
      font-weight: 400;
      margin-left: 15px;
      color: var(--p-default-color);
    }
  }
}
</style>
