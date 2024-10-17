<template>
  <div class="level-container">
    <h1>医院</h1>
    <div class="patients-content">
      <div class="patients-left">等级:</div>
      <ul class="patients-right">
        <li
          class="patients-item"
          :class="{ active: levelActiveValue === '' }"
          @click="handleClick('')"
        >
          全部
        </li>
        <li
          class="patients-item"
          v-for="item in levelList"
          :key="item.id"
          @click="handleClick(item.value)"
          :class="{ active: item.value === levelActiveValue }"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入接口
import { levelAndRegionPatients } from '@/services/patients'
import { onMounted, ref, defineEmits } from 'vue'
import type {
  LevelAndRegionArr,
  LevelAndRegionResponseData
} from '@/services/type'
// 存储等级列表
let levelList = ref<LevelAndRegionArr>([])
// 自定义事件
const emit = defineEmits(['sendParams'])
// 初始化levelActiveValue
let levelActiveValue = ref<string>('')
const getLevel = async () => {
  const { data }: LevelAndRegionResponseData = await levelAndRegionPatients(
    'hostype'
  )
  levelList.value = data
}

// levelActiveValue 变化时触发
const handleClick = (value: string) => {
  // 设置active状态
  levelActiveValue.value = value
  emit('sendParams', { value, type: 'hostype' })
}

onMounted(() => {
  getLevel()
})
</script>

<script lang="ts">
export default {
  name: 'Level'
}
</script>

<style lang="less" scoped>
.level-container {
  font-size: 18px;
  font-family: TencentSans-W7;
  h1 {
    padding-bottom: 10px;
  }
}
</style>
