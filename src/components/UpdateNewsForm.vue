<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="标题" prop="title">
    <el-input type="text" v-model="ruleForm.title"></el-input>
  </el-form-item>
    <el-form-item label="作者" prop="author">
    <el-input type="text" v-model="ruleForm.author"></el-input>
  </el-form-item>
  <el-form-item label="内容" prop="content">
    <el-input type="textarea" v-model="ruleForm.content"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">更新文章</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        title: '',
        author: '',
        content: ''
      },
      rules: {
        content: [
          { required: true, message: '请填写评论内容', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请填写文章标题', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请填写作者名称', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    news: Object
  },
  mounted () {
    this.ruleForm.title = this.news.title
    this.ruleForm.author = this.news.author
    this.ruleForm.content = this.news.content
  },
  methods: {
    submitForm (formName) {
      console.log(this.courseId)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios(
            {
              method: 'put',
              url: '/api/news/insertOrUpdate',
              params: {
                id: this.news.id,
                title: this.ruleForm.title,
                author: this.ruleForm.author,
                content: this.ruleForm.content,
                createUser: this.$store.state.user.id,
                updateUser: this.$store.state.user.id
              }
            }).then(res => {
            if (res.data.code === 1) {
              this.$notify({
                title: '成功',
                message: '更新文章成功',
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

</style>
