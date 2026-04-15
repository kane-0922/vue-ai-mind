<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const iconUrl = new URL('@/assets/images/机器人.png', import.meta.url).href
const router = useRouter()

const activeIndex = ref('2')

const handleOpen = (key) => {
  activeIndex.value = key
}

const handleClose = (key) => {
  activeIndex.value = key
}
</script>

<template>
  <el-aside width="264px">
    <el-menu default-active="2" @open="handleOpen" @close="handleClose" class="menu-style">
      <div class="brand">
        <el-image style="width: 50px; height: 50px; margin-right: 10px;" :src="iconUrl" alt="logo" />
        <div class="info-card">
          <h1 class="brand-title">心理健康助手AI</h1>
          <p class="brand-subtitle">管理后台</p>
        </div>
      </div>
      <el-menu-item v-for="item in router.options.routes[0].children" :key="item.path" :index="item.path">
        <el-icon>
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style lang="scss" scoped>
.menu-style {
  height: 100%;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #fff;
    border-bottom: 1px solid #e5e7eb;

    .info-card {
      .brand-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
        color: #1f2937;
      }

      .brand-subtitle {
        font-size: 14px;
        color: #6b7280;
      }
    }
  }
}
</style>
