<template>
  <div class="patients-container" :key="patientsKey">
    <el-tabs
      v-model="activeName"
      :tab-position="tabPosition"
      class="patients-tabs"
      @tab-change="handleTabChange"
    >
      <el-tab-pane
        label="预约挂号"
        :name="['step', 'booking'].includes(route.name as string)
        ? route.name
        : 'appointmentRegistration'
        "
      >
        <Step v-if="route.name === 'step'" />
        <Booking v-else-if="route.name === 'booking'" />
        <AppointmentRegistration
          :detailData="bullentinStore.$state.bullentinDetail"
          :unitData="unitData"
          v-else
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
  QueryCancellation,
  Step,
  Booking
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
let isActiveStep = ref(false)
const hoscode = ref(<string>route.query.hoscode)
watch(
  () => route.name,
  newVal => {
    // 调用接口传递数据
    if (newVal === 'appointmentRegistration') {
      activeName.value = newVal
      isActiveStep.value = false
      getUnitData(hoscode.value)
    }
    if (['step', 'booking'].includes(newVal as string)) {
      // 设置当前当前为预约挂号页面
      isActiveStep.value = true
      activeName.value = newVal
    }
  }
)
watch(
  () => route.query,
  newVal => {
    /**
     * 根据路由查询参数中的hoscode获取医院详情。
     * 如果hoscode存在，则调用bullentinStore的getHospitalDetail方法并传入hoscode的值。
     */
    route.query.hoscode && bullentinStore.getHospitalDetail(hoscode.value)
    // 调用接口传递数据
    if (activeName.value === 'appointmentRegistration') {
      getUnitData(hoscode.value)
    }
  }
)
onMounted(() => {
  if (['step', 'booking'].includes(activeName.value as string)) {
    // 设置当前当前为预约挂号页面
    isActiveStep.value = true
  } else {
    // 调用接口获取数据
    bullentinStore.getHospitalDetail(hoscode.value)
    if (activeName.value === 'appointmentRegistration') {
      getUnitData(hoscode.value)
    }
  }
})
const handleTabChange = (name: string) => {
  router.push({
    path: `/patients/${
      ['step', 'booking'].includes(name) ? 'appointmentRegistration' : name
    }`,
    query: { hoscode: hoscode.value }
  })
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
}
</style>
