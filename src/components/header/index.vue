<template>
  <header class="header-container">
    <div class="header-left" @click="goHome()">
      <div class="header-logo">
        <img src="../../assets/images/logo.png" alt="" />
      </div>
      <div class="header-title">困医通 预约挂号统一平台</div>
    </div>
    <div
      class="header-center"
      v-if="router.currentRoute.value.path.indexOf('patients') > -1"
    >
      <SearchPatients />
    </div>
    <div class="header-right">
      <el-link :underline="false" type="info">帮助中心</el-link>
      <el-link :underline="false" type="info">登陆/注册</el-link>
      <el-button @click="toggleDark()" class="theme-switch">
        <el-icon v-if="!isDark" color="#151515">
          <Moon />
        </el-icon>
        <el-icon v-else color="#fff">
          <Sunny />
        </el-icon>
      </el-button>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'
import SearchPatients from '@/components/searchPatients/index.vue'
const router = useRouter()

const isDark = useDark() // 检测当前是否为深色模式
const toggleDark = useToggle(isDark) // 用于切换深色和浅色模式
const goHome = () => {
  router.push('/')
}
</script>

<style lang="less" scoped>
.header-container {
  --bg-color: #e1e5ec;
}
.dark .header-container {
  --bg-color: #151515;
}
.header-container {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 999;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  background-color: var(--bg-color);
  border-color: var(--border-color);
  .header-left {
    padding-left: 26px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .header-logo {
      img {
        width: 100px;
      }
    }
    .header-title {
      font-size: 20px;
      color: var(--p-text-color);
      font-family: 'TencentSans-W7';
      margin-top: -8px;
    }
  }
  :deep(.header-center) {
    width: 500px;
    .el-autocomplete {
      width: 80%;
    }
    .el-input__wrapper {
      box-shadow: 0 0 0 1px var(--border-color) inset;
    }
    .el-input__inner {
      padding: 10px 0;
    }
    .search-patients-container {
      margin: 0;
    }
  }
  .header-right {
    padding-right: 26px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;
    a {
      color: var(--p-default-color);
      font-weight: 400;
      margin-left: 15px;
    }
    :deep(.theme-switch) {
      border: none;
      background-color: transparent;
      padding: 0 0 0 20px;
    }
  }
}
</style>
