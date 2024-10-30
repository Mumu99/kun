<template>
  <div class="patient-manage-container">
    <h1>就诊人管理</h1>
    <section>
      <el-card v-for="item in patientList" :key="item.id" class="patient-card">
        <div class="patient-header-title">
          <div class="left">
            <span>{{ item.name }}</span>
            <div class="patient-id-info">
              <span>{{ item.certificatesNo }}</span>
              <span>{{ item.param?.certificatesTypeString }}</span>
            </div>
          </div>
          <div class="right">
            <span>查看详情</span>
            <el-icon><More /></el-icon>
          </div>
        </div>
        <div class="patient-id-card">
          <div class="patient-id-card-item is-active">
            <el-tag>自费</el-tag>
            <span>{{ item.certificatesNo }}</span>
            <span>{{ item.param?.certificatesTypeString }}</span>
          </div>
        </div>
      </el-card>
    </section>
    <el-card class="patient-card-add">
      <span>+ 添加就诊人</span>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { More } from '@element-plus/icons-vue'
import { findAll } from '@/services/appointment'
import type { PatientInfoResponseData, PatientInfoArr } from '@/services/type'
onMounted(() => {
  getSelectAll()
})
const patientList = reactive(<PatientInfoArr>[])
// 获取就诊人列表和订单状态列表
const getSelectAll = async () => {
  try {
    const resultFind: PatientInfoResponseData = await findAll()
    if (resultFind.code === 200) {
      patientList.splice(0, patientList.length, ...resultFind.data)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="less" scoped>
.patient-manage-container {
  font-family: TencentSans-W3;
  h1 {
    font-family: TencentSans-W7;
    font-size: 20px;
    margin-bottom: 30px;
  }
  section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    .patient-card {
      .patient-header-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--p-login-border-color);
        span {
          margin-right: 10px;
        }
        .left,
        .right {
          display: flex;
          align-items: center;
        }
        .patient-id-info,
        .right {
          color: var(--p-register-gray-color);
          font-size: 14px;
          &:not(.right) {
            margin-top: 3px;
          }
          &:not(.patient-id-info) {
            cursor: pointer;
          }
        }
      }
      .patient-id-card {
        margin-top: 20px;
        min-width: 400px;
        width: 50%;
        .patient-id-card-item {
          border-radius: 4px;
          height: 50px;
          display: flex;
          align-items: center;
          padding: 0 20px 3px;
          border: 1px solid var(--p-login-border-color);
          cursor: pointer;
          .el-tag {
            margin-top: 3px;
            margin-right: 10px;
            padding-bottom: 3px;
          }
          span {
            margin-right: 10px;
          }
          &.is-active {
            background-color: var(--p-text-color);
            color: var(--p-patient-active-color);
            border-color: var(--p-patient-active-shadown);
            box-shadow: 0px 0px 12px var(--p-patient-active-shadown);
          }
        }
      }
    }
  }
  .patient-card-add {
    text-align: center;
    color: var(--p-text-color);
    cursor: pointer;
    margin-top: 30px;
  }
}
</style>
