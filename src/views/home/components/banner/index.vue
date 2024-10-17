<template>
  <div class="banner-container" v-if="bannerList.length > 3">
    <Swiper
      :modules="modules"
      :pagination="{ clickable: true }"
      :space-between="50"
      :loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      navigation
      class="banner-swiper"
    >
      <SwiperSlide
        v-for="item in bannerList"
        :key="item.src"
        class="bg-blueGray"
      >
        <img
          v-if="item.type === 'image'"
          class="banner-img"
          :src="item.src"
          alt=""
        />
        <h3 v-else class="banner-text" text="2xl" justify="center">
          {{ item.src }}
        </h3>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import banner1 from '@/assets/images/banner1.png'
// 导入Swiper样式
import 'swiper/css'
import 'swiper/less/navigation'
import 'swiper/less/pagination'
import 'swiper/less/autoplay'
import { reactive } from 'vue'
interface Banner {
  type: string
  src: string
}
const bannerList: Banner[] = reactive([{ type: 'image', src: banner1 }])
// https://api.uomg.com/api/rand.qinghua?format=json 随机一句话
// https://dog.ceo/api/breed/pembroke/images/random 随机宠物图片
const getBannerList = async () => {
  const { data } = await axios.get(
    'https://api.uomg.com/api/rand.qinghua?format=json'
  )
  bannerList.push({ type: 'text', src: data.content })
}
for (let i = 0; i < 3; i++) {
  getBannerList()
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
