<template>
  <div class="edit-user-info-container">
    <section>
      <el-row :gutter="14">
        <el-col :span="6">
          <el-card class="user-card">
            <el-skeleton :rows="1" animated v-if="showSkeleton">
              <template #template>
                <el-skeleton-item variant="image" />
                <div class="skeleton-content">
                  <el-skeleton-item variant="text" />
                  <el-skeleton-item variant="text" />
                </div>
              </template>
            </el-skeleton>
            <div class="card-content" v-else>
              <div class="left">
                <Svg-icon name="user" class="icon" color="#6bc6c5" />
              </div>
              <div class="right">
                <div class="title">新增用户</div>
                <el-statistic :value="userValue"> </el-statistic>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="user-card">
            <el-skeleton :rows="1" animated v-if="showSkeleton">
              <template #template>
                <el-skeleton-item variant="image" />
                <div class="skeleton-content">
                  <el-skeleton-item variant="text" />
                  <el-skeleton-item variant="text" />
                </div>
              </template>
            </el-skeleton>
            <div class="card-content" v-else>
              <div class="left">
                <Svg-icon name="message" class="icon" color="#58a2f1" />
              </div>
              <div class="right">
                <div class="title">未读消息</div>
                <el-statistic :value="msgValue"> </el-statistic>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="user-card">
            <el-skeleton :rows="1" animated v-if="showSkeleton">
              <template #template>
                <el-skeleton-item variant="image" />
                <div class="skeleton-content">
                  <el-skeleton-item variant="text" />
                  <el-skeleton-item variant="text" />
                </div>
              </template>
            </el-skeleton>
            <div class="card-content" v-else>
              <div class="left">
                <Svg-icon name="waitPations" class="icon" color="#6bc6c5" />
              </div>
              <div class="right">
                <div class="title">待就诊人数</div>
                <el-statistic :value="watiValue"> </el-statistic>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="user-card">
            <el-skeleton :rows="1" animated v-if="showSkeleton">
              <template #template>
                <el-skeleton-item variant="image" />
                <div class="skeleton-content">
                  <el-skeleton-item variant="text" />
                  <el-skeleton-item variant="text" />
                </div>
              </template>
            </el-skeleton>
            <div class="card-content" v-else>
              <div class="left">
                <Svg-icon name="registration" class="icon" color="#6bc6c5" />
              </div>
              <div class="right">
                <div class="title">今日挂号总数</div>
                <el-statistic :value="regValue"> </el-statistic>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </section>
    <section class="chart-container-section">
      <el-row :gutter="14">
        <el-col :span="10">
          <el-skeleton :rows="14" animated v-if="showSkeleton" />
          <el-card v-else>
            <div ref="trafficSource" class="chart-container-item"></div>
          </el-card>
        </el-col>
        <el-col :span="14">
          <el-skeleton :rows="14" animated v-if="showSkeleton" />
          <el-card v-else>
            <div ref="active" class="chart-container-item"></div>
          </el-card>
        </el-col>
        <el-col :span="24" class="chart-container-item-mon-col">
          <el-card>
            <div
              ref="mon"
              class="chart-container-item chart-container-item-mon"
            ></div>
          </el-card>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts/core'
import {
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TitleComponent
} from 'echarts/components'
import { LineChart, PieChart, BarChart } from 'echarts/charts'
import { UniversalTransition, LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  PieChart,
  CanvasRenderer,
  UniversalTransition,
  LabelLayout,
  BarChart,
  ToolboxComponent,
  TitleComponent
])
import { useTransition } from '@vueuse/core'
const trafficSource = ref<HTMLElement | null>(null) // 用于引用 chart 容器
const active = ref<HTMLElement | null>(null) // 用于引用 chart 容器
const mon = ref<HTMLElement | null>(null) // 用于引用 chart 容器
const showSkeleton = ref(true)
const userSource = ref(0)
const userValue = useTransition(userSource, {
  duration: 1500
})
userSource.value = 172000
const msgSource = ref(0)
const msgValue = useTransition(msgSource, {
  duration: 1500
})
msgSource.value = 2000
const waitSource = ref(0)
const watiValue = useTransition(waitSource, {
  duration: 1500
})
waitSource.value = 5200
const regSource = ref(0)
const regValue = useTransition(regSource, {
  duration: 1500
})
regSource.value = 6666
let myChart: echarts.ECharts | null = null // echarts实例
const setChart = () => {
  if (!trafficSource.value) return
  // 初始化 ECharts 实例
  myChart = echarts.init(trafficSource.value)
  // 配置图表的选项
  const options = {
    title: {
      text: '用户挂号来源',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '用户挂号来源',
        type: 'pie',
        radius: '50%',
        center: ['50%', '50%'],
        data: [
          { value: 1048, name: '官网' },
          { value: 200, name: '丁香医生' },
          { value: 580, name: '微信公众号' },
          { value: 484, name: '支付宝小程序' },
          { value: 1909, name: '抖音小程序' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  // 使用刚定义的配置项显示图表
  myChart.setOption(options)
  const handleResize = () => {
    myChart && myChart.resize()
  }
  window.addEventListener('resize', handleResize)
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    myChart && myChart.dispose()
  })
}
// 活跃量图表
let activeChart: echarts.ECharts | null = null
const setActiveChart = () => {
  if (!active.value) return
  // 初始化 ECharts 实例
  activeChart = echarts.init(active.value)
  const labelOption = {
    show: true,
    position: 'top',
    distance: 10,
    align: 'left',
    verticalAlign: 'middle',
    rotate: 90,
    formatter: '{c} {name|{a}}',
    fontSize: 14,
    rich: {
      name: {}
    }
  }
  const option = {
    title: {
      text: '每周挂号量',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      show: false,
      data: ['官网', '丁香医生', '微信公众号', '支付宝小程序', '抖音小程序']
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: {
          show: true,
          readOnly: false,
          title: '数据视图',
          lang: ['数据视图', '关闭', '刷新']
        },
        magicType: {
          show: true,
          type: ['line', 'bar', 'stack'],
          title: { line: '折线图', bar: '柱状图', stack: '堆叠' }
        },
        restore: { show: true, title: '还原' },
        saveAsImage: { show: true, title: '保存为图片' }
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '官网',
        type: 'bar',
        barGap: 0,
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390, 520, 695]
      },
      {
        name: '丁香医生',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 400, 331]
      },
      {
        name: '微信公众号',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 300, 839]
      },
      {
        name: '支付宝小程序',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [98, 77, 101, 99, 40, 30, 10]
      },
      {
        name: '抖音小程序',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [98, 77, 101, 99, 40, 60, 40]
      }
    ]
  }

  option && activeChart.setOption(option)
  const handleResize = () => {
    activeChart && activeChart.resize()
  }
  window.addEventListener('resize', handleResize)
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    activeChart && activeChart.dispose()
  })
}

