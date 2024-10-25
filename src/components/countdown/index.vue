<template>
  <span>{{ formattedCountdown }}</span>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, onUnmounted, watch } from 'vue'
const { endTime } = defineProps(['endTime'])
const calculateCountdown = (endTime: string) => {
  const now = new Date().getTime()
  const distance = new Date(endTime).getTime() - now
  return Math.floor(distance / 1000)
}

const countdown = ref(calculateCountdown(endTime))

const formattedCountdown = computed(() => {
  const totalSeconds = countdown.value
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return `${hours.toString().padStart(2, '0')} 时 ${minutes
    .toString()
    .padStart(2, '0')} 分 ${seconds.toString().padStart(2, '0')} 秒`
})

let intervalId: any = ref(null)

const updateCountdown = () => {
  countdown.value = calculateCountdown(endTime)
}

const clearCountdown = () => {
  clearInterval(intervalId)
}

onMounted(() => {
  intervalId = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearCountdown()
})

watch(
  () => endTime,
  newEndTime => {
    countdown.value = calculateCountdown(newEndTime)
  }
)
</script>

<script lang="ts">
export default {
  name: 'CountDOwn'
}
</script>
