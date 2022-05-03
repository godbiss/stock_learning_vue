<template>
  <el-table
    :data="videoList"
    border
    style="width: 100%" :key="key">
    <el-table-column
      prop="name"
      label="视频名">
    </el-table-column>
    <el-table-column
      prop="createtime"
      label="创建时间">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  methods: {
    handleClick (row) {
      console.log(row)
      this.$axios.delete('/api/video/delete/' + row.id)
        .then(res => {
          console.log(res)
          if (res.data.code === 1) {
            this.$notify({
              title: '成功',
              message: '删除视频成功',
              type: 'success'
            })

            this.$axios.get('/api/video/listVideoByCourse/' + this.courseId).then(res => {
              console.log(res.data)
              this.videoList = res.data
              this.initKey()
            })
          }
        })
    },
    initKey () {
      this.key = Math.random() + '' + new Date().getTime()
    }
  },

  data () {
    return {
      videoList: null,
      key: ''
    }
  },
  mounted () {
    this.$axios.get('/api/video/listVideoByCourse/' + this.courseId).then(res => {
      console.log(res.data)
      this.videoList = res.data
    })
  },
  props: {
    courseId: Number
  }
}
</script>

<style lang='less' scoped>
</style>
