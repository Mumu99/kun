// v3框架提供的方法 createApp() 创建一个 Vue 应用实例
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 修改主题色
import { useElementPlusTheme } from 'use-element-plus-theme'
const color = '#3c62b0' // 主题颜色
localStorage.setItem('themeColor', color) // 持久化
useElementPlusTheme(color) // 切换主题色

// 国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 引入 App 组件
import App from '@/App.vue'
// 清除默认样式
import '@/style/app.less'

import Header from '@/components/header/index.vue'
import Footer from '@/components/footer/index.vue'

// 引入路由
import router from '@/router'

// 利用 createApp() 创建一个 Vue 应用实例，并挂载到 id 为 app 的元素上
createApp(App)
  .use(ElementPlus, {
    locale: zhCn
  })
  .use(ElementPlus)
  .use(router)
  .component('Header', Header)
  .component('Footer', Footer)
  .mount('#app')
