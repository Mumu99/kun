import request from '@/utils/request'
import api from '@/config/api.conf'
import type {
  SendResponseData,
  LoginData,
  LoginResponseData,
  WechartLoginResponseData,
  UserInfoResponseData
} from './type'

// 获取验证码
export const getSend = (phone: string) =>
  request.get<any, SendResponseData>(api.login.getSend + `${phone}`)

export const login = (params: LoginData) =>
  request.post<any, LoginResponseData>(api.login.login, params)

export const getWxLoginParam = (wxRedirectUri: string) =>
  request.get<any, WechartLoginResponseData>(
    api.login.getWxLoginParam + `?wxRedirectUri=${wxRedirectUri}`
  )
// 获取当前用户信息
export const getUserInfo = () =>
  request.get<any, UserInfoResponseData>(api.login.getUserInfo)
