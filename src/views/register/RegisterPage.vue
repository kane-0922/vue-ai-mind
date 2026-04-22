<template>
  <div class="container">
    <!-- 标题区域 -->
    <div class="title">
      <div class="title-text">
        <h2>创建您的账户</h2>
        <p>填写以下信息完成注册</p>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-container">
      <el-form
        label-position="top"
        ref="submitFormRef"
        :model="formData"
        :rules="rules"
        class="register-form"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" size="large" />
        </el-form-item>

        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="formData.email"
            type="email"
            placeholder="请输入邮箱地址"
            size="large"
          />
        </el-form-item>

        <!-- 昵称 -->
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="formData.nickname" placeholder="请输入昵称" size="large" />
        </el-form-item>

        <!-- 手机号 -->
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入手机号" size="large" />
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            show-password
            size="large"
          />
        </el-form-item>

        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="formData.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            show-password
            size="large"
          />
        </el-form-item>

        <!-- 提交按钮 -->
        <el-form-item>
          <el-button class="btn" type="primary" @click="submitForm(submitFormRef)" size="large">
            注册
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 底部链接 -->
      <div class="footer">
        <span>已有账号？</span>
        <a href="#" class="link">立即登录</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { register } from '@/api/frontend'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
// 表单引用
const submitFormRef = ref(null)

// 表单数据
const formData = reactive({
  username: '',
  email: '',
  nickname: '',
  phone: '',
  gender: 0,
  password: '',
  confirmPassword: '',
  userType: 1
})

// 表单校验规则
const rules = reactive({
  // 用户名校验
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线', trigger: 'blur' }
  ],
  // 邮箱校验
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  // 密码校验
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  // 确认密码校验
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formData.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

// 提交表单
const submitForm = async (formEL) => {
  if (!formEL) return
  formEL.validate(async (valid) => {
    register(formData).then(({ data }) => {
      if (data.code === 'BUSINESS_ERROR') {
        ElMessage.error(data.msg || '注册失败！')
        return
      }
      ElMessage.success('注册成功！')
      // 登录成功后，跳转到首页
      router.push('/auth/login')
      // 重置表单
      formEL.value.resetFields()
    })
  })
}
</script>

<style scoped>
.container {
  width: 384px;
  .flex-box {
    display: flex;
    align-items: center;
  }
  .title {
    .title-text {
      text-align: center;
      h2 {
        font-size: 36px;
        margin-bottom: 10px;
      }
      p {
        font-size: 18px;
        color: #6b7280;
      }
    }
  }
  .form-container {
    margin-top: 30px;
    .btn {
      margin-top: 40px;
      width: 100%;
    }
    .footer {
      padding: 30px;
      text-align: center;
    }
  }
}
</style>
