<template>
  <div class="register-container">
    <header>
      <span class="hospital">北京人民医院</span>
      <span class="line"></span>
      <span>科室</span>
    </header>
    <main>
      <h2>多发性硬化专科门诊</h2>
      <section class="section-container">
        <span class="date">2024年10月</span>
        <ul class="register-list">
          <li
            class="register-item"
            v-for="(item, index) in 7"
            :key="item"
            :class="{
              'is-active': index === isActive,
              gray: item === 7
            }"
            @click="handleRegister(index)"
          >
            <div class="item-title">
              <span>2024-10-23</span>
              <span>周三</span>
            </div>
            <div class="item-footer">停止挂号</div>
          </li>
        </ul>
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </section>
    </main>
    <!-- 具体号源 -->
    <footer>
      <aside class="footer-container" v-for="item in 2" :key="item">
        <div class="title">上午号源</div>
        <div class="doctor-info-container" v-for="doctor in 3" :key="doctor">
          <div class="doctor">
            <div class="doctor-info">
              <span>主任医师</span>
              <span class="doctor-name">王医生</span>
            </div>
            <span class="doctor-desc">
              骨质疏松和骨代谢疾病、糖尿病、甲状腺疾病。
            </span>
          </div>
          <div class="remaining">
            <span class="fee">¥ 9w</span>
            <el-button class="slots" type="primary"> 剩余 2000 </el-button>
          </div>
        </div>
      </aside>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route)
const currentPage = ref(1)
const pageSize = ref(7)
const total = ref(10)
let isActive = ref(0)
const handleSizeChange = (size: number) => {
  pageSize.value = size
}
const handleCurrentChange = (page: number) => {
  currentPage.value = page
}
const handleRegister = (index: number) => {
  console.log(index)
  isActive.value = index
}
</script>

<style lang="less" scoped>
.register-container {
  font-family: TencentSans-W3;
  font-size: 14px;
  header {
    color: var(--p-register-title-color);
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    .hospital {
      cursor: pointer;
    }
    .line {
      display: inline-block;
      margin: 3px 10px 0;
      width: 1px;
      height: 14px;
      background-color: var(--p-register-line-color);
    }
  }
  main {
    h2 {
      font-family: TencentSans-W7;
      font-size: 16px;
    }
    .section-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
      .date {
        color: var(--p-register-date-color);
        margin-bottom: 10px;
      }
      .register-list {
        margin: 20px 0;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 16px;
        li {
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 4px;
          cursor: pointer;
          color: #3c62b0;
          .item-title,
          .item-footer {
            width: 100%;
            border: 1px solid var(--p-register-selected-color);
          }
          .item-title {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 10px 0;
            border-radius: 4px 4px 0 0;
            background-color: var(--p-register-selected-color);
          }
          .item-footer {
            border-radius: 0 0 4px 4px;
            padding: 13px 0 15px;
            text-align: center;
            color: var(--p-text-color);
          }
          &.gray {
            color: var(--p-register-gray-color);
            .item-title {
              border-color: var(--p-register-gray-bg-color);
              background-color: var(--p-register-gray-bg-color);
            }
            .item-footer {
              color: var(--p-register-gray-color);
              border-color: var(--p-register-gray-bg-color);
            }
          }
          &:last-child {
            margin-right: 1px;
          }
          &.is-active {
            .item-title {
              background-color: #4562ab;
              border-color: var(--p-text-color);
              color: #fff;
              border-bottom: none;
            }
            .item-footer {
              color: var(--p-text-color);
              border-color: var(--p-text-color);
              font-family: TencentSans-W7;
            }
            &.gray {
              .item-title {
                border-color: var(--p-register-gray-selected-bg-color);
                background-color: var(--p-register-gray-selected-bg-color);
              }
              .item-footer {
                color: var(--p-register-gray-color);
                border-color: var(--p-register-gray-selected-bg-color);
              }
            }
          }
        }
      }
    }
  }
  footer {
    .footer-container {
      margin-top: 20px;
      .title {
        margin-bottom: 40px;
        padding-left: 10px;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate3d(0, -35%, 0);
          width: 3px;
          height: 14px;
          background-color: var(--p-text-color);
          border-radius: 5px;
        }
      }
      .doctor-info-container {
        margin-bottom: 40px;
        display: flex;
        justify-content: space-between;
        padding-right: 1px;
        .doctor-info {
          margin-bottom: 25px;
          font-family: TencentSans-W7;
          .doctor-name {
            margin-left: 15px;
            position: relative;
            &::before {
              content: '';
              position: absolute;
              left: -8px;
              top: 25%;
              width: 1px;
              height: 14px;
              border-radius: 10px;
              background-color: var(--p-register-line-color);
            }
          }
        }
        .doctor-desc {
          color: var(--p-gray-color);
        }
        .remaining {
          display: flex;
          align-items: center;
          .fee {
            margin-right: 20px;
            color: var(--p-text-color);
            font-family: TencentSans-W7;
          }
          .slots {
            height: 40px;
            padding: 15px 20px;
          }
        }
      }
    }
  }
}
</style>
