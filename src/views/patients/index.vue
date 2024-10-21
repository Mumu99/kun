<template>
  <div class="patients-container" :key="patientsKey">
    <el-tabs
      v-model="activeName"
      :tab-position="tabPosition"
      class="patients-tabs"
      @tab-change="handleTabChange"
    >
      <el-tab-pane label="预约挂号" name="appointmentRegistration">
        <AppointmentRegistration
          :detailData="bullentinStore.$state.bullentinDetail"
          :unitData="unitData"
        />
      </el-tab-pane>
      <el-tab-pane label="医院详情" name="patientsDetail">
        <PatientsDetail />
      </el-tab-pane>
      <el-tab-pane label="预约须知" name="appointmentInstructions">
        <AppointmentInstructions />
      </el-tab-pane>
      <el-tab-pane label="停诊信息" name="qutpatientInfo">
        <QutpatientInfo />
      </el-tab-pane>
      <el-tab-pane label="查询/取消" name="queryCancellation">
        <QueryCancellation />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type {
  DepartmentDetailResponseData,
  DepartmentContent
} from '@/services/type'
import {
  AppointmentRegistration,
  PatientsDetail,
  AppointmentInstructions,
  QutpatientInfo,
  QueryCancellation
} from './components'
import { hospitalDepartment } from '@/services/patients'
import { useBullentinStore } from '@/store/bullentin'
import { nanoid } from 'nanoid'
const route = useRoute()
const router = useRouter()
const tabPosition = ref('left')
const activeName = ref(route.name)
let unitData = ref<DepartmentContent>([])
const bullentinStore = useBullentinStore()
let patientsKey = nanoid()
watch(
  () => route.name,
  newVal => {
    // 调用接口传递数据
    if (activeName.value === 'appointmentRegistration') {
      getUnitData(route.query.hoscode as string)
    }
  }
)
watch(
  () => route.query,
  newVal => {
    // 调用接口获取数据
    bullentinStore.getHospitalDetail(route.query.hoscode as string)
    // 调用接口传递数据
    if (activeName.value === 'appointmentRegistration') {
      getUnitData(route.query.hoscode as string)
    }
  }
)
onMounted(() => {
  // 调用接口获取数据
  bullentinStore.getHospitalDetail(route.query.hoscode as string)
  if (activeName.value === 'appointmentRegistration') {
    getUnitData(route.query.hoscode as string)
  }
})
const handleTabChange = (name: string) => {
  router.push({ path: `/patients/${name}`, query: route.query })
}
// 获取医院的科室信息
const getUnitData = async (hoscode: string) => {
  // 调用接口获取数据
  const { data }: DepartmentDetailResponseData = await hospitalDepartment(
    hoscode
  )
  unitData.value = data
  patientsKey = nanoid()
}
</script>

<style lang="less" scoped>
.patients-container {
  width: 1200px;
  margin: 0 auto;
  :deep(.patients-tabs) {
    .el-tabs__nav-wrap {
      &::after {
        width: 0;
      }
    }
    .el-tabs__active-bar {
      display: none;
    }
    .el-tabs__item {
      width: 120px;
      display: flex;
      justify-content: flex-start;
      font-family: TenCentSans-W7;
      margin: 20px 0;
      &.is-active {
        border-radius: 10px;
        color: var(--p-text-active-color);
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 0px;
          width: 10px;
          height: 10px;
          background-color: var(--p-text-active-color);
          transform: translate3d(0, -30%, 0);
          border-radius: 2px;
        }
      }
      &:hover {
        color: var(--p-text-active-color);
      }
    }
    .el-tabs__content {
      padding-top: 33px;
      padding-left: 100px;
      margin-bottom: 50px;
    }
  }
}
</style>
