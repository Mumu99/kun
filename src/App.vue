<template>
  <div class="wrapper">
    <div class="container">
      <!-- 顶部 -->
      <Header />
      <!-- 路由组件 -->
      <div class="main">
        <div class="main-wrap">
          <router-view />
        </div>
      </div>
      <Footer />
    </div>
    <el-backtop :bottom="90">
      <div
        style="
          height: 100%;
          width: 100%;
          background-color: var(--el-bg-color-overlay);
          box-shadow: var(--el-box-shadow-lighter);
          text-align: center;
          line-height: 45px;
          color: #1989fa;
        "
      >
        <el-icon><CaretTop /></el-icon>
      </div>
    </el-backtop>
  </div>
</template>

<script setup lang="ts">
import { useElementPlusTheme } from 'use-element-plus-theme'
import { CaretTop } from '@element-plus/icons-vue'
useElementPlusTheme(localStorage.getItem('themeColor') || '#3c62b0') // 初始化主题色
</script>

<style>
body {
  background-color: var(--bg-color);
  color: var(--text-color);
  border-color: var(--border-color);
}
</style>

<style lang="less" scoped>
.wrapper {
  width: 100%;
}
.container {
  flex-direction: column;
  align-items: center;
  width: 100%;
  .main {
    width: 100%;
    margin: 72px 0 20px;
    .main-wrap {
      padding: 0 26px;
    }
  }
}
</style>
