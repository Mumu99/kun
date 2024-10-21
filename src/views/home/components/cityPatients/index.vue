<template>
  <div class="city-patients-container">
    <el-row :gutter="20">
      <el-col :span="18">
        <!-- 等级 -->
        <Level @send-params="sendParams" />
        <!-- 地区 -->
        <Region @send-params="sendParams" />
        <!-- 详情卡片 -->
        <div class="detail-card" v-if="detailList.length">
          <DetailCard
            v-for="item in detailList"
            :key="item.id"
            :patientsData="item"
          />
          <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            layout="prev, pager, next, jumper, sizes, total"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <el-empty v-else description="目前没有符合条件的医院" />
      </el-col>
      <el-col :span="6" class="affix-container">
        <el-affix target=".affix-container" :offset="80">
          <UnitDetail />
        </el-affix>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 导入接口
import { queryPatients } from '@/services/patients'
// 导入组件
import Level from './components/level/index.vue'
import Region from './components/region/index.vue'
import DetailCard from './components/detailCard/index.vue'
import UnitDetail from './components/unitDetail/index.vue'
import type {
  HospitalResponseData,
  Content,
  ParentLevelAndRegion
} from '@/services/type'
// 当前页码
let currentPage = ref<number>(1)
// 当前页总数
let pageSize = ref<number>(10)
// 详情列表
let detailList = ref<Content>([])
// 总数
let total = ref<number>(0)
onMounted(() => {
  fetchData()
})
// 存储医院等级
let hostype = ref<string>('')
// 存储医院地区
let districtCode = ref<string>('')
// 监听分页大小变化
const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize
  fetchData()
}
// 监听当前页变化
const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage
  fetchData()
}
// 存储等级
const sendParams = (data: ParentLevelAndRegion) => {
  const { value, type } = data
  if (type === 'hostype') {
    hostype.value = value
  } else if (type === 'districtCode') {
    districtCode.value = value
  }
  fetchData()
}
// 获取医院列表数据
const fetchData = async () => {
  const params = {
    hostype: hostype.value,
    districtCode: districtCode.value
  }
  const data: HospitalResponseData = await queryPatients(
    currentPage.value,
    pageSize.value,
    params
  )
  if (data.code === 200) {
    const { content, totalElements } = data.data
    detailList.value = content
    total.value = totalElements || 0
  }
}
// 根据名次获取医院列表数据
</script>

<style lang="less" scoped>
.city-patients-container {
  :deep(.patients-content) {
    display: flex;
    margin: 10px 0;
    font-size: 14px;
    font-family: TencentSans-W7;
    .patients-left {
      min-width: 40px;
    }
    .patients-right {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .patients-item {
        margin: 0 15px 10px 0;
        color: var(--p-default-color);
        &.active {
          color: var(--p-text-color);
        }
        &:hover {
          color: var(--p-text-color);
        }
        cursor: pointer;
      }
    }
  }
  .detail-card {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    .el-pagination {
      grid-column: span 2; /* 使最后一个卡片占满整行 */
    }
  }
}
</style>