// 每月销售额
let monChart: echarts.ECharts | null = null
const setMonChart = () => {
  if (!mon.value) return
  // 初始化 ECharts 实例
  monChart = echarts.init(mon.value)
  let option = {
    title: {
      text: '每月挂号量',
      left: 'center'
    },
    legend: {
      orient: 'vertical', // 设置图例为垂直方向
      left: 'left', // 设置图例的位置在左侧
      top: 'top' // 设置图例在垂直方向的中心位置
    },
    tooltip: {
      trigger: 'axis',
      showContent: false
    },
    dataset: {
      source: [
        [
          'product',
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月'
        ],
        [
          '官网',
          51.5,
          32.1,
          81.7,
          30.1,
          73.4,
          85.1,
          93.2,
          78.4,
          98.3,
          72.2,
          90.5,
          90.2
        ],
        [
          '丁香医生',
          56.5,
          82.1,
          88.7,
          70.1,
          53.4,
          85.1,
          93.2,
          78.4,
          43.3,
          72.2,
          60.5,
          50.2
        ],
        [
          '微信公众号',
          51.1,
          51.4,
          55.1,
          53.3,
          73.8,
          68.7,
          73.1,
          69.5,
          39.6,
          67.2,
          58.3,
          48.9
        ],
        [
          '支付宝小程序',
          40.1,
          62.2,
          69.5,
          36.4,
          45.2,
          32.5,
          37.1,
          41.2,
          18,
          33.9,
          49.1,
          25.2
        ],
        [
          '抖音小程序',
          25.2,
          37.1,
          41.2,
          18,
          33.9,
          49.1,
          56.5,
          82.1,
          88.7,
          70.1,
          53.4,
          85.1
        ]
      ]
    },
    xAxis: { type: 'category' },
    yAxis: { gridIndex: 0 },
    grid: { top: '55%' },
    series: [
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'pie',
        id: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
        emphasis: {
          focus: 'self'
        },
        label: {
          formatter: '{b}: {@2012} ({d}%)'
        },
        encode: {
          itemName: 'product',
          value: '2012',
          tooltip: '2012'
        }
      }
    ]
  }

  monChart.on('updateAxisPointer', function (event: any) {
    const xAxisInfo = event.axesInfo[0]
    if (xAxisInfo) {
      const dimension = xAxisInfo.value + 1
      if (monChart) {
        monChart.setOption({
          series: {
            id: 'pie',
            label: {
              formatter: '{b}: {@[' + dimension + ']} ({d}%)'
            },
            encode: {
              value: dimension,
              tooltip: dimension
            }
          }
        })
      }
    }
  })

  monChart.setOption(option)
  option && monChart.setOption(option)
  const handleResize = () => {
    monChart && monChart.resize()
  }
  window.addEventListener('resize', handleResize)
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    monChart && monChart.dispose()
  })
}

onMounted(() => {
  setTimeout(() => {
    showSkeleton.value = false
    setTimeout(() => {
      setChart()
      setActiveChart()
      setMonChart()
    }, 100)
  }, 1500)
})
</script>

<style lang="less" scoped>
.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
.edit-user-info-container {
  font-family: TencentSans-W3;
  :deep(.user-card) {
    .el-card__body {
      .card-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .el-statistic {
          margin-top: 10px;
          text-align: right;
        }
        .title {
          text-align: right;
        }
      }
      .el-skeleton {
        display: flex;
        justify-content: space-between;
        .el-skeleton__image {
          width: 40px;
          height: 40px;
          border-radius: 4px;
        }
        .skeleton-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          height: 46px;
          .el-skeleton__item {
            width: 60px;
            height: 18px;
            &:last-child {
              width: 90px;
              height: 18px;
            }
          }
        }
      }
    }
  }
  :deep(.chart-container-section) {
    margin-top: 24px;
    .chart-container-item {
      width: 100%;
      height: 550px;
      &.chart-container-item-mon {
        height: 800px;
      }
    }
    .chart-container-item-mon-col {
      margin-top: 14px;
    }
  }
}
</style>
