<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-menu-item v-for="item in router.options.routes[0].children" :key="item.path" :index="item.path">
        <el-icon>
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
