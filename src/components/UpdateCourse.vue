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
        <el-image :src="course.cover" style="width: 50%"></el-image>
        <input type="file" @change="handleFileChange"/>
  </el-form-item>
  <el-form-item label="课程类型" prop="catagory">
    <el-radio-group v-model="ruleForm.catagory">
      <el-radio :label="item.id" v-for="item in catagoryList" :key="item.id">{{ item.name }}</el-radio>
    </el-radio-group>
  </el-form-item>
    <el-form-item label="上传视频" prop='videoNames'>
      <upload-video @fileList="getFileList"></upload-video>
      <el-input v-model="ruleForm.videoNames"></el-input>
  </el-form-item>
    <el-form-item label="已有视频">
    <list-video-form :courseId="course.id"></list-video-form>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import ListVideoForm from './ListVideoForm.vue'
import UploadVideo from './UploadVideo.vue'
export default {
  components: { UploadVideo, ListVideoForm },
  data () {
    return {
      fileList: null,
      ruleForm: {
        name: '',
        content: '',
        info: '',
        price: '',
        imgFile: '',
        catagory: '',
        videoNames: ''
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
          formData.append('id', this.course.id)
          formData.append('name', this.ruleForm.name)
          formData.append('content', this.ruleForm.content)
          formData.append('info', this.ruleForm.info)
          formData.append('price', this.ruleForm.price)
          formData.append('createUser', this.$store.state.user.id)
          formData.append('catagoryId', this.ruleForm.catagory)
          if (this.imgFile !== '') {
            formData.append('imgFile', this.ruleForm.imgFile)
          } else {
            formData.append('imgFile', this.course.cover)
          }
          // 更新课程
          this.$axios({
            method: 'post',
            url: '/api/course/insertCourse',
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            data: formData
          }).then((res) => {
            console.log(res)
            if (res.data.code === 1) {
              if (this.fileList !== null) {
                const videoFormData = new FormData()
                videoFormData.append('fileLocations', this.fileList)
                videoFormData.append('fileNames', this.ruleForm.videoNames.split(','))
                videoFormData.append('courseId', this.course.id)
                // 更新视频
                this.$axios({
                  method: 'post',
                  url: '/api/video/insertVideos',
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  },
                  data: videoFormData
                }).then((res) => {
                  console.log(res)
                  this.$notify({
                    title: '成功',
                    message: '修改课程和视频成功',
                    type: 'success'
                  })
                  location.reload()
                })
              }
              console.log(res)
              this.$notify({
                title: '成功',
                message: '修改课程和视频成功',
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
    },
    getFileList (fileList) {
      console.log('getFileList:', fileList)
      this.fileList = []
      fileList.forEach(item => {
        this.fileList.push(item.response[0])
      })
      console.log('this.fileList', this.fileList)
    }
  },
  props: {
    catagoryList: Array,
    course: Object
  },
  mounted () {
    this.ruleForm.name = this.course.name
    this.ruleForm.content = this.course.content
    this.ruleForm.info = this.course.info
    this.ruleForm.price = this.course.price
    this.ruleForm.catagory = this.course.catagoryId
  }
}
</script>

<style lang='less' scoped>

</style>
