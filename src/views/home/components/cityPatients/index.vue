<template>
  <div class="city-patients-container">
    <el-row :gutter="20">
      <el-col :span="18"> <Level /> <Region /> </el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import Level from './components/level/index.vue'
import Region from './components/region/index.vue'
</script>

<style lang="less" scoped>
.city-patients-container .level-container {
  font-size: 14px;
  .patients-content {
    display: flex;
    align-items: center;
    margin: 20px 0;
    .patients-right {
      display: flex;
      align-items: center;
      .patients-item {
        margin-left: 20px;
        color: var(--p-default-color);
        &.active {
          color: var(--p-text-color);
        }
        &:hover {
          color: var(--p-text-color);
        }
        cursor: pointer;
      }
    }
  }
}
</style>
