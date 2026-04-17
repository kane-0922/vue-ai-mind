<script setup>
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import { getCategoryTree, articlePage } from '@/api/admin'
import { onMounted, ref, reactive } from 'vue'

const formItem = [
  { comp: 'input', prop: 'title', label: '文章标题', placeholder: '请输入文章标题' },
  { comp: 'select', prop: 'categoryId', label: '分类', placeholder: '请选择分类' },
  {
    comp: 'select', prop: 'status', label: '状态', placeholder: '请选择状态', options: [
      { label: '草稿', value: 0 },
      { label: '已发布', value: 1 },
      { label: '已下线', value: 2 }
    ]
  }
]

const handleSearch = (formData) => {
  console.log(formData)
}

// 分类映射
const categoryMap = reactive({})
// 分类列表
const categories = ref([])
onMounted(async () => {
  const data = await getCategoryTree()
  categories.value = data.map(item => {
    categoryMap[item.id] = item.categoryName
    return {
      label: item.categoryName,
      value: item.id
    }
  })
  formItem[1].options = categories.value
})
</script>

<template>
  <div>
    <PageHead title="知识文章">
      <template #buttons>
        <el-button type="primary">新增</el-button>
      </template>
    </PageHead>
    <TableSearch :formItem="formItem" @search="handleSearch" />
  </div>
</template>
