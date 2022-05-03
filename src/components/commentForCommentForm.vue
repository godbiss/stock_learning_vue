<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="评论内容" prop="content">
    <el-input type="textarea" v-model="ruleForm.content"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">发表评论</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        content: ''
      },
      rules: {
        content: [
          { required: true, message: '请填写评论内容', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    fid: Number
  },
  methods: {
    submitForm (formName) {
      console.log(this.courseId)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios(
            {
              method: 'put',
              url: '/api/comment/insert',
              params: {
                content: this.ruleForm.content,
                createUser: this.$store.state.user.id,
                fid: this.fid
              }
            }).then(res => {
            if (res.data.code === 1) {
              this.$notify({
                title: '成功',
                message: '发表评论成功',
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
    }
  }
}
</script>

<style lang='less' scoped>
@import '../less/const.less';
    .demo-ruleForm {
        width: 95%;
        border: 1px solid @first-border;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        padding: 10px
    }
</style>
