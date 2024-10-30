<template>
  <div class="user-info-container">
    <el-tabs
      v-model="activeName"
      :tab-position="'left'"
      class="patients-tabs"
      @tab-click="handleTabChange"
    >
      <el-tab-pane
        v-for="item in paneList"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
        <router-view v-if="activeName === item.name"></router-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()
let activeName = ref(route.name)
let paneList = ref([
  { name: 'user', label: '实名认证' },
  { name: 'order', label: '挂号订单' },
  { name: 'patientManage', label: '就诊人管理' },
  { name: 'editUserInfo', label: '修改账号信息' },
  { name: 'remark', label: '意见反馈' }
])
watch(
  () => route.query,
  newVal => {
    console.log(newVal)
    activeName.value = route.name
    paneList.value.forEach(item => {
      if (item.label === '挂号订单') {
        if (activeName.value === 'detail') {
          item.name = 'detail'
        } else {
          item.name = 'order'
        }
      }
    })
  }
)
onMounted(() => {
  paneList.value.forEach(item => {
    if (item.label === '挂号订单') {
      if (activeName.value === 'detail') {
        item.name = 'detail'
      } else {
        item.name = 'order'
      }
    }
  })
})

const handleTabChange = (event: any) => {
  const name = event.paneName
  router.push({
    path: `/userInfo/${name === 'detail' ? 'order' : name}`
  })
}
</script>

<style lang="less" scoped></style>
