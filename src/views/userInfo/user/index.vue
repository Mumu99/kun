<template>
  <div class="user-container">
    <h1>实名认证</h1>
    <el-tag>
      <SvgIcon name="warning" :size="26" />
      <span>
        完成实名认证后才能够添加就诊人，正常进行挂号，为了不影响后续的步骤，请尽快完成实名认证！
      </span>
    </el-tag>
    <div class="form-container">
      <el-form class="form-wrapper" ref="kunForm" :model="data">
        <div
          class="form-sys-content"
          v-for="(item, index) in formItemSystem"
          :key="index"
        >
          <div class="form-label" v-if="item.label">
            <span class="label-must" v-if="item.isMust">*</span>
            <span>{{ item.label }}:</span>
          </div>
          <!--插槽-->
          <div class="form-item" v-if="item.slot">
            <slot :name="item.code" :data="data" />
          </div>
          <div class="form-content" v-else>
            <div class="form-box" v-if="item.isEdit">
              <!-- 单行文本框 -->
              <div class="form-item" v-if="['lineText'].includes(item.type)">
                <el-form-item
                  :prop="item.isMust && item.code"
                  :rules="[
                    {
                      required: item.isMust,
                      message: `${item.label}不能为空`,
                      trigger: 'blur'
                    }
                  ]"
                  :ref="`formItemRef-${item.code}`"
                >
                  <el-input
                    v-model="data[item.code]"
                    type="text"
                    :placeholder="`请输入${item.label}`"
                    :maxlength="item.lengthLimit"
                    clearable
                  ></el-input>
                </el-form-item>
              </div>
              <!-- 下拉框 -->
              <div
                class="form-item"
                v-else-if="['selector'].includes(item.type)"
              >
                <el-form-item
                  :prop="item.isMust && item.code"
                  :rules="[
                    {
                      required: item.isMust,
                      message: `${item.label}不能为空`,
                      trigger: 'change'
                    }
                  ]"
                  :ref="`formItemRef-${item.code}`"
                >
                  <el-select
                    v-model="data[item.code]"
                    :placeholder="`请选择${item.label}`"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="(option, index) in item.optionsList"
                      :key="index"
                      :label="option.value"
                      :value="option.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <!-- 上传 -->
              <div
                class="form-item form-upload"
                v-else-if="['pictureUpload'].includes(item.type)"
              >
                <el-form-item
                  :prop="item.isMust && item.code"
                  :rules="[
                    {
                      required: item.isMust,
                      message: `${item.label}不能为空`,
                      trigger: 'change'
                    }
                  ]"
                  ref="formItemRefidCardUrl"
                >
                  <el-upload
                    class="upload-demo"
                    ref="uploadFile"
                    action="#"
                    :multiple="false"
                    :file-list="fileList"
                    list-type="picture-card"
                    :limit="1"
                    :show-file-list="true"
                    :on-exceed="handleExceed"
                    :on-change="handleChange"
                    :http-request="httpRequest"
                    :auto-upload="false"
                  >
                    <div class="upload-tips">
                      <span class="tip">示例：</span>
                      <SvgIcon name="id-card" :size="148" />
                    </div>
                    <template #file="{ file }">
                      <div>
                        <img
                          class="el-upload-list__item-thumbnail"
                          :src="file.url"
                          alt=""
                        />
                        <span class="el-upload-list__item-actions">
                          <span
                            class="el-upload-list__item-preview"
                            @click="handlePictureCardPreview(file)"
                          >
                            <el-icon><zoom-in /></el-icon>
                          </span>
                          <span
                            class="el-upload-list__item-delete"
                            @click="handleRemove(file.uid)"
                          >
                            <el-icon><Delete /></el-icon>
                          </span>
                        </span>
                      </div>
                    </template>
                  </el-upload>
                </el-form-item>
              </div>
            </div>
            <!-- 文本 -->
            <div class="form-item-text" v-else>
              <span>{{ data[item.code] }}</span>
            </div>
          </div>
        </div>
      </el-form>
      <div class="btns" v-if="userInfo.authStatus === 0">
        <el-button type="primary" @click="submitForm(kunForm)">提交</el-button>
        <el-button type="default" @click="resetForm(kunForm)">重写</el-button>
      </div>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" width="100%" />
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import type { RealNameData } from '@/services/type'
import { getUserInfo } from '@/services/login'
import { ElMessage } from 'element-plus'
import type { UploadFile, FormInstance } from 'element-plus'
import { Delete, ZoomIn } from '@element-plus/icons-vue'
import type { UserInfoData } from '@/services/type'
const fileList = ref(<UploadFile[]>[])
const kunForm = ref()
const formItemSystem = reactive(<RealNameData[]>[
  {
    label: '用户姓名',
    code: 'userName',
    isEdit: true,
    type: 'lineText',
    isMust: true
  },
  {
    label: '证件类型',
    code: 'idCardType',
    isEdit: true,
    type: 'selector',
    isMust: true,
    optionsList: [
      { id: 1, value: '身份证' },
      { id: 2, value: '护照' },
      { id: 3, value: '其他' }
    ]
  },
  {
    label: '证件号码',
    code: 'idCardNo',
    isEdit: true,
    type: 'lineText',
    isMust: true
  },
  {
    label: '上传证件照片',
    code: 'idCardUrl',
    isEdit: true,
    type: 'pictureUpload',
    isMust: true
  }
])
const formItemSystemOfDetail = reactive(<RealNameData[]>[
  {
    label: '用户姓名',
    code: 'nickName',
    isEdit: false
  },
  {
    label: '证件类型',
    code: 'statusName',
    isEdit: false
  },
  {
    label: '证件号码',
    code: 'openid',
    isEdit: false
  },
  {
    label: '实名时间',
    code: 'createTime',
    isEdit: false
  }
])
let data = reactive(<any>{})
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const formItemRefidCardUrl = ref(<any>null)
const userInfo = ref(<UserInfoData>{})

