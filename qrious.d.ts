// qrios 二维码转化的ts声明文件
declare module 'qrious' {
  export default class QRious {
    constructor(options?: {
      element?: HTMLCanvasElement
      value?: string
      size?: number
    })
    set(options: { value?: string; level?: string; size?: number }): void
  }
}
