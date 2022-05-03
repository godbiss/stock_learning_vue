<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="userName">
    <el-input type="text" v-model="ruleForm.userName"></el-input>
  </el-form-item>
    <el-form-item label="账号" prop="account">
    <el-input type="text" v-model="ruleForm.account"></el-input>
  </el-form-item>
    <el-form-item label="用户头像" prop="imgFile">
        <el-avatar fit="fill" :size="40" :src="user.avator"></el-avatar>
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
        phoneNumber: ''
      },
      rules: {
        userName: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请填写账号', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '请填写电话号', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    user: Object
  },
  mounted () {
    this.ruleForm.userName = this.user.userName
    this.ruleForm.account = this.user.account
    this.ruleForm.phoneNumber = this.user.phoneNumber
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = new FormData()
          formData.append('id', this.user.id)
          formData.append('userName', this.ruleForm.userName)
          formData.append('account', this.ruleForm.account)
          formData.append('avator', this.user.avator)
          formData.append('imgFile', this.ruleForm.imgFile)
          formData.append('phoneNumber', this.ruleForm.phoneNumber)
          formData.append('createUser', this.user.createUser)
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
                message: '更新用户成功',
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
