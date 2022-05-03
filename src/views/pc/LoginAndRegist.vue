<template>
    <el-container>
        <el-main v-if="isShow">
            <Login />
            <el-button type="primary" @click="changeShow">changeToRegist</el-button>
        </el-main>
        <el-main v-else>
            <Regist />
            <el-button type="primary" @click="changeShow">changeToLogin</el-button>
        </el-main>

    </el-container>
</template>

<script>
import Login from '@/components/Login.vue'
import Regist from '@/components/Regist.vue'
export default {
  name: 'LoginAndRegist',
  data () {
    return {
      isShow: true
    }
  },
  components: {
    Login,
    Regist
  },
  methods: {
    changeShow: function () {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="less" scoped>
    .el-container{
        height: 100vh;
        .el-main{
            height: 100%;
            background: url(../../assets/bg.png);
            background-size: cover;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
        }
    }
</style>
