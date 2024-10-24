<template>
  <div class="login-container">
    <el-dialog
      v-model="loginStore.visibleDialog"
      width="960px"
      :close-on-click-modal="false"
      @close="handleClose"
    >
      <aside class="login-form">
        <el-card class="login-card">
          <!-- 手机号登录 -->
          <aside v-if="!isQrLogin">
            <h2>{{ isTel ? '手机号码' : `验证码已发送至 ${form.tel}` }}</h2>
            <el-form
              :model="form"
              label-width="120px"
              ref="ruleForm"
              :rules="rules"
            >
              <el-form-item v-if="isTel" prop="tel">
                <el-input v-model="form.tel" placeholder="请输入您的手机号码" />
              </el-form-item>
              <el-form-item v-else prop="code">
                <el-input
                  v-model.number="form.code"
                  maxlength="6"
                  placeholder="请输入验证码"
                >
                  <template #suffix>
                    <span
                      :class="{ 'login-code-btn': !isCounting }"
                      @click="sendVerificationCode"
                      :disabled="isCounting"
                    >
                      {{ (isCounting && `${countdown}s`) || '重新发送' }}
                    </span>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
            <div class="login-btn">
              <el-button
                class="login-btn-item"
                type="primary"
                @click="handleLogin(ruleForm)"
              >
                {{ !isTel ? '登录' : '获取验证码' }}
              </el-button>
            </div>
          </aside>
          <!-- 微信扫码登录 -->
          <aside v-else>
            <h2>微信扫码登录</h2>
          </aside>
          <div class="login-btn">
            <div
              class="login-btn-wechart"
              v-if="!isQrLogin"
              @click="handleQrLogin"
            >
              <SvgIcon name="wechart-bg" class="cls__svg" :size="40"></SvgIcon>
              <span class="login-btn-text"> 使用第三方登录 </span>
            </div>
            <div class="login-btn-wechart" v-else @click="handleQrLogin">
              <div class="login-btn-wechart-qr">
                <!-- wechat登录二维码页面所需 -->
                <div id="login_container" v-if="isQrLoginSuccess"></div>
                <!-- 无返回登录二维码时，默认使用自己的 -->
                <el-image src="/src/assets/images/qr.jpg" v-else />
                <span class="login-btn-text login-btn-text-qr">
                  打开 <span class="btn-wechart">微信APP</span>-点击右上角 +
                  号-点击扫一扫
                </span>
              </div>
              <SvgIcon
                name="phone"
                class="svg-icon-phone"
                :size="25"
                :color="'var(--p-login-ver-code-color)'"
              ></SvgIcon>
              <span class="login-btn-text"> 手机短信验证码登录 </span>
            </div>
          </div>
        </el-card>
      </aside>
      <div class="login-content">
        <div class="scan-follow-content">
          <div class="scan-content">
            <el-image src="/src/assets/images/qr.jpg" />
            <div class="scan-qr">
              <SvgIcon name="wechart" class="cls__svg" :size="25"></SvgIcon>
              <div class="scan-qr-text">
                <span>微信扫一扫关注</span>
                <span>“快速预约挂号”</span>
              </div>
            </div>
          </div>
          <div class="scan-content">
            <el-image src="/src/assets/images/qr.jpg" />
            <div class="scan-qr scan-qr-app">
              <div class="scan-qr-text">
                <span>扫一扫下载</span>
                <span>“预约挂号”APP</span>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <span>困医通官方指定平台</span>
          <span>快速挂号 安全放心</span>
        </footer>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useLoginStore } from '@/store/login'
const loginStore = useLoginStore()
const isCounting = ref(false)
// 倒计时
const countdown = ref(60)
// 表单
const ruleForm = ref<FormInstance>()
// 是否为手机号页面
let isTel = ref(true)
// 验证码是否正确
let newCode = ref('')
// 当前是否为登录
let isQrLogin = ref(false)
// 微信登录二维码是否获取成功
let isQrLoginSuccess = ref(false)

