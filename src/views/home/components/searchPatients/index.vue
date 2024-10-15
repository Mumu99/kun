<template>
  <div class="search-patients-container">
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入医院名称"
      @select="handleSelect"
      size="large"
      class="search-input"
    >
    </el-autocomplete>
    <el-button type="primary" :icon="Search" size="large" class="search-btn">
      搜索
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const state = ref('')

interface LinkItem {
  value: string
  link: string
}

const links = ref<LinkItem[]>([])

const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' }
  ]
}

let timeout: NodeJS.Timeout
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString
    ? links.value.filter(createFilter(queryString))
    : links.value

  clearTimeout(timeout)
  timeout = setTimeout(() => {
    cb(results)
  }, 1000 * Math.random())
}
const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

const handleSelect = (item: LinkItem) => {
  console.log(item)
}

onMounted(() => {
  links.value = loadAll()
})
</script>

<style lang="less" scoped>
.search-patients-container {
  width: 100%;
  margin: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  ::v-deep(.search-input) {
    width: 50%;
    .el-input__wrapper {
      border-radius: 4px 0 0 4px;
      border-right: none;
    }
  }
  .search-btn {
    border-radius: 0 4px 4px 0;
  }
}
</style>
