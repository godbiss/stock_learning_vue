<template>
  <!-- 注册表单容器 -->
<div class="regist-container">
    <!-- 注册标题 -->
    <el-row>
    <el-col :span="24">注册</el-col>
    </el-row>
    <div style="margin: 20px;"></div>
    <!-- 注册表单 -->
    <el-form label-position="top" label-width="80px" :model="registForm" :rules="rules" ref="registForm" status-icon>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="registForm.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
            <el-input v-model="registForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verti_code">
            <el-input v-model="registForm.verti_code" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 底层按钮 -->
        <el-form-item>
            <el-button type="primary" @click="submitForm('registForm')">提交</el-button>
            <el-button @click="resetForm('registForm')">重置</el-button>
        </el-form-item>
    </el-form>

</div>
</template>

<script>
export default {
  data () {
    return {
    // 表单对象
      registForm: {
        username: '',
        password: '',
        verti_code: ''
      },
      // 验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        verti_code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //   表单提交方法
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 表单重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.regist-container{
    background-color: rgba(225,255,255, 0.8);
    width: 30%;
    height: 65vh;
    border-radius: 10px;
    padding: 50px;
    .el-col{
        text-align: center;
    }
}
</style>
