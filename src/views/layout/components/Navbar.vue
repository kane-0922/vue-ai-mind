<script setup>
import { useAdminStore } from '@/stores/admin'

const adminStore = useAdminStore()

const handleCommand = (command) => {
  if (command === 'logout') {
    // 处理退出登录逻辑
  }
}

const handleCollapse = () => {
  adminStore.toggleCollapse()
}
</script>

<template>
  <div class="navbar">
    <div class="flex-box">
      <el-button @click="handleCollapse">
        <el-icon>
          <Expand />
        </el-icon>
      </el-button>
      <p class="page-title">导航栏</p>
    </div>
    <div class="flex-box">
      <el-dropdown @command="handleCommand">
        <div class="flex-box">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <p class="user-name">admin</p>
          <el-icon>
            <ArrowDown />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flex-box {
  display: flex;
  align-items: center;

  .page-title {
    margin-left: 20px;
    font-size: 26px;
    font-weight: bold;
    color: #1f2937;
  }

  .user-name {
    margin: 0 5px;
    font-weight: bold;
  }
}
</style>
