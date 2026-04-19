<script setup>
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import { getCategoryTree, articlePage } from '@/api/admin'
import { onMounted, ref, reactive } from 'vue'
import ArticleDialog from '@/components/ArticleDialog.vue'
import { getArticleDetail } from '@/api/admin'

const formItem = [
  { comp: 'input', prop: 'title', label: '文章标题', placeholder: '请输入文章标题' },
  { comp: 'select', prop: 'categoryId', label: '分类', placeholder: '请选择分类' },
  {
    comp: 'select',
    prop: 'status',
    label: '状态',
    placeholder: '请选择状态',
    options: [
      { label: '草稿', value: 0 },
      { label: '已发布', value: 1 },
      { label: '已下线', value: 2 }
    ]
  }
]

// 分页参数
const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0
})

// 文章列表
const tableData = ref([])

const handleSearch = async (formData) => {
  const params = {
    ...pagination,
    ...formData
  }
  const { records, total } = await articlePage(params)
  tableData.value = records
  pagination.total = total
}

// 分类映射
const categoryMap = reactive({})
// 分类列表
const categories = ref([])

const handleChange = (page) => {
  pagination.currentPage = page
  handleSearch()
}

// 弹窗是否显示
const dialogVisible = ref(false)
const currentArticle = ref(null)
const handleSuccess = () => {}
const handleEdit = async (row) => {
  if (!row.id) {
    // 新增文章
    currentArticle.value = null
    dialogVisible.value = true
  } else {
    // 编辑文章
    const res = await getArticleDetail(row.id)
    currentArticle.value = res
    dialogVisible.value = true
  }
}

onMounted(async () => {
  const data = await getCategoryTree()
  categories.value = data.map((item) => {
    categoryMap[item.id] = item.categoryName
    return {
      label: item.categoryName,
      value: item.id
    }
  })
  formItem[1].options = categories.value

  // 初始化列表
  handleSearch()
})
</script>

<template>
  <div>
    <PageHead title="知识文章">
      <template #buttons>
        <el-button @click="handleEdit({})" type="primary">新增</el-button>
      </template>
    </PageHead>
    <TableSearch :formItem="formItem" @search="handleSearch" />
    <el-table :data="tableData" style="width: 100%; margin-top: 25px">
      <el-table-column label="文章标题" fixed="left" width="200">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon>
              <Timer />
            </el-icon>
            <span>{{ scope.row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="分类">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon>
              <Timer />
            </el-icon>
            <span>{{ categoryMap[scope.row.categoryId] }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="作者" prop="authorName" width="150" />
      <el-table-column label="阅读量" prop="readCount" width="150" />
      <el-table-column label="发布时间" prop="updatedAt" width="150" />
      <el-table-column label="操作" width="240" fixed="right">
        <template #default="scope">
          <el-button text type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.status === 0 || scope.row.status === 2" text type="success">
            发布
          </el-button>
          <el-button v-if="scope.row.status === 1" text type="warning">下线</el-button>
          <el-button text type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 25px"
      layout="prev, pager, next"
      :total="pagination.total"
      :page-size="pagination.size"
      @change="handleChange"
    />
    <ArticleDialog
      v-model:modelValue="dialogVisible"
      :categories="categories"
      :article="currentArticle"
      @success="handleSuccess"
    />
  </div>
</template>
