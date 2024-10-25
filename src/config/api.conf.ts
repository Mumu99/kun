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
  }
}

export default apis
