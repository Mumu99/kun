import { defineStore } from 'pinia'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { hospitalDetail } from '@/services/patients'
import type {
  HospitalDetailResponseData,
  HospitalDetail
} from '@/services/type'

export const useBullentinStore = defineStore('bullentin', {
  // 真正存储数据的地方
  state: () => {
    return {
      bullentinList: [] as any[],
      bullentinDetail: {} as HospitalDetail
    }
  },
  actions: {
    async getTalk() {
      const {
        data: { content: src }
      } = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
      this.bullentinList.push({
        id: nanoid(),
        src,
        type: 'text'
      })
    },
    async getHospitalDetail(hoscode: string) {
      // 调用接口获取数据
      const { data }: HospitalDetailResponseData = await hospitalDetail(hoscode)
      this.bullentinDetail = data
    }
  },
  getters: {}
})
