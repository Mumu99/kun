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

// 医院详情数据类型
export interface HospitalDetail {
  bookingRule: {
    cycle: number
    releaseTime: string
    stopTime: string
    quitDay: number
    quitTime: string
    rule: string[]
  }
  hospital: Hospital
}
// 医院详情返回数据类型
export interface HospitalDetailResponseData extends ResponseData {
  data: HospitalDetail
}

// 医院科室详情数据
export interface DepartmentDetail {
  depcode: string
  depname: string
  children: [] | null
}

// 存储全部科室数据的ts类型
export type DepartmentContent = DepartmentDetail[]

// 医院科室详情返回数据类型
export interface DepartmentDetailResponseData extends ResponseData {
  data: DepartmentContent
}

// # 地区/等级传递给父级参数的类型
export interface ParentLevelAndRegion {
  value: string
  type: string
}
