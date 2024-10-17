<template>
  <div class="search-patients-container">
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入医院名称"
      @select="goDetail"
      size="large"
      class="search-input"
      value-key="hosname"
    >
    </el-autocomplete>
    <el-button type="primary" :icon="Search" size="large" class="search-btn">
      搜索
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { queryByHosname } from '@/services/patients'
import type { HospitalByHosnameData, Content } from '@/services/type'
import { useRouter } from 'vue-router'
const router = useRouter()
// 当前输入的医院名次
const state = ref('')
// 根据用户输入的数据查询发送接口
const querySearchAsync = async (
  hosname: string,
  cb: (arg: Content) => void
) => {
  if (hosname) {
    const data: HospitalByHosnameData = await queryByHosname(hosname)
    cb(data.data || [])
  } else {
    cb([])
  }
}
// 展示详情页
const goDetail = (item: any) => {
  const { hoscode } = item
  router.push({ name: 'Patients', params: { hoscode } })
}
</script>

<style lang="less" scoped>
.search-patients-container {
  width: 100%;
  margin: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  ::v-deep(.search-input) {
    width: 50%;
    .el-input__wrapper {
      border-radius: 4px 0 0 4px;
      border-right: none;
    }
  }
  .search-btn {
    border-radius: 0 4px 4px 0;
  }
}
</style>
