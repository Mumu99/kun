<template>
  <div class="container">
    <el-tabs
      v-model="activeName"
      :tab-position="'left'"
      class="patients-tabs"
      @tab-change="handleTabChange"
    >
      <el-tab-pane label="实名认证" name="user">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="挂号订单" name="order">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="就诊人管理" name="patientManage">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="修改账号信息" name="editUserInfo">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="意见反馈" name="remark">
        <router-view></router-view>
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
watch(
  () => route.query,
  newVal => {
    if (activeName.value === 'user') {
    }
  }
)
onMounted(() => {
  if (activeName.value === 'user') {
    // getUnitData(hoscode.value)
  }
})

const handleTabChange = (name: string) => {
  router.push({
    path: `/userInfo/${name}`
  })
}
</script>

<style lang="less" scoped></style>
