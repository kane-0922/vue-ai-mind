<script setup>
import { ref, reactive } from 'vue'
import { dayjs, ElMessage } from 'element-plus'
import { addEmotionalDiary } from '@/api/frontend'

const iconLike = new URL('@/assets/images/like.png', import.meta.url).href

const dairyForm = reactive({
  diaryDate: dayjs().format('YYYY-MM-DD'),
  moodScore: null,
  dominationEmotion: '',
  emotionTriggers: '',
  diaryContent: '',
  sleepQuality: null,
  stressLevel: null
})

const resetForm = () => {
  Object.assign(dairyForm, {
    diaryDate: dayjs().format('YYYY-MM-DD'),
    moodScore: null,
    dominationEmotion: '',
    emotionTriggers: '',
    diaryContent: '',
    sleepQuality: null,
    stressLevel: null
  })
}

// 情绪评分
const emotionStatus = [
  '绝望崩溃',
  '消沉抑郁',
  '焦虑烦躁',
  '低落不悦',
  '平静淡然',
  '轻松惬意',
  '愉悦舒心',
  '欢欣满足',
  '兴奋欣喜',
  '极致幸福'
]

// 情绪选项
const emotionOptions = [
  { name: '开心', url: new URL('@/assets/images/开心.png', import.meta.url).href },
  { name: '平静', url: new URL('@/assets/images/平静.png', import.meta.url).href },
  { name: '焦虑', url: new URL('@/assets/images/焦虑.png', import.meta.url).href },
  { name: '悲伤', url: new URL('@/assets/images/悲伤.png', import.meta.url).href },
  { name: '兴奋', url: new URL('@/assets/images/兴奋.png', import.meta.url).href },
  { name: '疲惫', url: new URL('@/assets/images/疲惫.png', import.meta.url).href },
  { name: '惊讶', url: new URL('@/assets/images/惊讶.png', import.meta.url).href },
  { name: '困惑', url: new URL('@/assets/images/困惑.png', import.meta.url).href }
]

// 选择情绪
const selectEmotion = (emotion) => {
  dairyForm.dominationEmotion = emotion
}

// 提交表单
const submitForm = () => {
  // console.log('提交表单数据:', dairyForm)
  if (!dairyForm.moodScore) {
    ElMessage.error('请选择情绪评分')
    return
  } else {
    addEmotionalDiary(dairyForm).then(() => {
      ElMessage.success('提交成功')
      resetForm()
    })
  }
}
</script>

<template>
  <div class="emotionDiary-container">
    <div class="header-section">
      <div class="header-content">
        <el-image :src="iconLike" style="width: 60px; height: 60px" />
        <h1>情绪日记</h1>
      </div>
    </div>
    <div class="content">
      <!-- 情绪评分 -->
      <div class="diary-card">
        <div class="title">今日情绪评分</div>
        <div class="section">
          <p>您今天的整体情绪状态如何？（1-10分）</p>
          <div class="rate">
            <el-rate
              v-model="dairyForm.moodScore"
              :texts="emotionStatus"
              show-text
              :max="10"
              size="large"
            />
          </div>
        </div>
      </div>
      <!-- 主要情绪 -->
      <div class="diary-card">
        <div class="title">主要情绪</div>
        <div class="emotion-grid">
          <div
            v-for="item in emotionOptions"
            :key="item.name"
            class="emotion-card"
            @click="selectEmotion(item.name)"
            :class="{ selected: item.name === dairyForm.dominationEmotion }"
          >
            <el-image :src="item.url" style="width: 50px; height: 50px" />
            <div class="emotion-name">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <!-- 详细记录 -->
      <div class="diary-card">
        <div class="title">详细记录</div>
        <div class="detail-form">
          <div class="form-group">
            <div class="form-label">情绪触发因素</div>
            <el-input
              v-model="dairyForm.emotionTriggers"
              placeholder="今天发生了什么事？"
              type="textarea"
              :rows="3"
              maxLength="1000"
              show-word-limit
            />
          </div>
          <div class="form-group">
            <div class="form-label">今日感想</div>
            <el-input
              v-model="dairyForm.diaryContent"
              placeholder="分享今天发生的事情"
              type="textarea"
              :rows="5"
              maxLength="2000"
              show-word-limit
            />
          </div>
          <!-- 生活指标 -->
          <div class="life-indicators">
            <div class="indicator-group">
              <div class="form-label">睡眠质量</div>
              <el-select v-model="dairyForm.sleepQuality" placeholder="请选择">
                <el-option label="很差" :value="1"></el-option>
                <el-option label="较差" :value="2"></el-option>
                <el-option label="一般" :value="3"></el-option>
                <el-option label="良好" :value="4"></el-option>
                <el-option label="优秀" :value="5"></el-option>
              </el-select>
            </div>
            <div class="indicator-group">
              <div class="form-label">压力等级</div>
              <el-select v-model="dairyForm.stressLevel" placeholder="请选择">
                <el-option label="很低" :value="1"></el-option>
                <el-option label="较低" :value="2"></el-option>
                <el-option label="中等" :value="3"></el-option>
                <el-option label="较高" :value="4"></el-option>
                <el-option label="很高" :value="5"></el-option>
              </el-select>
            </div>
          </div>
          <!-- 按钮区域 -->
          <div class="action-buttons">
            <el-button @click="resetForm">重置</el-button>
            <el-button type="primary" @click="submitForm">提交</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.emotionDiary-container {
  background: linear-gradient(135deg, #fafbfc 0%, #f7f9fc 50%, #f2f6fa 100%);
  .header-section {
    background: linear-gradient(135deg, #7ed321 0%, #f5a623 100%);
    color: white;
    padding: 48px;
    .header-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  }
  .content {
    margin: 0 auto;
    width: 980px;
    padding: 20px;
    .diary-card {
      margin-bottom: 20px;
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      .title {
        margin-bottom: 20px;
        font-size: 25px;
        font-weight: 600;
        color: #374151;
      }
      .section {
        margin-bottom: 20px;
        p {
          font-size: 15px;
          color: #6b7280;
          margin-bottom: 15px;
        }
      }
      .emotion-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        .emotion-card {
          padding: 15px;
          border: 2px solid #e5e7eb;
          border-radius: 15px;
          text-align: center;
          cursor: pointer;
          background: #f9fafb;
          .emotion-name {
            margin-top: 10px;
            padding: 0 75px;
            color: #374151;
          }
          &.selected {
            border-color: #7ed321;
            background: #f0fdf4;
            transform: translateY(-3px);
          }
        }
      }
      .detail-form {
        .form-label {
          margin: 10px 0;
          color: #374151;
        }
        .life-indicators {
          display: flex;
          gap: 20px;
          .indicator-group {
            flex: 1;
          }
        }
        .action-buttons {
          margin-top: 40px;
        }
      }
    }
  }
}
</style>
