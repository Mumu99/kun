<template>
  <div class="banner-container">
    <Swiper
      :modules="modules"
      :pagination="{ clickable: true }"
      :space-between="50"
      :loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      navigation
      class="banner-swiper"
    >
      <SwiperSlide class="bg-blueGray">
        <img class="banner-img" :src="bannerData.src" alt="" />
      </SwiperSlide>
      <SwiperSlide
        v-for="item in store.bullentinList"
        :key="item.src"
        class="bg-blueGray"
      >
        <h3 class="banner-text" text="2xl" justify="center">
          {{ item.src }}
        </h3>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import banner1 from '@/assets/images/banner1.png'
import { useBullentinStore } from '@/store/bullentin'
// 导入Swiper样式
import 'swiper/css'
import 'swiper/less/navigation'
import 'swiper/less/pagination'
import 'swiper/less/autoplay'
import { reactive } from 'vue'
interface Banner {
  id: string
  type: string
  src: string
}
const store = useBullentinStore()
const bannerData: Banner = reactive({ id: '111', type: 'image', src: banner1 })
for (let i = 0; i < 3; i++) {
  store.getTalk()
}
const modules = [Navigation, Pagination, Autoplay]
</script>

<style lang="less" scoped>
.banner-container {
  /deep/.banner-swiper {
    width: 100%;
    height: auto;
    .swiper-slide {
      width: 100%;
      height: auto;
      .banner-img {
        width: 100%;
        height: auto;
      }
      h3 {
        display: flex;
        height: 100%;
        color: var(--p-text-color);
        opacity: 0.75;
        justify-content: center;
        align-items: center;
        font-family: TencentSans-W7;
        font-size: 26px;
        padding: 0 100px;
        line-height: 36px;
      }
    }
    .swiper-pagination {
      display: flex;
      justify-content: center;
      .swiper-pagination-bullet {
        width: 20px;
        height: 5px;
        border-radius: 10px;
        background-color: var(--p-text-color);
      }
    }
    .swiper-button-prev,
    .swiper-button-next {
      transition: opacity 0.2s ease-in-out;
      opacity: 0;
      &::after {
        color: var(--p-text-color);
        font-size: 24px;
      }
    }
    &:hover {
      .swiper-button-prev,
      .swiper-button-next {
        opacity: 100%;
      }
    }
  }
}
</style>
