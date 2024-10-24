import { getSend, login, getWxLoginParam } from '@/services/login'
import { defineStore } from 'pinia'
import {
  LoginData,
  LoginResponseData,
  userState,
  WechartLoginData,
  WechartLoginResponseData
} from '@/services/type'
import { getUserInfo, setUserInfo, removeUserInfo } from '@/utils/user'

export const useLoginStore = defineStore('login', {
  state: (): userState => {
    return {
      visibleDialog: <boolean>false, // 登录弹窗是否显示
      code: <string>'', // 手机验证码
      userInfo: getUserInfo() || {}, // 用户信息
      wxParams: <WechartLoginData>{}
    }
  },
  actions: {
    // 获取验证码
    async getSendCode(phone: string) {
      const result = await getSend(phone)
      const { data, code, message } = result
      if (code === 200) {
        this.code = data
        return data
      } else {
        return Promise.reject(new Error(message))
      }
    },
    async loginSend(params: LoginData) {
      const result: LoginResponseData = await login(params)
      const { code, data, message } = result
      if (code === 200) {
        this.userInfo = data
        setUserInfo(this.userInfo)
        return data
      } else {
        return Promise.reject(new Error(message))
      }
    },
    logout() {
      this.userInfo = { name: '', token: '' }
      removeUserInfo()
    },
    async getWxLoginParam(url: string) {
      const result: WechartLoginResponseData = await getWxLoginParam(url)
      const { code, data, message } = result
      if (code === 200) {
        this.wxParams = data
        return data
      } else {
        return Promise.reject(new Error(message))
      }
    }
  },
  getters: {}
})
