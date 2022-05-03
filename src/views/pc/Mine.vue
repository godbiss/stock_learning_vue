<template>
    <main-page>
        <div class="user-info-wrapper">
            <div class="user-info">
                <el-descriptions title="用户信息" :column="3" border>
                    <el-descriptions-item label="账号">{{ $store.state.user.account }}</el-descriptions-item>
                    <el-descriptions-item label="用户名">{{ $store.state.user.userName }}</el-descriptions-item>
                    <el-descriptions-item label="手机号">{{ $store.state.user.phoneNumber }}</el-descriptions-item>
                    <el-descriptions-item label="头像"><el-avatar fit="fill" :size="40" :src="$store.state.user.avator"></el-avatar></el-descriptions-item>
                    <el-descriptions-item label="余额">{{ $store.state.user.money }}元</el-descriptions-item>
                    <el-descriptions-item label="上次登录时间">{{ $store.state.user.lastLoginTime }}</el-descriptions-item>
                </el-descriptions>
            </div>
            <div class="user-info">
                <div class="info-title"><h3>创建的课程</h3></div>
                <el-table
                    :data="courselist"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="name"
                    label="课程名">
                    </el-table-column>
                    <el-table-column
                    prop="price"
                    label="价格">
                    </el-table-column>
                    <el-table-column
                    prop="createtime"
                    label="创建日期">
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleUpdate(scope.row)" type="text" size="small">更新</el-button>
                        <el-button @click="handleRemove(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="user-info">
                <div class="info-title"><h3>创建的文章</h3></div>
                <el-table
                    :data="newsList"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="title"
                    label="标题">
                    </el-table-column>
                    <el-table-column
                    prop="author"
                    label="作者">
                    </el-table-column>
                    <el-table-column
                    prop="createtime"
                    label="创建日期">
                    </el-table-column>
                    <el-table-column
                    prop="updatetime"
                    label="更新日期">
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleNewsUpdate(scope.row)" type="text" size="small">更新</el-button>
                        <el-button @click="handleNewsRemove(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class='user-info'>
              <div class="info-title"><h3>已购买的课程</h3></div>
                <el-table
                    :data="courseBuylist"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="name"
                    label="课程名">
                    </el-table-column>
                    <el-table-column
                    prop="price"
                    label="价格">
                    </el-table-column>
                    <el-table-column
                    prop="createtime"
                    label="创建日期">
                    </el-table-column>
                </el-table>
            </div>
            <div class="action-button">
                <!-- Form -->
                <el-button type="primary" @click="insertCourseFormVisible = true">添加课程</el-button>
                <el-button type="primary" @click="insertNewsFormVisible = true">创作文章</el-button>
                <el-button @click="quitLogin">退出登录</el-button>
            </div>
        </div>

        <el-dialog title="添加课程" :visible.sync="insertCourseFormVisible">
            <create-course :catagoryList="catagoryList" :key="key"></create-course>
            <div slot="footer" class="dialog-footer">
                <el-button @click="insertCourseFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="更新课程" :visible.sync="updateCourseFormVisible">
            <update-course :catagoryList="catagoryList" :course="updateItem" :key='key'></update-course>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateCourseFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="发表文章" :visible.sync="insertNewsFormVisible">
            <create-news-form></create-news-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="insertNewsFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="更新文章" :visible.sync="updateNewsFormVisible">
          <update-news-form :news="updateNewsItem" :key="newskey"></update-news-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateNewsFormVisible = false; updateNewsItem = null">取 消</el-button>
            </div>
        </el-dialog>
    </main-page>
</template>

<script>
import CreateCourse from '../../components/CreateCourse.vue'
import CreateNewsForm from '../../components/CreateNewsForm.vue'
import MainPage from '../../components/MainPage.vue'
import UpdateCourse from '../../components/UpdateCourse.vue'
import UpdateNewsForm from '../../components/UpdateNewsForm.vue'
export default {
  components: { MainPage, CreateCourse, UpdateCourse, CreateNewsForm, UpdateNewsForm },
  data () {
    return {
      insertCourseFormVisible: false,
      courselist: [],
      catagoryList: [],
      key: '',
      updateCourseFormVisible: false,
      updateItem: null,
      courseBuylist: [],
      insertNewsFormVisible: false,
      newsList: [],
      updateNewsFormVisible: false,
      updateNewsItem: null,
      newskey: ''
    }
  },
  methods: {
    quitLogin () {
      this.$store.commit('$_removeStorage')
      this.$store.commit('$_removeUser')
      this.$store.commit('$_removeRole')
      this.$router.push('/')
    },
    initKey () {
      this.key = Math.random() + '' + new Date().getTime()
    },
    initNewsKey () {
      this.newskey = Math.random() + '' + new Date().getTime()
    },
    handleUpdate (row) {
      console.log('row', row)
      this.updateItem = row
      this.updateCourseFormVisible = true
      this.initKey()
    },
    handleRemove (row) {
      console.log(row)
      this.$axios.delete('/api/course/deleteCourse/' + row.id).then(res => {
        console.log(res)
        if (res.data.code === 1) {
          this.$notify({
            title: '成功',
            message: '删除课程成功',
            type: 'success'
          })
          location.reload()
        }
      })
    },
    handleNewsUpdate (row) {
      console.log('handleNewsUpdate', row)
      this.updateNewsItem = row
      this.updateNewsFormVisible = true
      this.initNewsKey()
    },
    handleNewsRemove (row) {
      console.log('handleNewsRemove', row)
      this.$axios.delete('/api/news/deleteNewsById/' + row.id).then(res => {
        console.log(res)
        if (res.data.code === 1) {
          this.$notify({
            title: '成功',
            message: '删除文章成功',
            type: 'success'
          })
          location.reload()
        }
      })
    }
  },
  mounted () {
    this.$axios.get('/api/course/listByUser/' + this.$store.state.user.id).then(res => {
      console.log(res)
      this.courselist = res.data.data
    })
    this.$axios.get('/api/catagory/listAll').then(res => {
      console.log(res)
      this.catagoryList = res.data.data
      this.initKey()
    })
    this.$axios.get('/api/course/listBuyCourse/' + this.$store.state.user.id).then(res => {
      console.log('listBuyCourse', res)
      this.courseBuylist = res.data.data
    })
    this.$axios.get('/api/news/getNewsByUser/' + this.$store.state.user.id).then(res => {
      console.log('getNewsByUser', res)
      this.newsList = res.data.data
    })
  }
}
</script>

<style lang='less' scoped>
@import '../../less/const.less';
    .user-info-wrapper{
        width: 100%;
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .user-info {
            width: 60%;
            margin: 10px 0;
        }
        .action-button{
            margin: 10px 0;
            width: 60%;
            display: flex;
            justify-content: flex-end;
        }
    }

    .info-title {
        margin: 10px 0;

        h3{
        font-size: @mini-titile-word;
        }

    }
</style>
