<template>
  <el-main class="content">

      <router-view/>

  </el-main>
</template>

<script>
export default {
  name: 'Content'
}
</script>

<style>
.content {
  background-color: #f1f4f5;
}

.card {
  height: 100%;
}
</style>