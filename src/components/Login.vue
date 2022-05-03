<template>
<!-- 登录表单容器 -->
<div class="login-container">
    <!-- 登录标题 -->
    <el-row>
    <el-col :span="24">登录</el-col>
    </el-row>
    <div style="margin: 20px;"></div>
    <!-- 登录表单 -->
    <el-form label-position="top" label-width="80px" :model="loginForm" :rules="rules" ref="loginForm" status-icon>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verti_code">
          <div class="captcha-container">
            <el-input v-model="loginForm.verti_code" autocomplete="off" style="width:45%"></el-input>
            <div style="width:65%"><img :src="captcha.captchaImg" width="50%"> <el-button type="text" @click="updateCaptcha">更新图片</el-button></div>
          </div>
        </el-form-item>
        <!-- 底层按钮 -->
        <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
    </el-form>

</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
    // 表单对象
      loginForm: {
        username: '',
        password: '',
        verti_code: ''
      },
      // 验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        verti_code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      captcha: null
    }
  },
  methods: {
    //   表单提交方法
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            url: '/api/user/login',
            params: {
              account: this.loginForm.username,
              password: this.loginForm.password,
              vrcode: this.loginForm.verti_code,
              key: this.captcha.key
            },
            method: 'post'
          }).then((res) => {
            console.log(res)
            this.$store.commit('$_setToken', res.data.data.token)
            this.$store.commit('$_setUser', res.data.data.user)
            this.$store.commit('$_setRole', res.data.data.role)
            this.$router.push({ name: 'Index' })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 表单重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    updateCaptcha () {
      this.$axios.get('/api/user/captcha').then(res => {
        console.log(res)
        this.captcha = res.data.data
      })
    }
  },
  mounted () {
    this.updateCaptcha()
  }
}

</script>

<style lang="less" scoped>
.login-container{
    background-color: rgba(225,255,255, 0.8);
    width: 30%;
    height: 60%;
    border-radius: 10px;
    padding: 50px;
    .el-col{
        text-align: center;
    }

    .el-form-item:nth-child(3) {
      .captcha-container{
      display: flex;
      flex-direction: row;
      }

    }
}
</style>
