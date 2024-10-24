<template>
  <el-card
    class="detail-card-container"
    shadow="hover"
    @click="goDetail(patientsData.hoscode)"
  >
    <div class="item-left">
      <div class="item-title">{{ patientsData.hosname }}</div>
      <div class="item-desc">
        <div class="region">
          <span class="icon">
            <SvgIcon name="level" class="cls__svg" :size="14"></SvgIcon>
          </span>
          <span>{{ patientsData.param.hostypeString }}</span>
        </div>
        <div class="date">
          <span class="icon">
            <svg
              t="1728979122436"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5287"
              width="200"
              height="200"
            >
              <path
                d="M512 864c194.4 0 352-157.6 352-352S706.4 160 512 160 160 317.6 160 512s157.6 352 352 352z m0 64C282.24 928 96 741.76 96 512S282.24 96 512 96s416 186.24 416 416-186.24 416-416 416z"
                fill="#636363"
                p-id="5288"
              ></path>
              <path
                d="M512 544h192a32 32 0 0 1 0 64h-224a32 32 0 0 1-32-32V288a32 32 0 0 1 64 0v256z"
                fill="#636363"
                p-id="5289"
              ></path>
            </svg>
          </span>
          <span
            >每天
            {{ patientsData.bookingRule?.releaseTime || '未知' }} 放号</span
          >
        </div>
      </div>
    </div>
    <el-image
      class="desc-image"
      style="width: 50px; height: 50px"
      :src="`data:image/png;base64, ${patientsData.logoData}`"
      fit="cover"
    />
  </el-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
defineProps(['patientsData'])

const goDetail = (hoscode: string) => {
  router.push({ path: '/patients/appointmentRegistration', query: { hoscode } })
}
</script>

<style lang="less" scoped>
.detail-card-container {
  :deep(.el-card__body) {
    display: grid;
    grid-template-columns: 9fr 1fr;
    font-family: TencentSans-W7;
    color: var(--p-title-color);
    cursor: pointer;
    .item-left {
      display: grid;
      align-content: stretch;
      .item-desc {
        display: grid;
        grid-template-columns: 1fr 1fr;
        font-family: TencentSans-W3;
        .region,
        .date {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: var(--p-gray-color);
          .icon {
            margin-top: 2px;
            .icon {
              width: 14px;
              height: 14px;
              cursor: pointer;
            }
          }
          span:first-child {
            margin-right: 5px;
          }
          .icon:first-child {
            margin-top: 4px;
          }
        }
      }
    }
    .desc-image {
      border-radius: 4px;
    }
  }
}
</style>
