import request from '@/utils/request'
import api from '@/config/api.conf'
import type {
  ScheduleRuleResponseData,
  ScheduleRuleDetailResponseData
} from './type'

// 获取可预约的排版数据
export const getBookingScheduleRule = (
  page: number,
  limit: number,
  hoscode: string,
  depcode: string
) =>
  request.get<any, ScheduleRuleResponseData>(
    api.appointment.getBookingScheduleRule +
      `/${page}/${limit}/${hoscode}/${depcode}`
  )

// 获取预约排班详情
export const getFindScheduleList = (
  hoscode: string,
  depcode: string,
  workDate: string
) =>
  request.get<any, ScheduleRuleDetailResponseData>(
    api.appointment.findScheduleList + `/${hoscode}/${depcode}/${workDate}`
  )
