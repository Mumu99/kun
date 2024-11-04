<template>
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
          <div class="form-item" v-else-if="['selector'].includes(item.type)">
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
          <!-- 单选 -->
          <div class="form-item" v-else-if="['radio'].includes(item.type)">
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
              <el-radio-group v-model="data[item.code]">
                <el-radio
                  v-for="(option, index) in item.optionsList"
                  :key="index"
                  :value="option.id"
                >
                  {{ option.value }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <!-- 日期 -->
          <div class="form-item" v-else-if="['date'].includes(item.type)">
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
              format="yyyy-MM-dd"
            >
              <el-date-picker
                v-model="data[item.code]"
                type="date"
                placeholder="请选择日期"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
              ></el-date-picker>
            </el-form-item>
          </div>
          <!-- 级联 -->
          <div class="form-item" v-else-if="['address'].includes(item.type)">
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
              <el-cascader
                v-model="data[item.code]"
                :options="location"
                clearable
                filterable
                :change-on-select="false"
                :placeholder="`请选择${item.label}`"
              />
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
</template>

<script setup lang="ts">
import location from '@/config/location.json'
import type { FormInstance } from 'element-plus'
import { ref, onMounted } from 'vue'
const { formItemSystem, rdata, isDetail } = defineProps([
  'formItemSystem',
  'rdata',
  'isDetail'
])
let data = ref({})
onMounted(() => {
  isDetail ? (data.value = rdata) : (data.value = {})
})
// let data = ref(<any>{})
const kunForm = ref<FormInstance>()
const submitForm = () => {
  return new Promise((resolve, reject) => {
    if (!kunForm.value) return
    kunForm.value.validate((valid: boolean) => {
      if (valid) {
        resolve(JSON.parse(JSON.stringify(data.value)))
      } else {
        reject(new Error('表单校验失败'))
      }
    })
  })
}
// 使用 defineExpose 来暴露方法
defineExpose({
  submitForm
})
</script>

<style lang="less" scoped>
.form-wrapper {
  .form-sys-content {
    display: flex;
    margin-bottom: 26px;
    height: 36px;
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
      :deep(.el-form-item) {
        margin-bottom: 0;
        .el-input__inner,
        .el-select__wrapper,
        .el-radio {
          height: 36px;
          font-family: TencentSans-W3;
          .el-radio__label {
            height: 16px;
            line-height: 16px;
          }
        }
        .el-input__wrapper,
        .el-select__wrapper {
          box-shadow: none;
          border-bottom: 1px solid #eee;
          border-radius: 0;
        }
        .el-cascader,
        .el-date-editor {
          width: 100%;
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
</style>
