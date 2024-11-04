<template>
  <div class="patient-detail-container">
    <section v-if="['add', 'edit', 'detail'].includes(type)">
      <aside>
        <div class="title">就诊人信息</div>
        <Kfrom
          ref="patientForm"
          :formItemSystem="patientSystem"
          :isDetail="type === 'detail'"
          :rdata="data"
        />
      </aside>
      <aside>
        <div class="title">建档信息（完善后部分医院首次就诊不排队）</div>
        <Kfrom
          ref="EstabForm"
          :formItemSystem="EstabSystem"
          :isDetail="type === 'detail'"
          :rdata="data"
        />
      </aside>
      <aside>
        <div class="title">联系人信息（选填）</div>
        <Kfrom
          ref="ContactForm"
          :formItemSystem="ContactSystem"
          :isDetail="type === 'detail'"
          :rdata="data"
        />
      </aside>
      <footer>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </footer>
    </section>
  </div>
</template>

<script setup lang="ts">
import Kfrom from '@/components/form/index.vue'
import { reactive, ref, onMounted } from 'vue'
import type { RealNameData } from '@/services/type'
import { addAuth, getAuth } from '@/services/order'
import { useRouter } from 'vue-router'
const router = useRouter()
const { type, id } = defineProps({
  type: {
    type: String,
    default: 'detail'
  },
  id: {
    type: Number
  },
  kForm: {
    type: String
  }
})
onMounted(() => {
  if (['edit', 'detail'].includes(type) && id) {
    getDetial()
  }
})

router.push({
  path: '/userInfo/patientManage',
  query: { type: 'detail', id: id }
})
const patientSystem = reactive(<RealNameData[]>[
  {
    label: '姓名',
    code: 'name',
    isEdit: true,
    type: 'lineText',
    isMust: true
  },
  {
    label: '证件类型',
    code: 'certificatesType',
    isEdit: true,
    type: 'selector',
    isMust: true,
    optionsList: [
      { id: 1, value: '身份证' },
      { id: 10, value: '户口本' }
    ]
  },
  {
    label: '证件号码',
    code: 'certificatesNo',
    isEdit: true,
    type: 'lineText',
    isMust: true
  },
  {
    label: '性别',
    code: 'sex',
    isEdit: true,
    type: 'radio',
    optionsList: [
      { id: 1, value: '男' },
      { id: 0, value: '女' }
    ]
  },
  {
    label: '出生日期',
    code: 'birthdate',
    isEdit: true,
    type: 'date',
    isMust: true
  },
  {
    label: '联系电话',
    code: 'phone',
    isEdit: true,
    type: 'lineText',
    isMust: true
  }
])
const EstabSystem = reactive(<RealNameData[]>[
  {
    label: '婚姻状态',
    code: 'isMarry',
    isEdit: true,
    type: 'radio',
    optionsList: [
      { id: 0, value: '未婚' },
      { id: 1, value: '已婚' }
    ]
  },
  {
    label: '自费/医保',
    code: 'isInsure',
    isEdit: true,
    type: 'radio',
    optionsList: [
      { id: 0, value: '自费' },
      { id: 1, value: '医保' }
    ]
  },
  {
    label: '当前住址',
    code: 'address',
    isEdit: true,
    type: 'address',
    isMust: true
  },
  {
    label: '详细地址',
    code: 'detailAddress',
    isEdit: true,
    type: 'lineText',
    isMust: true
  }
])
const ContactSystem = reactive(<RealNameData[]>[
  {
    label: '姓名',
    code: 'contactsName',
    isEdit: true,
    type: 'lineText',
    isMust: true
  },
  {
    label: '证件类型',
    code: 'contactsCertificatesType',
    isEdit: true,
    type: 'selector',
    isMust: true,
    optionsList: [
      { id: 1, value: '身份证' },
      { id: 2, value: '户口本' }
    ]
  },
  {
    label: '证件号码',
    code: 'contactsCertificatesNo',
    isEdit: true,
    type: 'lineText',
    isMust: true
  },
  {
    label: '手机号码',
    code: 'contactsPhone',
    isEdit: true,
    type: 'lineText',
    isMust: true
  }
])
const patientData = reactive({})
const estabData = reactive({})
const contactData = reactive({})
let data = reactive({})
// ref
const patientForm = ref<InstanceType<typeof Kfrom>>()
const EstabForm = ref<InstanceType<typeof Kfrom>>()
const ContactForm = ref<InstanceType<typeof Kfrom>>()

const getDetial = async () => {
  try {
    const res = await getAuth(id as number)
    const { code, data: rd } = res
    if (code === 200) {
      data = Object.assign({}, rd)
    }
  } catch (error) {
    console.error('获取患者详情失败:', error)
  }
}

const handleSave = async () => {
  try {
    // 确保表单引用存在并提交所有表单
    const forms = [patientForm.value, EstabForm.value, ContactForm.value]
    if (forms.every(form => form)) {
      const [pRes, eRes, cRes] = await Promise.all(
        forms.map(form => form?.submitForm())
      )
      // 合并数据到一个对象中，仅在响应为对象时添加
      const params = Object.assign({}, pRes, eRes, cRes)
      // 检查合并后的参数
      if (Object.keys(params).length === 0) {
        console.warn('未获取到任何表单数据')
        return
      }
      console.log(params)
      const res = await addAuth(params)
      console.log(res)
    } else {
      console.error('表单引用不存在，请检查表单设置。')
    }
  } catch (error) {
    // 处理其他可能的错误
    console.error('保存过程中发生错误:', error)
  }
}
</script>

<style lang="less" scoped>
.patient-detail-container {
  font-family: TencentSans-W3;
  section {
    width: 600px;
    aside {
      margin: 60px 0;
      .title {
        color: var(--p-default-color);
        position: relative;
        padding-left: 10px;
        margin-bottom: 20px;
        &::before {
          content: '';
          width: 3px;
          height: 80%;
          background-color: #3c62b0;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate3d(0, -35%, 0);
          border-radius: 6px;
        }
      }
    }
  }
  footer {
    margin-bottom: 50px;
    text-align: center;
    .el-button {
      width: 120px;
      height: 40px;
      padding-bottom: 10px;
    }
  }
}
</style>
