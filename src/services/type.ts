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

// # 登录相关
export interface SendResponseData extends ResponseData {
  data: string
}

// 登录
export interface LoginData {
  phone: string
  code: string
}
export interface UserInfo {
  name: string
  token: string
}
// 返回的数据接口
export interface LoginResponseData extends ResponseData {
  data: UserInfo
}
// 用户相关state的ts数据类型
export interface userState {
  visibleDialog: boolean
  code: string
  userInfo: UserInfo
  wxParams: WechartLoginData
  isDrakMode: boolean
}

// 微信扫码登录的ts类型
export interface WechartLoginData {
  redirectUri: string
  appid: string
  scope: string
  state: string
}

// 微信扫码登录返回的数据类型
export interface WechartLoginResponseData extends ResponseData {
  data: WechartLoginData
}

// # 预约挂号相关

// 获取可预约的排版数据

export interface BookingSchedule {
  workDate: string
  workDateMd: string
  dayOfWeek: string
  docCount: number
  reservedNumber: number
  availableNumber: number
  status: number
}

export interface BaseMap {
  workDateString: string
  releaseTime: string
  bigname: string
  stopTime: string
  depname: string
  hosname: string
}

// 接口ts类型
export interface ScheduleRule {
  total: number
  bookingScheduleList: BookingSchedule[]
  baseMap: BaseMap
}

// 接口返回的预约挂号排版数据类型
export interface ScheduleRuleResponseData extends ResponseData {
  data: ScheduleRule
}

// 具体的排版详情
export interface ScheduleRuleDetail {
  id: string
  createTime: string
  updateTime: string
  isDeleted: number
  param: {
    dayOfWeek: string
    depname: string
    hosname: string
  }
  hoscode: string
  hosname: string
  depcode: string
  depname: string
  title: string
  docname: string
  skill: string
  workDate: string
  workTime: number
  reservedNumber: number
  availableNumber: number
  amount: number
  status: number
  hosScheduleId: string
}

// 存储全部排版详情数据的ts类型
export type ScheduleRuleDetailList = ScheduleRuleDetail[]

// 接口返回的具体排版详情数据类型
export interface ScheduleRuleDetailResponseData extends ResponseData {
  data: ScheduleRuleDetailList
}

// 确认挂号信息 - 获取就诊人信息ts类型
export interface PatientInfo {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: {
    certificatesTypeString: string
    contactsCertificatesTypeString: string | null
    cityString: string | null
    fullAddress: string
    districtString: string | null
    provinceString: string | null
  }
  userId: number
  name: string
  certificatesType: string
  certificatesNo: string
  sex: number
  birthdate: string
  phone: string
  isMarry: number
  provinceCode: string | null
  cityCode: string | null
  districtCode: string | null
  address: string
  contactsName: string | null
  contactsCertificatesType: string | null
  contactsCertificatesNo: string | null
  contactsPhone: string | null
  isInsure: number
  cardNo: string | null
  status: string
}

export type PatientInfoArr = PatientInfo[]

// 确认挂号信息 - 获取就诊人信息返回的数据类型
export interface PatientInfoResponseData extends ResponseData {
  data: PatientInfoArr
}

// 确认挂号信息 - 当前挂号详情
export interface PatientData {
  id: string
  createTime: string
  updateTime: string
  isDeleted: number
  param: {
    dayOfWeek: string
    depname: string
    hosname: string
  }
  hoscode: string
  hosname: string
  depcode: string
  depname: string
  title: string
  docname: string
  skill: string
  workDate: string
  workTime: number
  reservedNumber: number
  availableNumber: number
  amount: number
  status: number
  hosScheduleId: string
}
// 确认挂号信息 - 当前挂号详情返回的数据类型
export interface PatientDataResponseData extends ResponseData {
  data: PatientData
}

// # 挂号订单
// 订单状态下拉框数据类型
export interface OrderStatusSelectData {
  comment: string
  status: number
}
// 订单状态下拉框返回的数据类型
export interface OrderStatusSelectResponseData extends ResponseData {
  data: OrderStatusSelectData[]
}
// 订单列表单条数据类型
export interface OrderListItem {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: {
    orderStatusString: string
  }
  userId: number
  outTradeNo: string
  hoscode: string
  hosname: string
  depcode: string
  depname: string
  scheduleId: string | null
  title: string
  reserveDate: string
  reserveTime: number
  patientId: number
  patientName: string
  patientPhone: string
  hosRecordId: string
  number: number
  fetchTime: string
  fetchAddress: string
  amount: number
  quitTime: string
  orderStatus: number
}

// 订单列表数据类型
export interface OrderListData {
  records: OrderListItem[]
  total: number
  size: number
  current: number
  orders: []
  hitCount: boolean
  searchCount: boolean
  pages: number
}

// 订单列表返回的数据类型
export interface OrderListResponseData extends ResponseData {
  data: OrderListData
}

// 订单详情返回数据类型
export interface OrderDetailResponseData extends ResponseData {
  data: OrderListItem
}

// 支付二维码的数据类型
export interface PayQrcodeData {
  codeUrl: string
  orderId: number
  totalFee: number
  resultCode: string
}

// 支付二维码返回的数据类型
export interface PayQrcodeResponseData extends ResponseData {
  data: PayQrcodeData
}

// 获取支付二维码的支付状态的数据类型
export interface PayStatusResponseData extends ResponseData {
  data: boolean
}

// 当前用户信息的ts数据类型
export interface UserInfoData {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: {}
  openid: string
  nickName: string
  phone: string
  name: string
  certificatesType: string
  certificatesNo: string
  certificatesUrl: string
  authStatus: number
  status: number
  statusName?: string
}
// 当前用户信息返回的数据类型
export interface UserInfoResponseData extends ResponseData {
  data: UserInfoData
}

// # 当前用户下拉框的ts数据类型
export interface UserSelectData {
  label: string
  type: string
  path: string
}

// # 地区/等级传递给父级参数的类型
export interface ParentLevelAndRegion {
  value: string
  type: string
}

// 下拉框数据类型
export interface SelectData {
  id: number
  value: string
}

// # 实名认证的ts数据类型
export interface RealNameData {
  label: string
  code: string
  isEdit: boolean
  type: string
  isMust?: boolean
  optionsList?: SelectData[] | null
  slot?: boolean | null
  lengthLimit?: number | null
}
