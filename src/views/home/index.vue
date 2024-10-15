<template>
  <div class="container">
    <!-- 轮播图 -->
    <Banner />
    <!-- 搜索医院 -->
    <SearchPatients />
    <!-- 具体内容 -->
    <CityPatients />
  </div>
</template>

<script setup lang="ts">
import Banner from './components/banner/index.vue'
import SearchPatients from './components/searchPatients/index.vue'
import CityPatients from './components/cityPatients/index.vue'
</script>

<style lang="less" scoped></style>
