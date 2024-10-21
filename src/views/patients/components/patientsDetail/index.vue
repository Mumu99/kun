<template>
  <div class="patients-detail-container">
    <header>
      <h1>{{ bullentinStore.bullentinDetail.hospital?.hosname }}</h1>
      <div class="level">
        <el-icon><Histogram /></el-icon>
        <span>
          {{ bullentinStore.bullentinDetail.hospital?.param?.hostypeString }}
        </span>
      </div>
    </header>
    <main>
      <div class="route-content">
        <el-image
          class="desc-image"
          style="width: 80px; height: 80px"
          :src="`data:image/png;base64,${bullentinStore.bullentinDetail.hospital?.logoData}`"
          fit="cover"
        />
        <div class="reg-detial">
          <div class="level">
            <el-icon><AddLocation /></el-icon>
            <span>
              {{ bullentinStore.bullentinDetail.hospital?.param?.fullAddress }}
            </span>
          </div>
          <div>
            <span>乘车路线：</span>
            <span>{{ bullentinStore.bullentinDetail.hospital?.route }}</span>
          </div>
        </div>
      </div>
      <div class="intro-content">
        <h2>医院介绍</h2>
        <span>{{ bullentinStore.bullentinDetail.hospital?.intro }}</span>
      </div>
      <div class="intro-content">
        <h2>具体地址</h2>
        <AMap :data="bullentinStore.bullentinDetail.hospital" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts" name="PatientsDetail">
import { useBullentinStore } from '@/store/bullentin'
import { Histogram, AddLocation } from '@element-plus/icons-vue'
import AMap from '@/components/Map/index.vue'
let bullentinStore = useBullentinStore()
</script>
<style lang="less" scoped>
.patients-detail-container {
  font-family: TenCentSans-W7;
  header {
    display: flex;
    align-items: flex-end;
    h1 {
      font-size: 20px;
      margin-bottom: 2.5px;
    }
    .level {
      display: flex;
      margin-left: 25px;
      font-size: 14px;
      color: var(--p-gray-color);
      .el-icon {
        margin-top: 2.5px;
        margin-right: 3px;
      }
    }
  }
  main {
    margin-top: 50px;
    .route-content {
      display: flex;
      .desc-image {
        min-width: 80px;
      }
      .reg-detial {
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .level {
          display: flex;
          align-items: center;
          .el-icon {
            margin-top: 3px;
            margin-right: 20px;
          }
        }
        span {
          font-family: TencentSans-W3;
          line-height: 20px;
        }
      }
    }
    .intro-content {
      margin-top: 20px;
      span {
        font-family: TencentSans-W3;
        display: inline-block;
        margin-top: 20px;
        line-height: 20px;
        text-indent: 2em;
      }
    }
  }
}
</style>
