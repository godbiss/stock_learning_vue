<template>
<el-container class="main-container">
  <el-header class="header-container">
      <el-row>
        <el-col :span="6">STOCK LEARN</el-col>
        <!-- header搜索框 -->
        <el-col :span="10" style="text-align:center">  管理员控制台
      </el-col>
      <el-col :span="8">
        <div class="user-display" v-if="isLogin">
          <el-avatar fit="fill" :size="40" :src="$store.state.user.avator"></el-avatar>
          <router-link :to="{ name:'Mine' }">{{ username }}</router-link>
        </div>
        <div v-else>
          <router-link :to="{ name : 'LoginAndRegist'}">当前未登录</router-link>
        </div>
      </el-col>
      </el-row>
  </el-header>
  <el-container class="body-container">
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <el-menu
      class="el-menu-vertical-demo"
      router
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" :route="{name : 'UserList'}">用户列表</el-menu-item>
          <el-menu-item index="1-2" :route="{name : 'UserRole'}">用户权限</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>角色管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1" :route="{name : 'UserList'}">用户列表</el-menu-item>
          <el-menu-item index="2-2" :route="{name : 'UserRole'}">用户权限</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <!-- 主界面 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      isLogin: true,
      avatar_url: '',
      username: ''
    }
  },
  mounted () {
    if (this.$store.state.user === null) {
      this.isLogin = false
    } else {
      this.username = this.$store.state.user.userName
      this.avatar_url = this.$store.state.user.avatar
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }

}
</script>

<style lang='less' scoped>
@import '../../../less/const.less';
  .main-container {
    width: 100%;
    height: 100vh;

    .header-container {
        position: relative;
        width: 100%;
        height: 5vh;
        line-height: 5vh;
        border-bottom: 1px solid @first-border;
        background-color: #fff;
        z-index: 99;
        padding: 10px 0;

        .el-col:nth-child(1) {
          text-align: center;
          color: @brand-color;
          a {
          color: @brand-color;
          text-decoration: none;
          }
        }

      .el-col:nth-child(3) {
        height: 100%;
        text-align: center;

        .user-display{
          display: flex;
          justify-content: center;
          height: 100%;
          color: @regular_text-color;
          .el-avatar {
            height: 100%;
          }
        }

        a {
          color: @regular_text-color;
          text-decoration-line: none;
        }
      }
    }

    .body-container {
      .el-menu-vertical-demo {
        height: 100%;
      }
    }
  }
</style>
