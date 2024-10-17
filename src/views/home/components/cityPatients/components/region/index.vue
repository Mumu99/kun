<template>
  <div class="level-container">
    <div class="patients-content">
      <div class="patients-left">地区:</div>
      <ul class="patients-right">
        <li
          class="patients-item"
          :class="{ active: regionActiveValue === '' }"
          @click="handleClick('')"
        >
          全部
        </li>
        <li
          class="patients-item"
          v-for="item in levelList"
          :key="item.id"
          @click="handleClick(item.value)"
          :class="{ active: item.value === regionActiveValue }"
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
// 自定义事件
const emit = defineEmits(['sendParams'])
// 存储地区的数据
let levelList = ref<LevelAndRegionArr>([])
const getRegion = async () => {
  const { data }: LevelAndRegionResponseData = await levelAndRegionPatients(
    'Beijin'
  )
  levelList.value = data
}
// 初始化regionActiveValue
let regionActiveValue = ref<string>('')

// regionActiveValue 变化时触发
const handleClick = (value: string) => {
  // 设置active状态
  regionActiveValue.value = value
  emit('sendParams', { value, type: 'districtCode' })
}

onMounted(() => {
  getRegion()
})
</script>

<script lang="ts">
export default {
  name: 'Region'
}
</script>
