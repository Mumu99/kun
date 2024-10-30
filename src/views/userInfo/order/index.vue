<template>
  <div class="order-container">
    <h1>挂号订单</h1>
    <!-- 头部搜索 -->
    <nav>
      <el-row :gutter="24">
        <el-col :span="8">
          <label>就诊人：</label>
          <el-select
            v-model="searchInfo.patientId"
            placeholder="选择就诊人"
            clearable
          >
            <el-option
              v-for="item in patientList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <label>订单状态：</label>
          <el-select
            v-model="searchInfo.orderStatus"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in statusList"
              :key="item.status"
              :label="item.comment"
              :value="item.status"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="search">查询</el-button>
        </el-col>
      </el-row>
    </nav>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :header-cell-style="{
        background: '#f5f7f9',
        color: '#333',
        fontWeight: '400'
      }"
      :fit="true"
      class="order-table"
    >
      <template v-for="item in tableColumn">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width || 'auto'"
          :min-width="item.minWidth || '150px'"
        >
          <template v-if="item.slot" #default="scope">
            <div v-if="item.slot === 'reserveDate'">
              <span>
                {{ scope.row[item.prop] }}
              </span>
              <span class="reserve-time">
                {{ scope.row.reserveTime ? '下午' : '上午' }}
              </span>
            </div>
            <div
              v-if="item.slot === 'status'"
              :class="setClass(scope.row.param.orderStatusString)"
            >
              <el-tag
                :type="setClass(scope.row.param.orderStatusString) || 'info'"
              >
                {{ scope.row.param.orderStatusString }}
              </el-tag>
            </div>
            <div v-if="item.slot === 'action'">
              <el-link
                type="primary"
                @click="toDetail(scope.row)"
                :underline="false"
              >
                详情
              </el-link>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      class="order-pagination"
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts" name="order">
import { onMounted, reactive, ref } from 'vue'
import { findAll } from '@/services/appointment'
import { getStatusList, getOrderList } from '@/services/order'
import { useRoute, useRouter } from 'vue-router'
import type {
  PatientInfoResponseData,
  OrderStatusSelectResponseData,
  OrderStatusSelectData,
  OrderListResponseData,
  OrderListItem
} from '@/services/type'
const route = useRoute()
const router = useRouter()
let total = ref(0)
let pageIndex = ref(1)
const searchInfo = reactive({
  patientId: '',
  orderStatus: ''
})
let patientList = reactive(<any>[])
let statusList = reactive(<OrderStatusSelectData[]>[])
let tableData = reactive(<OrderListItem[]>[])
const tableColumn = [
  {
    prop: 'reserveDate',
    slot: 'reserveDate',
    label: '就诊时间',
    minWidth: 140
  },
  {
    prop: 'hosname',
    label: '医院',
    minWidth: 130
  },
  {
    prop: 'depname',
    label: '科室',
    minWidth: 150
  },
  {
    prop: 'title',
    label: '医生',
    minWidth: 100
  },
  {
    prop: 'amount',
    label: '医疗服务费',
    minWidth: 100
  },
  {
    prop: 'patientName',
    label: '就诊人',
    minWidth: 100
  },
  {
    prop: 'status',
    label: '订单状态',
    slot: 'status',
    minWidth: 150
  },
  {
    prop: '',
    slot: 'action',
    label: '操作',
    width: 130
  }
]
onMounted(() => {
  if (route.name === 'order') {
    getSelectAll()
    getDataList()
  }
})
const search = () => {
  getDataList()
}
/**
 * 设置订单状态的class
 * @param param {Object} 订单信息
 * 0 预约成功，待支付
 * 1 已支付
 * 2 已取号
 * -1 取消预约
 */
const setClass = (orderStatusString: string) => {
  const status = statusList.find(
    item => item.comment === orderStatusString
  )?.status
  switch (status) {
    case 0:
      return 'warning'
    case 1:
      return 'success'
    case 2:
      return 'primary'
    case -1:
      return 'danger'
    default:
      return ''
  }
}
// 分页器点击事件
const handleCurrentChange = (currentPage: number) => {
  pageIndex.value = currentPage
  search()
}
// 获取分页数据
const getDataList = async () => {
  try {
    const { data, code }: OrderListResponseData = await getOrderList(
      pageIndex.value,
      10,
      searchInfo
    )
    if (code === 200) {
      const { records, total: t } = data
      tableData.splice(0, tableData.length, ...records)
      total.value = t
    }
  } catch (error) {}
}
// 获取就诊人列表和订单状态列表
const getSelectAll = async () => {
  try {
    const resultFind: PatientInfoResponseData = await findAll()
    const resultStatus: OrderStatusSelectResponseData = await getStatusList()
    if (resultFind.code === 200) {
      const resultList = resultFind.data.map(item => {
        return {
          value: item.id,
          label: `${item.name}【${item.contactsCertificatesNo}】`
        }
      })
      patientList.splice(0, patientList.length, ...resultList)
    }
    if (resultStatus.code === 200) {
      statusList.splice(0, statusList.length, ...resultStatus.data)
    }
  } catch (error) {
    console.log(error)
  }
}
const toDetail = (row: OrderListItem) => {
  console.log(row, route.path)
  router.push({ path: `${route.path}/detail`, query: { orderId: row.id } })
}
</script>

<style lang="less" scoped>
.order-container {
  font-family: TencentSans-W3;
  h1 {
    font-family: TencentSans-W7;
    font-size: 20px;
  }
  nav {
    margin: 30px 0;
    :deep(.el-row .el-col) {
      display: flex;
      align-items: center;
      label {
        min-width: 100px;
      }
      .el-select .el-select__wrapper {
        border-radius: 0;
        box-shadow: none;
        border-bottom: 1px solid var(--p-login-border-color);
      }
      .el-button {
        width: 90px;
        height: 36px;
        display: flex;
      }
      &:last-child {
        justify-content: flex-end;
      }
    }
  }
  :deep(.el-table__body-wrapper .el-table__cell) {
    padding: 15px 0;
    .el-tag .el-tag__content {
      margin-top: -2px;
    }
    .reserve-time {
      margin-left: 5px;
    }
  }
  :deep(.el-pagination) {
    margin: 30px 0 50px;
    display: flex;
    justify-content: center;
  }
}
</style>
