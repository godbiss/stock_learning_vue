<template>
  <el-upload
  class="upload-demo"
  drag
  action="/api/video/uploads"
  multiple :on-success="handleSuccess" :on-remove="handleRemove">
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传视频文件,视频名称按逗号隔开</div>
</el-upload>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    handleSuccess (response, file, fileList) {
      console.log(response)
      console.log('fileList', fileList)
      this.$emit('fileList', fileList)
    },

    handleRemove (file, fileList) {
      console.log('remove file:', file.response)
      console.log(fileList)
      this.$emit('fileList', fileList)
    }
  }
}
</script>

<style lang='less' scoped>

</style>
