<template>
  <div class="register-container">
    <header>
      <span class="hospital" @click="toDetail">{{ detail.hosname }}</span>
      <span class="line"></span>
      <span class="department">{{ detail.bigname }}</span>
      <span>{{ detail.releaseTime }} - {{ detail.stopTime }}</span>
    </header>
    <main>
      <h2>{{ detail.depname }}</h2>
      <section class="section-container">
        <span class="date">{{ detail.workDateString }}</span>
        <ul class="register-list">
          <li
            class="register-item"
            v-for="(item, index) in scheduleList"
            :key="index"
            :class="{
              'is-active': index === isActive,
              gray: item.availableNumber === -1
            }"
            @click="handleRegister(index, item)"
          >
            <div class="item-title">
              <span>{{ item.workDate }}</span>
              <span>{{ item.dayOfWeek }}</span>
            </div>
            <div class="item-footer">{{ setText(item) }}</div>
          </li>
        </ul>
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </section>
    </main>
    <!-- 具体号源 -->
    <footer>
      <aside
        v-if="Object.keys(aboutToRelease).length"
        class="countdown-container"
      >
        <span class="title">
          明天
          <span>{{ detail.releaseTime }}</span>
          放号
        </span>
        <!-- 倒计时 -->
        <div v-if="countdownDate" class="countdown">
          <span class="countdown-text"> 距离放号时间： </span>
          <Countdown :endTime="countdownDate" class="countdown-date" />
        </div>
      </aside>
      <section v-else>
        <aside class="footer-container" v-for="item in doctorList" :key="item">
          <div class="title">{{ item.morning ? '上午号源' : '下午号源' }}</div>
          <div v-if="item.data.length">
            <div
              class="doctor-info-container"
              v-for="doc in item.data"
              :key="doc.id"
            >
              <div class="doctor">
                <div class="doctor-info">
                  <span>{{ doc.title }}</span>
                  <span class="doctor-name">{{ doc.docname }}</span>
                </div>
                <span class="doctor-desc">
                  {{ doc.skill }}
                </span>
              </div>
              <div class="remaining">
                <span class="fee">¥ {{ doc.amount }}</span>
                <el-button
                  class="slots"
                  type="primary"
                  @click="toSetPatient(doc)"
                >
                  剩余 {{ doc.availableNumber }}
                </el-button>
              </div>
            </div>
          </div>
          <el-empty v-else description="号约完咯，下次早点来～" />
        </aside>
      </section>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  getBookingScheduleRule,
  getFindScheduleList
} from '@/services/appointment'
import type {
  ScheduleRuleResponseData,
  BookingSchedule,
  BaseMap,
  ScheduleRuleDetailResponseData,
  ScheduleRuleDetailList
} from '@/services/type'
import dayjs from 'dayjs'
import Countdown from '@/components/countdown/index.vue'
const route = useRoute()
const router = useRouter()
const currentPage = ref(1)
const pageSize = ref(7)
let total = ref(0)
let isActive = ref(0)
let scheduleList = reactive(<BookingSchedule[]>[])
let detail = reactive(<BaseMap>{})
let doctorList = reactive(<any>[])
let aboutToRelease = ref(<BookingSchedule>{})
let countdownDate = ref('')
const { hoscode, depcode } = route.query
// 确保 hoscode 和 depcode 是字符串类型，并设置默认值为一个空字符串
const finalHoscode = typeof hoscode === 'string' ? hoscode : ''
const finalDepcode = typeof depcode === 'string' ? depcode : ''
const today = dayjs()

onMounted(() => {
  getBookingScheduleList()
})

/**
 * 处理当前页码变化的函数。
 * 当页码改变时，更新当前页码并重新获取预约日程列表。
 * @param page {number} 新的页码
 */
const handleCurrentChange = (page: number) => {
  currentPage.value = page
  getBookingScheduleList()
}
/**
 * 处理预约注册的函数。
 * @param {number} index - 预约项的索引。
 * @param {BookingSchedule} item - 预约项的详细信息。
 * 该函数用于设置当前激活的预约项索引。
 */
const handleRegister = (index: number, item: BookingSchedule) => {
  countdownDate.value = ''
  isActive.value = index
  if (item.availableNumber === -1 && item.status === 1) {
    // 即将放号
    aboutToRelease.value = item
    countdownDate.value = getCountDownDate(
      detail.workDateString,
      detail.releaseTime
    )
    return
  }
  aboutToRelease.value = <BookingSchedule>{}
  getScheduleList(item.workDate)
}

