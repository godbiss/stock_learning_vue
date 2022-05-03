<template>
  <el-container direction='vertical' class="main-container">
    <Header title="STOCK LEARN"></Header>
    <el-main>
        <slot></slot>
    </el-main>
  </el-container>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  components: {
    Header
  }
}
</script>

<style lang='less' scoped>
    .main-container{
        .el-main{
            margin-top: 5vh;
            width: 100%;
        }
    }
</style>