let form = reactive({
  // 电话号码
  tel: '',
  // 验证码
  code: ''
})
// 表单验证规则
const rules = reactive<FormRules>({
  tel: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: 'blur',
      min: 11,
      max: 11
    },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号码',
      trigger: 'blur'
    }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value.toString() === newCode.value) {
          callback()
        } else {
          callback(new Error('请输入正确的验证码'))
        }
      },
      trigger: 'blur'
    }
  ]
})
// 获取验证码/登录
const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (isTel.value) {
        isTel.value = !isTel.value
        sendVerificationCode()
      } else {
        const { tel: phone, code } = form
        const params = {
          phone,
          code
        }
        try {
          // 用户登录成功
          await loginStore.loginSend(params)
          handleClose()
          ElMessage.success('登录成功')
        } catch (error) {}
      }
    } else {
      if (fields) {
        const firstKey = Object.keys(fields)[0] as any
        ElMessage.error(fields[firstKey][0].message || '表单验证失败')
      } else {
        ElMessage.error('表单验证失败，未提供字段错误信息')
      }
      return
    }
  })
}
// 发送验证码
const sendVerificationCode = async () => {
  // 当前为读秒状态，则退出
  if (isCounting.value) return
  // 调用action，发送验证码
  try {
    await loginStore.getSendCode(form.tel)
    form.code = newCode.value = loginStore.code
    isCounting.value = true
    countdown.value = 60
    const interval = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(interval)
        isCounting.value = false
      }
    }, 1000)
  } catch (error) {
    ElMessage.error((error as Error).message || '验证码发送失败，请稍后再试')
  }
}
// 第三方登录 or 手机号登录
const handleQrLogin = async () => {
  isQrLogin.value = !isQrLogin.value
  if (isQrLogin.value) {
    try {
      let redirect_uri = encodeURIComponent(window.location.origin + '/wxlogin')
      await loginStore.getWxLoginParam(redirect_uri)
      const { appid, redirectUri, scope, state } = loginStore.wxParams
      // @ts-ignore
      const isLogin = new WxLogin({
        self_redirect: true, // 	true：手机点击确认登录后可以在 iframe 内跳转到 redirect_uri，false：手机点击确认登录后可以在 top window 跳转到 redirect_uri。默认为 false。
        id: 'login_container', // 第三方页面展示的容器
        appid, // 应用唯一标识
        scope, // 微信扫码登录页面已授权
        redirect_uri: redirectUri, // 授权后重定向的回调链接地址
        state, // 学校服务器携带的用户信息
        style: 'black'
      })
      isQrLoginSuccess.value = Object.keys(isLogin).length > 0
    } catch (error) {}
  }
}
// 弹窗关闭 - 重置状态
const handleClose = () => {
  // 初始化默认值，清空表单校验
  isCounting.value = false
  countdown.value = 60
  isTel.value = true
  isQrLogin.value = false
  resetForm(ruleForm.value)
  loginStore.visibleDialog = false
}
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  Object.assign(form, { tel: '', code: '' })
  formEl.resetFields()
}
</script>
<script lang="ts">
export default {
  name: 'Login'
}
</script>

<style lang="less" scoped>
.login-container {
  font-family: TencentSans-W3;
  :deep(.el-dialog) {
    padding: 0;
    background-image: url(data:image/png;base64,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);
  }
  :deep(.el-dialog__body) {
    display: flex;
    padding: 30px 20px;
    .login-card {
      .el-card__body {
        padding: 20px 60px;
        min-height: 413px;
        h2 {
          font-size: 20px;
          font-family: TencentSans-W7;
          padding: 80px 0 0;
        }
        .el-form {
          padding-top: 80px;
          .el-form-item__content {
            margin-left: 0 !important;
            .el-input__wrapper {
              box-shadow: none;
              border-bottom: 1px solid var(--p-login-border-color);
              border-radius: 0;
              padding: 0 5px;
            }
            .el-input__inner {
              height: 40px;
              font-family: TencentSans-W3;
              &::placeholder {
                font-family: TencentSans-W3;
              }
            }
            .el-input__suffix-inner {
              color: var(--p-login-ver-code-color);
            }
            .login-code-btn {
              cursor: pointer;
              color: var(--p-text-color);
            }
            .el-form-item__error {
              display: none;
            }
          }
        }
        .login-btn {
          .login-btn-item {
            margin: 30px 0;
            width: 100%;
            height: 40px;
            font-family: TencentSans-W3;
            padding-bottom: 10px;
          }
        }
        .login-btn-wechart {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          .login-btn-text {
            margin-top: 10px;
            color: var(--p-gray-color);
          }
          .login-btn-wechart-qr {
            margin: 30px 0 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .el-image {
              width: 180px;
            }
            #login_container {
              // width: 180px;
              // height: 180px;
            }
            .login-btn-text-qr {
              margin-top: 10px;
              span {
                color: var(--p-text-color);
              }
            }
          }
        }
      }
    }
    .login-form {
      width: 50%;
      margin: 0 20px 0 35px;
    }
    .login-content {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .scan-follow-content {
        display: flex;
        width: 100%;
        justify-content: space-between;
        .scan-content {
          width: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .el-image {
            width: 140px;
            height: 140px;
          }
          .scan-qr,
          .scan-qr-text {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            &.scan-qr-app {
              margin-top: 35px;
            }
            span {
              margin-top: 5px;
            }
          }
          .scan-qr-text {
            margin-top: 0;
          }
        }
      }
      footer {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 22px;
        letter-spacing: 8px;
        span:last-child {
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
