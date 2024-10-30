<template>
  <div class="user-container">
    <h1>实名认证</h1>
    <el-tag>
      <SvgIcon name="warning" :size="26" />
      <span>
        完成实名认证后才能够添加就诊人，正常进行挂号，为了不影响后续的步骤，请尽快完成实名认证！
      </span>
    </el-tag>
    <el-form v-model="userInfo">
      <el-form-item label="姓名:">
        <span>
          {{ userInfo.nickName }}
        </span>
      </el-form-item>
      <el-form-item label="证件类型:">
        <span>
          {{ userInfo.status === 1 ? '身份证' : '户口本' }}
        </span>
      </el-form-item>
      <el-form-item label="证件号码:">
        <span>
          {{ userInfo.openid }}
        </span>
      </el-form-item>
      <el-form-item label="手机:">
        <span>
          {{ userInfo.phone }}
        </span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const userInfo = ref({
  id: 1,
  createTime: '2020-07-24 09:04:00',
  updateTime: '2022-03-26 17:17:31',
  isDeleted: 0,
  param: {},
  openid: 'o1R-t5trto9c5sdYt6l1ncGmY5iY',
  nickName: '晴天',
  phone: '15010546300',
  name: '',
  certificatesType: '',
  certificatesNo: '',
  certificatesUrl: '',
  authStatus: 1,
  status: 1
})
</script>

<style lang="less" scoped>
.user-container {
  font-family: TencentSans-W3;
  h1 {
    font-family: TencentSans-W7;
    font-size: 20px;
  }
  :deep(.el-tag) {
    width: 100%;
    height: 60px;
    margin: 30px 0 100px;
    .el-tag__content {
      width: 100%;
      display: flex;
      align-items: center;
      span {
        margin: -3px 0 0 15px;
        font-size: 16px;
      }
    }
  }
  :deep(.el-form) {
    .el-form-item__label,
    .el-form-item__content {
      font-size: 16px;
    }
  }
}
</style>
