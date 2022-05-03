<template>
  <main-page>
    <el-container direction='vertical' class="main-container">
    <div v-if="videoShow" class="video-show-container">
      <d-player ref="player" id="player" :options="options" class="d-player" :key='videoKey'></d-player>
    </div>
    <hr>
    <div class="video-page-title">
      选集
    </div>
        <hr>
    <div class="video-page-list-wraper">
      <div class="video-page-list">
      <div v-for="item in course.videoList" :key="item.id">
        <el-button @click="changeVideo(item.location)">{{item.name}}</el-button>
      </div>
      </div>
    </div>
    <hr>
    <div class="course-info-container-wraper">
    <div class="course-info-container">
      {{ course.course.content }}
    </div>
    </div>
    <hr>
    <div class="video-page-title">
      评分
    </div>
    <hr>
    <div class="course-info-container-wraper">
    <div class="course-info-container">
      <el-rate
        v-model="star"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value}">
      </el-rate>
    </div>
    </div>
        <hr>
    <div class="video-page-title">
      评论
    </div>
    <div class="course-info-container-wraper">
      <div class="course-info-container">
      <comment-form :courseId="course.course.id"></comment-form>
      </div>

    </div>

    <!-- 评论列表 -->
    <div class="course-info-container-wraper">
      <!-- 循环遍历父评论 -->
      <div class="course-info-container" v-for="item in comments" :key="item.comment.id">
        <el-divider></el-divider>
        <div class="course-info-container">
          <el-avatar fit="fill" :size="40" :src="item.user.avatar"></el-avatar> &nbsp;&nbsp; {{ item.user.userName }}
        </div>
          <div class="course-info-container">
            {{ item.comment.content }}
          </div>
          <div class="comment-time">
            <el-button type="text" @click="commentForComment(item)">回复</el-button>
              <el-button type="text" v-if="item.comment.createUser === $store.state.user.id" @click="removeComment(item)">删除</el-button>
              评论时间: {{ item.comment.createtime }}
          </div>
          <!-- 子评论 -->
          <el-collapse class="subcomment-container" :key="key" v-if="item.subcomments != null && item.subcomments.length > 0">
          <el-collapse-item title="展开评论" name="1">

              <div class="subcomment-container" v-for="subcomment in item.subcomments" :key="subcomment.id">
                <div class="subcomment-box">
                    <el-avatar fit="fill" :size="40" :src="subcomment.user.avatar"></el-avatar> &nbsp;&nbsp; {{ subcomment.user.userName }}
                </div>
                    <div class="subcomment-box">
                      {{ subcomment.comment.content }}
                    </div>
                <div class="comment-time">
                  <el-button type="text" v-if="subcomment.comment.createUser === $store.state.user.id" @click="removeComment(subcomment)">删除</el-button>
                  评论时间: {{ subcomment.comment.createtime }}
                </div>
              </div>
          </el-collapse-item>
        </el-collapse>
          <el-divider></el-divider>
          <!-- 回复评论表单 -->
        <el-dialog title="回复评论" :key="commentDialogKey" :visible.sync="commentForCommentFormVisible">
            <comment-for-comment-form :fid="fid"></comment-for-comment-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="commentForCommentFormVisible = false; fid=''">取 消</el-button>
            </div>
        </el-dialog>
      </div>
    </div>
    </el-container>

  </main-page>
</template>

