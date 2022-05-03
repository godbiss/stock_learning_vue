<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="userName">
    <el-input type="text" v-model="ruleForm.userName"></el-input>
  </el-form-item>
    <el-form-item label="账号" prop="account">
    <el-input type="text" v-model="ruleForm.account"></el-input>
  </el-form-item>
    <el-form-item label="密码" prop="password">
    <el-input type="text" v-model="ruleForm.password"></el-input>
  </el-form-item>
    <el-form-item label="用户头像" prop="imgFile">
        <input type="file" @change="handleFileChange"/>
  </el-form-item>
  <el-form-item label="电话号" prop="phoneNumber">
    <el-input type="text" v-model="ruleForm.phoneNumber"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        userName: '',
        account: '',
        imgFile: '',
        phoneNumber: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请填写账号', trigger: 'blur' }
        ],
        imgFile: [
          { required: true, trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '请填写电话号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = new FormData()
          formData.append('userName', this.ruleForm.userName)
          formData.append('account', this.ruleForm.account)
          formData.append('imgFile', this.ruleForm.imgFile)
          formData.append('phoneNumber', this.ruleForm.phoneNumber)
          formData.append('password', this.ruleForm.password)
          formData.append('createUser', this.$store.state.user.id)
          formData.append('updateUser', this.$store.state.user.id)
          this.$axios(
            {
              method: 'put',
              url: '/api/user/insertUser',
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              data: formData
            }).then(res => {
            if (res.data.code === 1) {
              this.$notify({
                title: '成功',
                message: '添加用户成功',
                type: 'success'
              })
              location.reload()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleFileChange (e) {
      const file = e.target.files
      this.ruleForm.imgFile = file[0]
      console.log(file, '单文件流文件流')
    }
  }
}
</script>

<style lang='less' scoped>

</style>
