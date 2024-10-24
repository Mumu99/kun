<template>
  <svg
    aria-hidden="true"
    :width="size"
    :height="size"
    :class="`${className}`"
    :style="{ fill: color }"
  >
    <use :href="`#icon-${name}`"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  // SVG 文件名称
  name: {
    type: String,
    required: true
  },
  // 额外类名
  className: {
    type: String,
    default: ''
  },
  // SVG 大小
  size: {
    type: Number,
    default: 40
  },
  color: {
    type: String,
    default: '#333'
  }
})
</script>
