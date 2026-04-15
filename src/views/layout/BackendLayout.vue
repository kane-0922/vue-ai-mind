<script setup>
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="backend-layout">
    <el-container class="main-container">
      <Sidebar></Sidebar>
      <el-container>
        <el-header>
          <Navbar></Navbar>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.backend-layout {
  height: 100vh;

  .main-container {
    height: 100%;
  }

  .navbar {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    background: white;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    border-bottom: 1px solid #e5e7eb;
  }

  .main-content {
    flex: 1;

    .content-container {
      padding: 20px;
      background-color: #fff;
      min-height: calc(100% - 74px);
    }
  }
}
</style>
