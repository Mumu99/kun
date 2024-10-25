<template>
  <div class="booking-container">
    <h1>确认挂号信息</h1>
    <header>
      <div class="title">选择就诊人：</div>
      <div class="patient-wrapper">
        <el-card
          class="patient-info-card"
          shadow="hover"
          :class="{ 'is-active': activeCard === item.id }"
          v-for="item in patientList"
          :key="item"
          @click="handleCardClick(item)"
        >
          <div class="left-side">
            <p class="patient-name">{{ item.name }}</p>
            <div class="patient-info">
              <span>{{ item.param?.certificatesTypeString }}</span>
              <span>{{ item.certificatesNo }}</span>
            </div>
          </div>
          <el-icon
            v-if="item.id === activeCard"
            :color="loginStore.isDrakMode ? '#3c62b0' : '#fff'"
          >
            <Select />
          </el-icon>
        </el-card>
        <el-card
          class="patient-info-card patient-add-card"
          shadow="hover"
          :class="{ 'is-first': 4 % patientList.length === 0 }"
        >
          + 添加就诊人
        </el-card>
      </div>
    </header>
    <main>
      <div class="title">
        选择就诊卡：
        <span class="tip">
          <SvgIcon
            name="tip"
            class="cls__svg"
            :size="12"
            color="var(--p-darnger-color)"
          ></SvgIcon>
          如您持社保卡就诊，请务必选择医保预约挂号，以保证正常医保报销
        </span>
      </div>
      <!-- 身份挂卡 -->
      <el-card class="patient-card">
        <div class="patient-header-title">
          <span>{{ patientCardData.name }}</span>
          <span>{{ patientCardData.certificatesNo }}</span>
          <span>居民{{ patientCardData.param?.certificatesTypeString }}</span>
        </div>
        <div class="patient-id-card">
          <!-- :class="{ 'is-active': index === activeIdCard }"
            v-for="(item, index) in 1"
            :key="item"
            @click="handleIdCardClick(item, index)" -->
          <div class="patient-id-card-item is-active">
            <el-tag>自费</el-tag>
            <span>{{ patientCardData.certificatesNo }}</span>
            <span>居民{{ patientCardData.param?.certificatesTypeString }}</span>
          </div>
          <!-- <div class="patient-id-card-item">
            <el-tag>医保</el-tag>
            <span>99281028372</span>
            <span>居民社保卡</span>
          </div> -->
        </div>
      </el-card>
      <!-- 挂号信息 -->
      <div class="appointment-info">
        <div class="title">挂号信息</div>
        <el-form v-model="formData" label-width="150px">
          <el-form-item label="就诊日期：" class="appointment-date">
            <span>{{ formData.workDate }}</span>
            <span>{{ formData.param?.dayOfWeek }}</span>
            <span>上午</span>
          </el-form-item>
          <el-form-item label="就诊医院：">
            <span>{{ formData.param?.hosname }}</span>
          </el-form-item>
          <el-form-item label="就诊科室：">
            <span>{{ formData.param?.depname }}</span>
          </el-form-item>
          <el-form-item label="医生姓名：">
            <span>{{ formData.docname }}</span>
          </el-form-item>
          <el-form-item label="医生职称：">
            <span>{{ formData.title }}</span>
          </el-form-item>
          <el-form-item label="医生专长：">
            <span>{{ formData.skill }}</span>
          </el-form-item>
          <el-form-item label="医生服务费：">
            <span class="price">{{ formData.amount }}元</span>
          </el-form-item>
        </el-form>
      </div>
      <!-- 用户信息 -->
      <div class="user-info">
        <div class="title">用户信息</div>
        <el-form v-model="patientCardData" label-width="150px">
          <el-form-item label="就诊人手机号：">
            <span>{{ patientCardData.phone }}</span>
          </el-form-item>
          <el-form-item label="就诊人出生年月：">
            <span>{{ patientCardData.birthdate }}</span>
          </el-form-item>
          <el-form-item label="就诊人性别：">
            <span>{{ patientCardData.sex === 1 ? '男' : '女' }}</span>
          </el-form-item>
          <el-form-item label="就诊人住址：">
            <span>{{ patientCardData.param?.fullAddress || '' }}</span>
          </el-form-item>
        </el-form>
      </div>
    </main>
    <footer>
      <el-button type="primary">确定挂号</el-button>
    </footer>
  </div>
