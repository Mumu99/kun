<template>
  <div class="appointment-instructions-container">
    <h1>{{ bullentinStore.bullentinDetail.hospital?.hosname }}</h1>
    <p class="desc">为方便您早日就医康复，请您认真阅读预约挂号须知：</p>
    <main class="instructions-content">
      <div
        v-for="(item, index) in instructionList"
        :key="item.title"
        class="instruction-item"
      >
        <h2 class="item-title">
          <span>{{ index + 1 }}、</span> {{ item.title }}
        </h2>
        <p class="item-desc" v-if="item.content">{{ item.content }}</p>
        <ul v-if="item.list" class="item-list">
          <li v-for="li in item.list" :key="li">{{ li }}</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts" name="AppointmentInstructions">
import { ref } from 'vue'
import { useBullentinStore } from '@/store/bullentin'
let bullentinStore = useBullentinStore()
const instructionList = ref([
  {
    title: '预约实名制',
    content:
      '统一平台电话预约和网上预约挂号均采取实名制注册预约，请您如实提供就诊人员的真实姓名、有效证件号（身份证、护照）、性别、手机号码、社保卡号等基本信息。'
  },
  {
    title: '预约挂号',
    content: '按照北京市卫健委统一平台要求，预约挂号规则如下：',
    list: [
      '在同一自然日，同一医院，同一科室，同一就诊单元，同一就诊人，可以预约最多1个号源；',
      '在同一自然周，同一就诊人，可以预约最多8个号源；',
      '在同一自然月，同一就诊人，可以预约最多12个号源；',
      '在同一自然季度，同一就诊人，可以预约最多24个号源。'
    ]
  },
  {
    title: '取消预约',
    content:
      '已完成预约的号源，如需办理退号，至少在就诊前一工作日14:00前通过网站、微信公众号、114电话等平台预约渠道进行取消预约。'
  },
  {
    title: '爽约处理',
    content:
      '如预约成功后患者未能按时就诊且不办理取消预约号视为爽约，同一患者在自然年内爽约规则如下：',
    list: [
      '累计爽约3次，自3次爽约日起，90天内不允许通过114平台进行预约挂号；',
      '累计爽约6次，自6次爽约日起，180天内不允许通过114平台进行预约挂号。'
    ]
  }
])
</script>

<style lang="less" scoped>
.appointment-instructions-container {
  width: 100%;
  font-family: TencentSans-W3;
  h1,
  h2 {
    font-family: TencentSans-W7;
  }
  h1 {
    display: flex;
    justify-content: center;
    font-size: 24px;
    padding-bottom: 10px;
  }
  .desc {
    padding: 20px 0;
  }
  .instructions-content {
    .instruction-item {
      margin-bottom: 30px;
      .item-title {
        margin-bottom: 15px;
      }
      .item-desc {
        line-height: 20px;
        padding-bottom: 15px;
      }
      .item-list li {
        line-height: 20px;
      }
    }
  }
}
</style>
