import request from '@/utils/request'
import api from '@/config/api.conf'
import type {
  HospitalResponseData,
  LevelAndRegionResponseData,
  HospitalByHosnameData,
  HospitalDetailResponseData,
  DepartmentDetailResponseData
} from './type'

// 获取医院列表
export const queryPatients = (
  page: number,
  limit: number,
  params: object = { hostype: '', districtCode: '' }
) =>
  request.get<any, HospitalResponseData>(api.home.query + `${page}/${limit}`, {
    params
  })

// 获取医院的等级/区域数据
export const levelAndRegionPatients = (dictCode: string) =>
  request.get<any, LevelAndRegionResponseData>(
    api.home.levelAndRegion + dictCode
  )

// 根据医院名次获取医院列表
export const queryByHosname = (hosname: string = '') =>
  request.get<any, HospitalByHosnameData>(api.home.queryByHosname + hosname)

// 根据code获取医院详情
export const hospitalDetail = (hoscode: string = '') =>
  request.get<any, HospitalDetailResponseData>(
    api.home.hospitalDetail + hoscode
  )

// 根据code获取科室列表
export const hospitalDepartment = (hoscode: string = '') =>
  request.get<any, DepartmentDetailResponseData>(
    api.home.hospitalDepartment + hoscode
  )