</template>

<script setup lang="ts" name="booking">
import { ref, reactive, onMounted } from 'vue'
import { Select } from '@element-plus/icons-vue'
import { useLoginStore } from '@/store/login'
import { findAll, getSchedule } from '@/services/appointment'
import { useRoute } from 'vue-router'
import type {
  PatientInfo,
  PatientInfoArr,
  PatientInfoResponseData,
  PatientData,
  PatientDataResponseData
} from '@/services/type'
const route = useRoute()
const scheduleId = route.query.scheduleId as string
onMounted(() => {
  getDetail()
})
const loginStore = useLoginStore()
let activeCard = ref(0)
// let activeIdCard = ref(0)
let formData = ref(<PatientData>{})
let patientList = reactive(<PatientInfoArr>[])
let patientCardData = ref(<PatientInfo>{})

const getDetail = async () => {
  try {
    const resultOfAll: PatientInfoResponseData = await findAll()
    const resultOfSchedule: PatientDataResponseData = await getSchedule(
      scheduleId
    )
    if (resultOfAll.code === 200) {
      patientList.splice(0, patientList.length, ...resultOfAll.data)
      activeCard.value = patientList[0].id
      patientCardData.value = patientList[0]
    }
    if (resultOfSchedule.code === 200) {
      formData.value = resultOfSchedule.data
    }
  } catch (error) {
    console.log(error)
  }
}

const handleCardClick = (item: PatientInfo) => {
  patientCardData.value = item
  activeCard.value = item.id
}
// const handleIdCardClick = (item: any, index: number) => {
//   activeIdCard.value = index
// }
</script>

<style lang="less" scoped>
.booking-container {
  font-family: TencentSans-W3;
  h1 {
    font-size: 20px;
    font-family: TencentSans-W7;
  }
  .title {
    padding-left: 10px;
    position: relative;
    color: var(--p-gray-color);
    display: flex;
    align-items: center;
    margin: 30px 0;
    .tip {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: var(--p-darnger-color);
      .cls__svg {
        margin: 3px 5px 0 15px;
      }
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate3d(0, -35%, 0);
      width: 3px;
      height: 14px;
      background-color: var(--p-text-color);
      border-radius: 5px;
    }
  }
  header {
    margin: 50px 0;
    .patient-wrapper {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      .patient-info-card {
        box-sizing: border-box;
        cursor: pointer;
        :deep(.el-card__body) {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .patient-info {
          margin-top: 10px;
          font-size: 12px;
          display: flex;
          flex-direction: column;

          span {
            margin-top: 5px;
            color: var(--p-gray-color);
          }
        }
        &:last-child {
          margin-left: 30px;
        }
        &:hover {
          .patient-name {
            font-family: TencentSans-W7;
          }
        }
        &.is-active {
          background-color: var(--p-text-color);
          .left-side .patient-name,
          span {
            color: var(--p-patient-active-color);
          }
          border-color: var(--p-patient-active-shadown);
          box-shadow: 0px 0px 12px var(--p-patient-active-shadown);
        }
        &.patient-add-card {
          height: 100px;
          display: flex;
          align-items: center;
          color: var(--p-text-color);
          font-family: TencentSans-W7;
          padding-bottom: 5px;
          &.is-first {
            margin-left: 0;
          }
        }
      }
    }
  }
  main {
    .patient-card {
      .patient-header-title {
        padding-bottom: 20px;
        border-bottom: 1px solid var(--p-login-border-color);
        span {
          margin-right: 10px;
        }
      }
      .patient-id-card {
        margin-top: 20px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
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
    .appointment-info {
      margin: 50px 0;
      .price {
        color: var(--p-text-color);
        font-family: TencentSans-W7;
      }
      .appointment-date .el-form-item__content {
        span {
          margin-right: 10px;
        }
      }
    }
  }
  footer {
    margin: 50px 0 40px;
    text-align: center;
    .el-button {
      width: 140px;
      height: 40px;
    }
  }
}
</style>
