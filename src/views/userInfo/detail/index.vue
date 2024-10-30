<template>
  <div class="detail-container">
    <header>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/userInfo/order' }">
          挂号订单
        </el-breadcrumb-item>
        <el-breadcrumb-item>挂号详情</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>挂号详情</h1>
      <el-tag type="primary">
        <div class="left">
          <SvgIcon :name="orderStatusInfo.icon" :size="26" color="#3c62b0" />
          <span>
            {{ orderStatusInfo.text }}
          </span>
        </div>
        <div class="right">
          <el-image src="/src/assets/images/qr.jpg" />
          <span class="login-btn-text">
            打开 <span class="btn-wechart">微信APP</span> 点击扫一扫 快速挂号
            轻松就医
          </span>
        </div>
      </el-tag>
    </header>
    <main>
      <div class="appointment-info">
        <div class="title">挂号信息</div>
        <el-form v-model="formData" label-width="150px">
          <el-form-item label="就诊人姓名：">
            <span>{{ formData.patientName }}</span>
          </el-form-item>
          <el-form-item label="就诊人电话：">
            <span>{{ formData.patientPhone }}</span>
          </el-form-item>
          <el-form-item label="就诊日期：" class="appointment-date">
            <span>{{ formData.reserveDate }}</span>
            <span>{{ (formData.reserveTime && '下午') || '上午' }}</span>
          </el-form-item>
          <el-form-item label="就诊医院：">
            <span>{{ formData.hosname }}</span>
          </el-form-item>
          <el-form-item label="就诊科室：">
            <span>{{ formData.depname }}</span>
          </el-form-item>
          <el-form-item label="医生职称：">
            <span>{{ formData.title }}</span>
          </el-form-item>
          <el-form-item label="医生服务费：">
            <span class="price">{{ formData.amount }}元</span>
          </el-form-item>
          <el-form-item label="挂号订单：">
            <span>{{ formData.outTradeNo }}</span>
          </el-form-item>
          <el-form-item label="挂号时间：">
            <span>{{ formData.createTime }}</span>
          </el-form-item>
        </el-form>
      </div>
    </main>
    <footer>
      <el-tag class="notice" type="info">
        <span class="title"> 注意事项</span>
        <ul>
          <li>
            1、请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；
          </li>
          <li>
            2、【取号】就诊当天需在
            {{ formData.fetchTime }}
            在医院取号，未取号视为爽约，该号不退不换；
          </li>
          <li>
            3、【退号】在{{ formData.quitTime }}前可在线退号
            ，逾期将不可办理退号退费；
          </li>
          <li>
            4、微信公众号“困不困”预约挂号支持自费患者使用身份证预约，同时支持深圳市医保患者使用深圳社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；
          </li>
          <li>5、请注意深圳市医保患者在住院期间不能使用社保卡在门诊取号。</li>
        </ul>
      </el-tag>
      <div class="footer-btn">
        <el-button
          type="primary"
          plain
          @click="handleCancel"
          v-if="[0, 1].includes(formData.orderStatus)"
        >
          取消预约
        </el-button>
        <el-button
          type="primary"
          @click="handlePay"
          v-if="formData.orderStatus === 0"
          >支付</el-button
        >
      </div>
    </footer>
    <PayMent
      v-if="dialogVisible"
      :dialogVisible="dialogVisible"
      :orderId="formData.id"
      @update:dialogVisible="dialogVisible = $event"
      @getDetail="getDetail"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getOrderInfo, cancelOrder } from '@/services/order'
import { useRoute } from 'vue-router'
import type { OrderListItem, OrderDetailResponseData } from '@/services/type'
import PayMent from './components/payment/index.vue'
const route = useRoute()
let formData = reactive(<OrderListItem>{})
const id = route.query.orderId
let dialogVisible = ref(<boolean>false)
onMounted(() => {
  getDetail()
})
const orderStatusInfo = computed(() => {
  const statusMap = {
    1: { text: '已支付', icon: 'paid' },
    0: { text: '预约成功，待支付', icon: 'success' },
    2: { text: '已取号', icon: 'pick' }
  }
  const defaultStatus = { text: '取消预约', icon: 'cancel' }
  return (
    statusMap[formData.orderStatus as keyof typeof statusMap] || defaultStatus
  )
})
const getDetail = async () => {
  const result = await getOrderInfo(id as string)
  if (result.code === 200) {
    formData = Object.assign(formData, result.data)
  }
}
const handleCancel = () => {
  ElMessageBox.confirm('确定取消预约吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const result: OrderDetailResponseData = await cancelOrder(formData.id)
    if (result.code === 200) {
      ElMessage({
        type: 'success',
        message: '取消预约成功！'
      })
      getDetail()
      // router.push('/userInfo/order')
    }
  })
}
const handlePay = async () => {
  dialogVisible.value = true
  // const result: PayQrcodeResponseData = await createNative(formData.id)
  // if (result.code === 200) {
  //   console.log(result)
  //   // dialogVisible.value = true
  //   payData = Object.assign(payData, result.data)
  // }
}
</script>

<style lang="less" scoped>
.detail-container {
  font-family: TencentSans-W3;
  h1 {
    font-family: TencentSans-W7;
    font-size: 20px;
    margin-top: 20px;
  }
  :deep(.el-tag) {
    width: 100%;
    height: 60px;
    margin: 30px 0 50px;
    padding: 0 20px;
    .el-tag__content {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .right,
      .left {
        display: flex;
        align-items: center;
        .el-image {
          width: 50px;
        }
        .login-btn-text {
          width: 150px;
          white-space: wrap;
          margin-left: 10px;
          line-height: 16px;
          color: var(--p-register-gray-color);
          .btn-wechart {
            color: var(--p-text-active-color);
          }
        }
      }
      .left {
        span {
          margin: -3px 0 0 10px;
          font-size: 16px;
        }
      }
    }
  }
  main {
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
    .appointment-info {
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
    :deep(.notice) {
      height: auto;
      padding: 20px;
      .el-tag__content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .title {
          font-family: TencentSans-W7;
          font-size: 16px;
          color: var(--p-title-color);
        }
        ul {
          margin-top: 20px;
          li {
            margin-bottom: 3px;
            white-space: wrap;
            line-height: 16px;
            &:nth-child(2) {
              color: var(--p-darnger-color);
            }
          }
        }
      }
    }
    .footer-btn {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      margin: 0 0 50px;
      .el-button {
        width: 130px;
        height: 40px;
      }
    }
  }
}
</style>
