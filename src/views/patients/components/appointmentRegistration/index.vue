<template>
  <div class="app-reg-container">
    <header>
      <h1>{{ detailData.hospital?.hosname }}</h1>
      <div class="level">
        <el-icon><Histogram /></el-icon>
        <span>{{ detailData.hospital?.param?.hostypeString }}</span>
      </div>
    </header>
    <main>
      <el-image
        class="desc-image"
        style="width: 50px; height: 50px"
        :src="`data:image/png;base64,${detailData.hospital?.logoData}`"
        fit="cover"
      />
      <div class="reg-detial">
        <h2>挂号规则</h2>
        <ul class="reg-rules">
          <li class="reg-rule-item">
            <label>预约周期：</label>
            <span>{{ detailData.bookingRule?.cycle }}天</span>
          </li>
          <li class="reg-rule-item">
            <label>放号时间：</label>
            <span>{{ detailData.bookingRule?.releaseTime }}</span>
          </li>
          <li class="reg-rule-item">
            <label>停挂时间：</label>
            <span>{{ detailData.bookingRule?.stopTime }}</span>
          </li>
          <li class="reg-rule-item">
            <label>退号时间：</label>
            <span
              >就诊前一个工作日的{{
                detailData.bookingRule?.quitTime
              }}前取消</span
            >
          </li>
        </ul>
        <div>
          <h2>医院预约规则</h2>
          <ul class="hospital-rules">
            <li
              class="hospital-rule-item"
              v-for="(rule, idx) in detailData.bookingRule?.rule"
              :key="rule"
            >
              <span class="rule-num">{{ idx + 1 }}.</span>
              {{ rule }}
            </li>
          </ul>
        </div>
      </div>
    </main>
    <footer>
      <div class="footer-title">选择科室</div>
      <div class="footer-content" v-if="unitData.length">
        <div class="footer-left">
          <el-affix target=".footer-left" :offset="100">
            <ul class="footer-department">
              <li
                class="footer-department-item"
                v-for="(item, index) in unitData"
                :key="item.depcode"
                :class="{ 'is-active': index === activeIndex }"
                @click="unitClick(index, item.depcode)"
              >
                {{ item.depname }}
              </li>
            </ul>
          </el-affix>
        </div>
        <div class="footer-right">
          <ul class="footer-dep-detail">
            <li
              class="footer-dep-detail-item"
              v-for="item in unitData"
              :key="item.depcode"
              :class="`dep-${item.depcode}`"
            >
              <span>{{ item.depname }}</span>
              <ul class="detail-list">
                <li
                  class="detail-item"
                  v-for="cItem in item.children"
                  :key="item.depcode"
                >
                  {{ cItem.depname }}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <el-empty v-else description="目前没有符合条件的科室" />
    </footer>
  </div>
</template>

<script setup lang="ts" name="AppointmentRegistration">
import { Histogram } from '@element-plus/icons-vue'
import { ref } from 'vue'
const { detailData, unitData } = defineProps(['detailData', 'unitData'])
let activeIndex = ref(0)
const unitClick = (index: number, depcode: string) => {
  activeIndex.value = index
  // 获取对应的元素
  const targetElement = document.querySelector(`.dep-${depcode}`)
  if (targetElement) {
    // 计算目标元素的位置并滚动
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style lang="less" scoped>
.app-reg-container {
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
    display: flex;
    margin-top: 57px;
    .desc-image {
      border-radius: 50%;
    }
    .reg-detial {
      margin-left: 40px;
      h2 {
        font-size: 16px;
      }
      .reg-rules {
        font-family: TenCentSans-W3;
        font-size: 14px;
        margin: 20px 0;
        display: flex;
        flex-wrap: wrap; /* 允许换行 */
        .reg-rule-item {
          line-height: 30px;
          width: 200px;
          label {
            color: var(--p-default-color);
          }
          span {
            font-weight: bold;
          }
          &:last-child {
            flex-basis: 100%; /* 占满整行 */
          }
        }
      }
      .hospital-rules {
        font-family: TenCentSans-W3;
        font-size: 14px;
        margin: 10px 0;
        .hospital-rule-item {
          line-height: 30px;
          color: var(--p-default-color);
          .rule-num {
            display: inline-block;
            width: 10px;
          }
        }
      }
    }
  }
  footer {
    margin-top: 60px;
    .footer-content {
      display: flex;
      margin-top: 20px;
      width: 100%;
      height: 500px;
      .footer-left {
        width: 200px;
        text-align: center;
        background-color: var(--p-check-bg-color);
        padding: 10px 0;
        margin-right: 40px;
        .footer-department-item {
          padding: 0 20px;
          line-height: 40px;
          font-size: 14px;
          cursor: pointer;
          &.is-active {
            color: var(--p-check-color);
            background-color: var(--bg-color);
          }
          &:hover {
            color: var(--p-check-color);
            background-color: var(--bg-color);
          }
        }
      }
      .footer-right {
        padding-right: 30px;
        flex: 1;
        height: 100%;
        overflow: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        .footer-dep-detail {
          .footer-dep-detail-item {
            margin-bottom: 40px;
            padding: 20px 0 20px 30px;
            background-color: var(--p-unit-bg-color);
            border-radius: 4px;
            width: 100%;
            transition: all 2s ease;
            &:last-child {
              margin-bottom: 0;
            }
            span {
              position: relative;
              margin-left: 10px;
              &::before {
                position: absolute;
                top: 50%;
                left: -10px;
                content: '';
                width: 4px;
                height: 15px;
                border-radius: 10px;
                background-color: var(--p-text-color);
                transform: translate3d(0, -35%, 0);
              }
            }
            .detail-list {
              margin-top: 20px;
              display: grid;
              grid-template-columns: auto auto auto;
              grid-gap: 10px;
              font-family: TencentSans-W3;
              .detail-item {
                min-width: 200px;
                line-height: 18px;
                margin-top: 10px;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