const getCountDownDate = (dateString: string, releaseTime: string) => {
  const regex = /(\d{4})年(\d{1,2})月/ // 匹配年份和月份的正则表达式
  const match = dateString.match(regex)
  let str = ''
  if (match) {
    const year = match[1] // 匹配的年份
    const month = match[2] // 匹配的月份
    const day = today.add(1, 'day').date()
    str = `${year}-${month}-${day} ${releaseTime}`
  } else {
    console.log('未匹配到有效日期')
  }
  return str
}

/**
 * 获取预约排班列表
 * @async
 * @function getBookingScheduleList
 * @description 该函数用于获取预约排班列表，根据路由查询参数hoscode和depcode，以及当前页码和每页限制数量来请求数据。
 * @returns {Promise<void>} 返回一个Promise，解析时更新排班列表、基础信息和总数量。
 */
const getBookingScheduleList = async () => {
  const page = currentPage.value
  const limit = pageSize.value

  const { data }: ScheduleRuleResponseData = await getBookingScheduleRule(
    page,
    limit,
    finalHoscode,
    finalDepcode
  )
  const { bookingScheduleList, baseMap, total: totalNum } = data
  total.value = totalNum
  scheduleList.splice(0, scheduleList.length, ...bookingScheduleList)
  detail = baseMap
  // 获取第一个日期的预约安排列表
  getScheduleList(bookingScheduleList[0].workDate)
}
/**
 * 根据预约安排项的状态和可预约数量生成相应的文本描述。
 * @param {BookingSchedule} item - 预约安排项对象
 * @returns {string} - 描述文本
 */
const setText = (item: BookingSchedule) => {
  const { availableNumber, status } = item
  let str = `有号(${availableNumber})`
  if (availableNumber === -1) {
    str = status === 1 ? '即将放号' : '无号'
  } else if (status === -1) {
    str = '停止挂号'
  }
  return str
}
/**
 * 获取指定工作日的排班列表，并根据工作时间分类。
 * @param workDate - 工作日期字符串。
 * @returns Promise，解析为分类后的排班数据。
 */
const getScheduleList = async (workDate: string) => {
  const { data }: ScheduleRuleDetailResponseData = await getFindScheduleList(
    finalHoscode,
    finalDepcode,
    workDate
  )
  // 使用 reduce 方法进行分类
  const categorizedData = data.reduce(
    (acc, item) => {
      // 根据 workTime 分类
      if (item.workTime === 0) {
        acc.morning.push(item)
      } else if (item.workTime === 1) {
        acc.afternoon.push(item)
      }
      return acc
    },
    {
      morning: <ScheduleRuleDetailList>[],
      afternoon: <ScheduleRuleDetailList>[]
    }
  )
  doctorList.splice(
    0,
    doctorList.length,
    ...[
      { morning: true, data: categorizedData.morning },
      { after: true, data: categorizedData.afternoon }
    ]
  )
  console.log(doctorList)
}
// 点击顶部的医院名称，返回科室选择页面
const toDetail = () => {
  router.push({
    path: '/patients/appointmentRegistration',
    query: { hoscode: finalHoscode }
  })
}
const toSetPatient = (item: any) => {
  router.push({ path: '/patients/booking', query: { scheduleId: item.id } })
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
      &:hover {
        color: var(--p-text-color);
      }
    }
    .line {
      display: inline-block;
      margin: 3px 10px 0;
      width: 1px;
      height: 14px;
      background-color: var(--p-register-line-color);
    }
    .department {
      margin-right: 20px;
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
            width: 100px;
            height: 40px;
            padding: 15px 20px;
          }
        }
      }
      .el-empty {
        padding: 2px 0;
      }
    }
    .countdown-container {
      display: flex;
      align-items: center;
      flex-direction: column;
      .title {
        span {
          color: var(--p-text-color);
        }
      }
      .countdown {
        margin: 20px;
        display: flex;
        align-items: center;
        .countdown-text {
          margin-top: 5px;
          font-size: 20px;
        }
        .countdown-date {
          color: var(--p-text-color);
          font-size: 50px;
        }
      }
    }
  }
}
</style>
