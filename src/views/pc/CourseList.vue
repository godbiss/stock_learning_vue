<template>
    <MainPage>
        <div class="course-list-container">
            <button class="course-list-item" v-for="item in courseList" :key="item.id" @click="checkIsBuy(item)">
                <el-image
                style="height: 100%; width: 100%;"
                :src="item.cover"
                fit="cover">
                </el-image>

                <h3>{{ item.name }}</h3>
                <h3>价格: {{ item.price }}</h3>
            </button>
        </div>

        <el-dialog
      title="购买"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>{{ diaglogInfo }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false; diaglogInfo= null; diaglogItem = null">取 消</el-button>
        <el-button type="primary" @click="buyCourse()">确 定</el-button>
      </span>
    </el-dialog>
    </MainPage>
</template>

<script>
import MainPage from '@/components/MainPage.vue'
export default {
  components: {
    MainPage
  },
  data () {
    return {
      courseList: [],
      dialogVisible: false,
      diaglogInfo: null,
      diaglogItem: null
    }
  },
  mounted () {
    var id = this.$route.query.id
    this.$axios.get('/api/course/listByCatagory/' + id)
      .then((res) => {
        console.log(res)
        this.courseList = res.data.data
      })
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.diaglogInfo = null
          this.diaglogItem = null
          done()
        })
        .catch(_ => {})
    },
    checkIsBuy (item) {
      this.$axios.get('/api/course/checkIfBuy/' + this.$store.state.user.id + '/' + item.id)
        .then((res) => {
          console.log(res)
          if (res.data.code === 1) {
            this.$router.push({
              name: 'Course',
              query: {
                id: item.id
              }
            })
          } else {
            this.diaglogInfo = item.info
            this.dialogVisible = true
            this.dialogItem = item
          }
        })
    },
    buyCourse () {
      this.$axios({
        method: 'put',
        url: '/api/course/buy',
        params: {
          courseId: this.dialogItem.id,
          userId: this.$store.state.user.id
        }
      }).then((res) => {
        console.log(res)
        if (res.data.code === 1) {
          this.$axios.get('/api/user/getUserById/' + this.$store.state.user.id).then((res) => {
            console.log(res)
            this.$store.commit('$_setUser', res.data)
            this.$notify({
              title: '成功',
              message: '购买成功',
              type: 'success'
            })
            this.$router.push({ name: 'Course', query: { id: this.dialogItem.id } })
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: '购买失败'
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import '../../less/const.less';
    .course-list-container {
        display: flex;
        flex-direction: row;
        padding: 10px;
        flex-wrap: wrap;

        .course-list-item {
            margin: 5px 50px;
            width: 17vw;
            height: 50vh;
            align-items: center;
            display: flex;
            justify-content: center;
            flex-direction: column;
            border: 0;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            padding: 10px;

            text-decoration: none;
            h3 {
                color: @main-text-color;
                font-size: @title-word;
            }
        }
    }
</style>
