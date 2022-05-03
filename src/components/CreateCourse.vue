<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="课程名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="课程简介" prop="info">
    <el-input type="textarea" v-model="ruleForm.info"></el-input>
  </el-form-item>
  <el-form-item label="课程内容" prop="content">
    <el-input type="textarea" v-model="ruleForm.content"></el-input>
  </el-form-item>
  <el-form-item label="课程价格" prop="price">
    <el-input v-model="ruleForm.price"></el-input>
  </el-form-item>
    <el-form-item label="课程封面" prop="imgFile">
        <input type="file" @change="handleFileChange"/>
  </el-form-item>
  <el-form-item label="课程类型" prop="catagory">
    <el-radio-group v-model="ruleForm.catagory">
      <el-radio :label="item.id" v-for="item in catagoryList" :key="item.id">{{ item.name }}</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        content: '',
        info: '',
        price: '',
        imgFile: '',
        catagory: ''

      },
      rules: {
        name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写课程内容', trigger: 'blur' }
        ],
        info: [
          { required: true, message: '请填写课程简介', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请填写课程价格', trigger: 'blur' }
        ],
        imgFile: [
          { required: true, trigger: 'blur' }
        ],
        catagory: [
          { required: true, message: '请选择一个课程类型' }
        ]
      }

    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = new FormData()
          formData.append('name', this.ruleForm.name)
          formData.append('content', this.ruleForm.content)
          formData.append('info', this.ruleForm.info)
          formData.append('price', this.ruleForm.price)
          formData.append('createUser', this.$store.state.user.id)
          formData.append('catagoryId', this.ruleForm.catagory)
          formData.append('imgFile', this.ruleForm.imgFile)
          this.$axios({
            method: 'post',
            url: '/api/course/insertCourse',
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            data: formData
            // params: {
            //   imgFile: this.ruleForm.imgFile
            // }
          }).then((res) => {
            console.log(res)
            if (res.data.code === 1) {
              this.$notify({
                title: '成功',
                message: '插入课程成功',
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
  },
  props: {
    catagoryList: Array
  }
}
</script>

<style lang='less' scoped>

</style>
