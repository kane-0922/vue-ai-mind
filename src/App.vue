<script setup></script>

<template>
  <div>
    <template>
      <div class="common-layout">
        <el-container>
          <el-aside width="200px">Aside</el-aside>
          <el-container>
            <el-header>Header</el-header>
            <el-main>Main</el-main>
          </el-container>
        </el-container>
      </div>
    </template>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
