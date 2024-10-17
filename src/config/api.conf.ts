const apis = {
  // 首页接口
  home: {
    // 医院列表
    query: '/hosp/hospital/',
    // 级别
    levelAndRegion: '/cmn/dict/findByDictCode/',
    // 根据医院名称获取医院列表
    queryByHosname: '/hosp/hospital/findByHosname/'
  }
}

export default apis
