<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="评分" prop="star">
    <el-rate
        v-model="ruleForm.star"
        show-score
        text-color='#ff9900'
        :colors="colors">
    </el-rate>
  </el-form-item>
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
        content: '',
        star: 5
      },
      rules: {
        star: [
          { required: true, message: '请评分', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写评论内容', trigger: 'blur' }
        ]
      },
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'] // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }

    }
  },
  props: {
    courseId: Number
  },
  methods: {
    submitForm (formName) {
      console.log(this.courseId)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios(
            {
              method: 'put',
              url: '/api/comment/insertCommentForCourse',
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              params: {
                content: this.ruleForm.content,
                createUser: 3,
                courseId: this.courseId
              }
            }).then(res => {
            if (res.data.code === 1) {
              this.$axios({
                method: 'put',
                url: '/api/courseStar/insertOrUpdateCourseStar',
                params: {
                  star: this.ruleForm.star,
                  courseId: this.courseId,
                  userId: 3
                },
                headers: {
                  'Content-Type': 'multipart/form-data'
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
        width: 100%;
        border: 1px solid @first-border;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        padding: 10px
    }
</style>
