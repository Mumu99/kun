import { UserInfo } from '@/services/type'
export const setUserInfo = (userInfo: UserInfo) => {
  sessionStorage.setItem('kunUserInfo', JSON.stringify(userInfo))
}

export const getUserInfo = () => {
  return JSON.parse(sessionStorage.getItem('kunUserInfo') || 'null')
}

export const removeUserInfo = () => {
  sessionStorage.removeItem('kunUserInfo')
}
