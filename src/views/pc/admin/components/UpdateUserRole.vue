<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="userName">
    <el-input disabled type="text" v-model="ruleForm.userName"></el-input>
  </el-form-item>
  <el-form-item label="角色" prop="roleId">
    <el-radio-group v-model="ruleForm.roleId">
        <el-radio :label="item.id" v-for="item in rolelist" :key="item.id">{{ item.roleName }}</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
  </el-form-item>
</el-form>
</template>

<script>
export default {
  data () {
    return {
      rolelist: [],
      ruleForm: {
        userName: '',
        roleId: ''
      },
      rules: {
        userName: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ]
      }
    }
  },
  props: {
    userRole: Object
  },
  mounted () {
    this.$axios.get('/api/role/list').then(res => {
      console.log('rolelist', res)
      this.rolelist = res.data.data
    })
    this.ruleForm.userName = this.userRole.user.userName
    this.ruleForm.roleId = this.userRole.role.id
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/api/user/alterUserRole',
            params: {
              userId: this.userRole.user.id,
              roleId: this.ruleForm.roleId
            }
          }).then(res => {
            console.log('alterUserRole', res)
            if (res.data.code === 1) {
              this.$notify({
                title: '成功',
                message: '修改用户角色成功',
                type: 'success'
              })
              location.reload()
            } else {
              this.$notify({
                title: '失败',
                message: '操作失败',
                type: 'warn'
              })
            }
          })
        } else {
          console.log('error submit!!')
          this.$notify({
            title: '失败',
            message: '操作失败',
            type: 'warn'
          })
          return false
        }
      })
    }

  }
}
</script>

<style lang='less' scoped>

</style>
