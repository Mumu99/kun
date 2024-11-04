const apis = {
  // 首页接口
  home: {
    // 医院列表
    query: '/hosp/hospital/',
    // 级别
    levelAndRegion: '/cmn/dict/findByDictCode/',
    // 根据医院名称获取医院列表
    queryByHosname: '/hosp/hospital/findByHosname/',
    // 根据code获取医院详情
    hospitalDetail: '/hosp/hospital/',
    // 根据code获取科室列表
    hospitalDepartment: '/hosp/hospital/department/'
  },
  login: {
    getSend: '/sms/send/',
    login: '/user/login',
    // 微信登录参数
    getWxLoginParam: '/user/weixin/getLoginParam/',
    // 获取用户信息
    getUserInfo: '/user/auth/getUserInfo'
  },
  // 预约挂号
  appointment: {
    // 分页获取日期和是否有号
    getBookingScheduleRule: '/hosp/hospital/auth/getBookingScheduleRule/',
    // 获取具体的医生和号源
    findScheduleList: '/hosp/hospital/auth/findScheduleList/',
    // # 确认挂号页面
    findAll: '/user/patient/auth/findAll',
    getSchedule: '/hosp/hospital/getSchedule/'
  },
  order: {
    // 获取订单状态下拉框
    getStatusList: '/order/orderInfo/auth/getStatusList',
    // 获取订单列表
    getOrderList: '/order/orderInfo/auth/',
    // 获取订单列表
    getOrderInfo: '/order/orderInfo/auth/getOrderInfo/',
    // 取消预约
    cancelOrder: '/order/orderInfo/auth/cancelOrder/',
    // 生成二维码
    createNative: '/order/weixin/createNative/',
    // 查询支付状态
    queryPayStatus: '/order/weixin/queryPayStatus/',
    // 获取就诊人
    getAuth: '/user/patient/auth/get/',
    // 删除就诊人
    removeAuth: '/user/patient/auth/remove/',
    // 新增就诊人
    addAuth: '/user/patient/auth/save',
    // 修改就诊人
    updateAuth: '/user/patient/auth/update',
  }
}

export default apis
