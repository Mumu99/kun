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
  }
}

export default apis
