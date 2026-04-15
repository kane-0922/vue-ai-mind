<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '页面标题'
  }
})
</script>

<template>
  <div class="page-head">
    <p class="page-title">{{ props.title }}</p>
    <div class="action-btn">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;

  .page-title {
    font-size: 24px;
    color: #2d3748;
  }
}
</style>
