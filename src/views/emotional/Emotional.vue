<script setup>
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import { getEmotionalPage } from '@/api/admin'
import { ref, onMounted, reactive } from 'vue'

const formItem = [
  { comp: 'input', prop: 'userId', label: '用户ID', placeholder: '请输入用户ID' },
  {
    comp: 'select',
    prop: 'moodScoreRange',
    label: '情绪评分',
    placeholder: '请选择评分范围',
    options: [
      {
        label: '低分（1-3）',
        value: '1-3'
      },
      {
        label: '中分（4-6）',
        value: '4-6'
      },
      {
        label: '高分（7-10）',
        value: '7-10'
      }
    ]
  }
]

// 列表
const tableData = ref([])

const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0
})

const handleSearch = async (formData) => {
  const params = {
    ...pagination,
    ...formData
  }
  const { records, total } = await getEmotionalPage(params)
  tableData.value = records
  pagination.total = total
}

// 分页
const handleChange = (page) => {
  pagination.currentPage = page
  handleSearch()
}

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <div>
    <PageHead title="情绪日志" />
    <TableSearch :formItem="formItem" @search="handleSearch" />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="用户ID" width="80" />
      <el-table-column label="会话ID" width="80">
        <template #default="scope">
          <el-avatar>{{ scope.row.nikeName }}</el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="diaryDate" label="记录日期" width="120" />
      <el-table-column label="情绪评分" width="200">
        <template #default="scope">
          <el-rate :model-value="scope.row.moodScore" :max="10" disabled />
        </template>
      </el-table-column>
      <el-table-column label="生活指标" width="120">
        <template #default="scope">
          <div>
            <p>睡眠：{{ scope.row.sleepQuality }} / 5</p>
            <p>压力： {{ scope.row.stressLevel }} / 5</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="emotionTriggers" label="情绪触发因素" width="120" />
      <el-table-column prop="diaryContent" label="日记内容" />
      <el-table-column label="操作" width="240">
        <template #default="scope">
          <el-button text type="primary" @click="handleDetail(scope.row)">详情</el-button>
          <el-button @click="handleDelete(scope.row)" text type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      style="margin-top: 25px"
      layout="prev, pager, next"
      :total="pagination.total"
      :page-size="pagination.size"
      @change="handleChange"
    />
  </div>
</template>
