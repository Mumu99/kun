// 对axios进行封装，统一处理请求返回值
import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'

// 二次封装的目的：
// 1. 利用axios，请求拦截器和响应拦截器，对请求和响应进行统一处理，提高代码的可读性和可维护性。
// 2. 请求拦截器 - 请求头中携带公共的参数 token
// 3. 响应拦截器 - 对响应结果进行统一处理，比如统一处理请求失败的情况，统一返回错误信息等。

const request = axios.create({
  baseURL: '/api', // 请求的基础路径
  timeout: 1000 * 60 * 3 // 请求超时时间
})
let loadingInstance: any = null
request.interceptors.request.use(
  config => {
    loadingInstance = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, .5)'
    })
    // 请求拦截器，在请求发送之前做一些处理
    return config
  },
  error => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    loadingInstance.close()
    // 响应拦截器，在请求成功之后做一些处理
    const { data, status } = response
    if (status === 200) {
      if (data.code !== 200) {
        errorFunc(data.code, data.message)
      }
      return data
    } else {
      return Promise.reject(data)
    }
  },
  error => {
    console.log(error)
    errorFunc(error.response.status, error.message)
    // 响应错误处理
    return Promise.reject(error)
  }
)

const errorFunc = (status = 200, message = '') => {
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 401:
      message = '请先登录'
      break
    case 403:
      message = '没有权限访问'
      break
    case 404:
      message = '请求的资源不存在'
      break
    case 500:
      message = '服务器内部错误'
      break
    case 502:
      message = '网关错误'
      break
    case 503:
      message = '服务不可用'
      break
    case 504:
      message = '网关超时'
      break
  }
  ElMessage.error(message)
}

export default request