<script>
import MainPage from '../../components/MainPage.vue'
import CommentForm from '../../components/CommentForm.vue'
import CommentForCommentForm from '../../components/commentForCommentForm.vue'
export default {
  components: { MainPage, CommentForm, CommentForCommentForm },
  data () {
    return {
      course: null,
      star: 0,
      options: {},
      videoShow: false,
      videoKey: '',
      comments: [],
      commentForCommentFormVisible: false,
      key: '',
      commentDialogKey: '',
      fid: ''
    }
  },
  methods: {
    initPlayer () {
      this.options = {
        container: document.getElementById('dplayer'), // 播放器容器
        mutex: false, //  防止同时播放多个用户，在该用户开始播放时暂停其他用户
        theme: '#b7daff', // 风格颜色，例如播放条，音量条的颜色
        loop: false, // 是否自动循环
        lang: 'zh-cn', // 语言，'en', 'zh-cn', 'zh-tw'
        screenshot: true, // 是否允许截图（按钮），点击可以自动将截图下载到本地
        hotkey: true, // 是否支持热键，调节音量，播放，暂停等
        preload: 'auto', // 自动预加载
        volume: 0.7, // 初始化音量
        playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2, 3], // 可选的播放速度，可自定义
        logo:
          'https://qczh-1252727916.cos.ap-nanjing.myqcloud.com/pic/273658f508d04d488414fd2b84c9f923.png', // 在视频左上角上打一个logo
        video: {
          url:
            this.course.videoList[0].location, // 播放视频的路径
          thumbnails:
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg' // 进度条上的缩略图,需要通过dplayer-thumbnails来生成
        },
        // subtitle: {
        //   //字幕
        //   url: "", //字幕网址
        //   color: "#fff", //字幕颜色
        //   fontSize: "20px",
        //   bottom: "40px"
        // },
        contextmenu: [
          //  自定义上下文菜单
          // 右键菜单
          {
            text: 'b站',
            link: 'https://www.bilibili.com'
          },
          {
            text: '选项二',
            click: player => {
              console.log(player)
            }
          }
        ]
      }

      this.videoShow = true

      this.initKey()
    },
    changeVideo (url) {
      this.options.video.url = url
      this.initKey()
    },
    // 组件重新渲染方法
    initKey () {
      this.videoKey = Math.random() + '' + new Date().getTime()
    },
    initCommentKey () {
      this.key = Math.random() + '' + new Date().getTime()
    },
    initCommentDialogKey () {
      this.commentDialogKey = Math.random() + '' + new Date().getTime()
    },
    removeComment (item) {
      console.log('removeComment', item)
      this.$axios.delete('/api/comment/deleteComment/' + item.comment.id)
        .then(res => {
          console.log('deleteComment', res)
          if (res.data.code === 1) {
            this.$axios.delete('/api/courseStar/deleteCourseByCourseAndUser/' + this.course.course.id + '/' + this.$store.state.user.id)
            this.$notify({
              title: '成功',
              message: '删除评论成功!',
              type: 'success'
            })
            location.reload()
          }
        })
    },
    commentForComment (item) {
      console.log('commentForComment', item)
      this.initCommentDialogKey()
      this.fid = item.comment.id
      this.commentForCommentFormVisible = true
    }
  },
  mounted () {
    var id = this.$route.query.id
    // 获取课程以及附带的视频
    this.$axios.get('/api/course/getOneWithVideo/' + id)
      .then(res => {
        console.log(res)
        this.course = res.data.data
        this.initPlayer()
      })
      // 获取评分
    this.$axios.get('/api/courseStar/getAverageCourseStarByCourse/' + id)
      .then(res => {
        console.log(res)
        this.star = res.data.data
      })
    // 获取课程评论
    this.$axios.get('/api/comment/getCommentByCourse/' + id)
      .then(res => {
        console.log(res)
        this.comments = res.data.data
        this.comments.forEach((item, index, array) => {
          this.$axios.get('/api/comment/getCommentByFid/' + item.comment.id)
            .then(res => {
              console.log('getCommentByFid', res)
              this.initKey()
              if (res.data.code === 1) {
                item.subcomments = res.data.data
              }
            })
        })
        console.log(this.comments)
      })
  }
}
</script>

<style lang='less' scoped>
@import '../../less/const.less';
  .main-container {
    .video-show-container {
        width: 100%;
        height: 50vh;
        justify-content: center;
        display: flex;
        align-items: center;
        .d-player {
          width: 55%;
          height: 100%
        }
      }

      .video-page-title{
          margin-left: 20vw;
          color: @brand-color;
      }
      .video-page-list-wraper{
        width: 100%;
        align-items: center;
        display: flex;
        justify-content: center;
        .video-page-list{
          width: 60%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          div {
            margin: 0 10px;
            width: 17vw;
            .el-button{
              width: 100%;
            }
          }
        }
      }

      .course-info-container-wraper {
        width: 100%;
        align-items: center;
        display: flex;
        justify-content: center;
        flex-direction: column;

        .course-info-container{
          width: 60%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;

          color: @main-text-color;
          font-size: @main-word;

          margin-top: 10px
        }
      }

      .comment-time {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;

          color: @main-text-color;
          font-size: @main-word;
      }

    .subcomment-container {
      width: 100%;
      .subcomment-box {
          width: 60%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;

          color: @main-text-color;
          font-size: @main-word;

          margin-top: 10px
      }
    }
  }
</style>