onMounted(() => {
  getUser()
})

const getUser = async () => {
  const res = await getUserInfo()
  if (res.code === 200) {
    userInfo.value = res.data
    userInfo.value.statusName = res.data.status === 1 ? '身份证' : '户口本'
    if (userInfo.value.authStatus) {
      data = Object.assign(data, userInfo.value)
      formItemSystem.splice(0, formItemSystem.length, ...formItemSystemOfDetail)
    }
  }
}

// 监听数据变化
const handleExceed = () => {
  ElMessage.warning('只能上传一张证件照片')
  return false
}

// 删除当前上传的照片
const handleRemove = (uid: number) => {
  fileList.value.splice(
    fileList.value.findIndex((item: UploadFile) => item.uid === uid),
    1
  )
  data.idCardUrl = ''
  if (formItemRefidCardUrl.value) {
    formItemRefidCardUrl.value[0].validate()
  }
}

// 预览
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleChange = (file: any) => {
  fileList.value = [file]
  httpRequest(file)
}

const httpRequest = (file: any) => {
  let formData = new FormData()
  formData.append('file', file.raw)
  data.idCardUrl = file.url
  if (formItemRefidCardUrl.value) {
    formItemRefidCardUrl.value[0].validate()
  }
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
  console.log(data)
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  data.idCardUrl = ''
  fileList.value = []
  formEl.resetFields()
}
</script>

<style lang="less" scoped>
.user-container {
  font-family: TencentSans-W3;
  h1 {
    font-family: TencentSans-W7;
    font-size: 20px;
  }
  :deep(.el-tag) {
    width: 100%;
    height: 60px;
    margin: 30px 0 100px;
    .el-tag__content {
      width: 100%;
      display: flex;
      align-items: center;
      span {
        margin: -3px 0 0 15px;
        font-size: 16px;
      }
    }
  }
  .form-container {
    width: 600px;
    .form-wrapper {
      .form-sys-content {
        display: flex;
        margin-bottom: 26px;
        .form-label {
          width: 120px;
          margin-top: 10px;
          .label-must {
            color: #f56c6c;
            margin-right: 2px;
          }
        }

        .form-content {
          flex: 1;
          .el-form-item {
            margin-bottom: 0;
            :deep(.el-input__inner),
            :deep(.el-select__wrapper) {
              height: 36px;
              font-family: TencentSans-W3;
            }
          }
          .upload-tips {
            border-radius: 4px;
            position: relative;
            height: 148px;
            .tip {
              position: absolute;
              top: 13px;
              left: 13px;
            }
          }
          .form-upload {
            :deep(.el-form-item__content) {
              flex-direction: column;
              align-items: flex-start;
            }
          }
          .form-item-text {
            height: 36px;
            line-height: 36px;
          }
        }
      }
    }
    .btns {
      width: 100%;
      display: flex;
      justify-content: center;
      .el-button {
        width: 100px;
        height: 36px;
      }
    }
  }
  margin-bottom: 40px;
}
</style>
