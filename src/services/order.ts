import request from '@/utils/request'
import api from '@/config/api.conf'
import type {
  OrderStatusSelectResponseData,
  OrderListResponseData,
  OrderDetailResponseData,
  PayQrcodeResponseData
} from './type'

// 获取订单状态下拉框
export const getStatusList = () =>
  request.get<any, OrderStatusSelectResponseData>(api.order.getStatusList)
// 获取订单列表
export const getOrderList = (page: number, limit: number, params: any) =>
  request.get<any, OrderListResponseData>(
    api.order.getOrderList + `${page}/${limit}`,
    { params }
  )
// 获取订单详情
export const getOrderInfo = (id: string) =>
  request.get<any, OrderDetailResponseData>(api.order.getOrderInfo + id, {
    headers: {
      loading: false
    }
  })
// 取消预约
export const cancelOrder = (orderId: number) =>
  request.get<any, any>(api.order.cancelOrder + orderId)

// 生成二维码
export const createNative = (orderId: number) =>
  request.get<any, PayQrcodeResponseData>(api.order.createNative + orderId)
// 查询订单状态
export const queryPayStatus = (orderId: number) =>
  request.get<any, any>(api.order.queryPayStatus + orderId, {
    headers: {
      loading: false
    }
  })