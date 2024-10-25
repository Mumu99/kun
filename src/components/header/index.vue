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
      <el-link
        :underline="false"
        type="info"
        @click="goLogin()"
        v-if="!loginStore.userInfo.name"
      >
        登陆/注册
      </el-link>
      <div v-else class="header-user">
        <el-dropdown popper-class="el-dropdown--user" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ loginStore.userInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="menu in dropList"
                :key="menu.type"
                :command="menu"
              >
                {{ menu.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
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
import { Sunny, Moon, ArrowDown } from '@element-plus/icons-vue'
import SearchPatients from '@/components/searchPatients/index.vue'
import { useLoginStore } from '@/store/login'
import { reactive, watch } from 'vue'
import type { UserSelectData } from '@/services/type'
const loginStore = useLoginStore()
const router = useRouter()

const isDark = useDark() // 检测当前是否为深色模式
const toggleDark = useToggle(isDark) // 用于切换深色和浅色模式

watch(isDark, val => {
  loginStore.setDrak(val)
})
const goHome = () => {
  router.push('/')
}
const goLogin = () => {
  loginStore.visibleDialog = true
}
const dropList = reactive([
  {
    label: '实名认证',
    type: 'realName',
    path: ''
  },
  {
    label: '挂号订单',
    type: 'registrationOrder',
    path: ''
  },
  {
    label: '就诊人管理',
    type: 'patientManagement',
    path: ''
  },
  {
    label: '退出登录',
    type: 'logout',
    path: '/home'
  }
])
const handleCommand = (val: UserSelectData) => {
  const { label, type, path } = val
  if (type === 'logout') {
    loginStore.logout()
  }
  router.push({ path })
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
  font-family: TencentSans-W3;
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
    font-weight: 400;
    a {
      color: var(--p-default-color);
      margin-left: 15px;
      margin-top: -3px;
    }
    .header-user {
      margin-left: 15px;
      :deep(.el-dropdown) {
        .el-dropdown-link {
          display: flex;
          align-items: center;
          cursor: pointer;
          &:focus-visible {
            outline: none; /* 去掉 outline */
          }
        }
      }
    }
    :deep(.theme-switch) {
      border: none;
      background-color: transparent;
      margin-left: 15px;
      padding: 0;
    }
  }
}
</style>
