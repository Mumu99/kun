<template>
  <div class="unit-detail-container">
    <section class="unit-detail-section unit-detail-section-header">
      <div class="section-title">
        <div class="left">
          <span>常见科室</span>
        </div>
        <div class="right">
          <span>全部</span>
          <el-icon :size="14" color="#666666">
            <ArrowRightBold />
          </el-icon>
        </div>
      </div>
      <ul class="section-list">
        <li class="title-item" v-for="unit in unitList" :key="unit">
          {{ unit }}
        </li>
      </ul>
    </section>
    <section
      class="unit-detail-section unit-detail-section-footer"
      v-for="item in bullentinList"
      :key="item.id"
    >
      <div class="section-title">
        <div class="left">
          <el-icon :size="item.size" :color="item.color">
            <Bell />
          </el-icon>
          <span>{{ item.title }}</span>
        </div>
        <div class="right">
          <span>全部</span>
          <el-icon :size="item.size" color="#666666">
            <ArrowRightBold />
          </el-icon>
        </div>
      </div>
      <ul class="section-list">
        <li class="title-item" v-for="title in item.titleList" :key="title">
          {{ title }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts" name="unitDetail">
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'
import { Bell, ArrowRightBold } from '@element-plus/icons-vue'
import { useBullentinStore } from '@/store/bullentin'
let unitList = ref<string[]>([])
let bullentinList = ref<any[]>([])
let titleList = ref<string[]>([])
const store = useBullentinStore()

watch(
  () => store.bullentinList,
  newVal => {
    bullentinList.value[0].titleList = newVal.map(item => item.src)
  },
  { deep: true }
)
onMounted(() => {
  for (let i = 0; i < 3; i++) {
    getList()
  }
})
const getList = async () => {
  const {
    data: { content: title }
  } = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
  titleList.value.push(title)
}
unitList.value = [
  '营养科',
  '骨伤科',
  '肾脏科',
  '精神科',
  '神经科',
  '心胸外科',
  '肝胆胰腺外科',
  '泌尿外科',
  '呼吸胸外科',
  '肿瘤内科',
  '骨科',
  '康复科',
  '急诊科',
  '麻醉科',
  '精神病科',
  '精神卫生中心'
]

bullentinList.value = [
  {
    id: 1,
    size: 14,
    color: '#4562ab',
    title: '平台公告',
    titleList: []
  },
  {
    id: 2,
    size: 14,
    color: '#4562ab',
    title: '停诊公告',
    titleList: titleList.value
  }
]
</script>

<style lang="less" scoped>
.unit-detail-container {
  .unit-detail-section {
    .section-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: TencentSans-W7;
      .left,
      .right {
        display: flex;
        align-items: center;
        .el-icon {
          margin-top: 3px;
          margin-right: 5px;
        }
      }
      .right {
        span {
          margin-right: 5px;
        }
      }
    }
    .section-list {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 10px;
      margin-top: 20px;
      font-family: TencentSans-W3;
      font-size: 14px;
    }
    margin-bottom: 30px;
  }
  .unit-detail-section-footer {
    .section-list {
      grid-template-columns: auto;
      line-height: 20px;
      li {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
