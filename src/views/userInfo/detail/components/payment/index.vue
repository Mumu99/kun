<template>
  <div>
    <el-dialog
      :modelValue="dialogVisible"
      width="500"
      :before-close="handleClose"
      destroy-on-close
      draggable
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-class="'payment-dialog'"
    >
      <aside>
        <canvas ref="qrCode"></canvas>
        <div class="desc">
          <span>请使用微信扫一扫</span>
          <span>扫描二维码支付</span>
          {{ paymentStatus }}
        </div>
      </aside>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import type { PayQrcodeResponseData, PayQrcodeData } from '@/services/type'
import { createNative, queryPayStatus } from '@/services/order'
import QRious from 'qrious'
const qrCode = ref<HTMLCanvasElement>()
let payData = reactive(<PayQrcodeData>{})
let paymentStatus = ref('支付中···')
let timer = ref(<any>null)
const { dialogVisible, orderId } = defineProps(['dialogVisible', 'orderId'])
const emit = defineEmits(['update:dialogVisible', 'getDetail'])
const handleClose = () => {
  // 修改父级的dialogVisible值
  emit('update:dialogVisible', false)
  stopTimer()
}
onMounted(() => {
  handlePay()
})
const handlePay = async () => {
  const result: PayQrcodeResponseData = await createNative(orderId)
  if (result.code === 200) {
    payData = Object.assign(payData, result.data)
    new QRious({
      element: qrCode.value,
      value: payData.codeUrl, // 设置二维码的内容
      size: 250 // 设置二维码的大小
    })
    startTimer()
  }
}
const checkPaymentStatus = async () => {
  try {
    const result = await queryPayStatus(orderId)
    const { code, data, message } = result
    if (code === 200 && data) {
      paymentStatus.value = message
      handleClose()
      emit('getDetail')
    } else {
      paymentStatus.value = message
      startTimer()
    }
  } catch (error) {
    console.log(error)
  }
}
const startTimer = () => {
  stopTimer()
  timer.value = setInterval(checkPaymentStatus, 3000)
}
const stopTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}
</script>

<style lang="less" scoped>
:deep(.payment-dialog) {
  .el-dialog {
    padding: 0;
    background-color: #f7fbff;
    background-image: url(data:image/png;base64,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);
  }
  .el-dialog {
    .el-dialog__body {
      padding: 40px;
    }
    .el-dialog__header {
      padding: 0;
    }
    aside {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #fff;
      padding: 30px;
      border-radius: 4px;
      .desc {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          margin-bottom: 10px;
          color: #333;
        }
      }
    }
  }
}
</style>
