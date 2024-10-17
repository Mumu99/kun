// 定义 ts 类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 已有医院数据的类型
export interface Hospital {
  id: string
  createTime: string
  updateTime: string
  isDeleted: number
  param: {
    hostypeString: string
    fullAddress: string
  }
  hoscode: string
  hosname: string
  hostype: string
  provinceCode: string
  cityCode: string
  districtCode: string
  address: string
  logoData: string
  intro: string
  route: string
  status: number
  bookingRule: {
    cycle: number
    releaseTime: string
    stopTime: string
    quitDay: number
    quitTime: string
    rule: string[]
  }
}

// 存储全部已有医院数据的ts类型
export type Content = Hospital[]

// 获取已有医院返回的数据ts类型
export interface HospitalResponseData extends ResponseData {
  data: {
    content: Content
    pageable: {
      sort: {
        sorted: boolean
        unsorted: boolean
        empty: boolean
      }
      pageNumber: number
      pageSize: number
      offset: number
      paged: boolean
      unpaged: boolean
    }
    totalPages: number
    totalElements: number
    last: boolean
    first: boolean
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
    numberOfElements: number
    size: number
    number: number
    empty: boolean
  }
}

// 医院等级/区域的接口
export interface LevelAndRegion {
  createTime: string
  dictCode: string
  hasChildren: boolean
  id: number
  isDeleted: number
  name: string
  param: {}
  parentId: number
  updateTime: string
  value: string
}
export type LevelAndRegionArr = LevelAndRegion[]

// 获取医院等级/区域的返回数据类型
export interface LevelAndRegionResponseData extends ResponseData {
  data: LevelAndRegionArr
}

// 医院名称获取医院列表
export interface HospitalByHosnameData extends ResponseData {
  data: Content
}

// # 地区/等级传递给父级参数的类型
export interface ParentLevelAndRegion {
  value: string
  type: string
}
