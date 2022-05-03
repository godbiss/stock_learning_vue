<template>
  <div class="header-container">
      <el-row>
        <el-col :span="6"><router-link :to="{ name:'Index' }">{{ title }}</router-link></el-col>
        <!-- header搜索框 -->
        <el-col :span="10">  <el-input placeholder="请输入内容" v-model="search" class="search-input">
      <el-select v-model="search_select" slot="prepend" placeholder="请选择">
      <el-option label="课程" value="1"></el-option>
      <el-option label="股票" value="2"></el-option>
      <el-option label="新闻" value="3"></el-option>
      <el-option label="股票术语" value="4"></el-option>
    </el-select>
      <el-button slot="append" icon="el-icon-search" @click="search_method"></el-button>
      </el-input>
      </el-col>
      <el-col :span="8">
        <div class="user-display" v-if="isLogin">
          <el-avatar fit="fill" :size="40" :src="$store.state.user.avator"></el-avatar>
          <router-link :to="{ name:'Mine' }">{{ username }}</router-link>
        </div>
        <div v-else>
          <router-link :to="{ name : 'LoginAndRegist'}">当前未登录</router-link>
        </div>
      </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      search: '',
      avatar_url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F34%2F06%2F02%2F34060280461dac760313c6edf37998e6.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653539151&t=430e1b204417f3327e518ae7be324bb6',
      isLogin: true,
      search_select: '',
      username: ''
    }
  },
  props: {
    title: String
  },
  mounted () {
    if (this.$store.state.user === null) {
      this.isLogin = false
    } else {
      this.username = this.$store.state.user.userName
    }
  },
  methods: {
    search_method () {
      console.log(this.search_select)
      if (this.search_select !== '' && this.search !== '') {
        // eslint-disable-next-line eqeqeq
        if (this.search_select == 2) {
          // 发送查询股票信息ajax
          this.$axios.get('/stockFinance?key=ce6f2c1ec17e44b4f483350ef013d1a6' + '&code=' + this.search + '&list=1')
            .then((res) => {
              console.log(res)
              // 查询成功后跳转
              this.$router.push({
                name: 'Stock',
                params: {
                  data: res.data.newslist
                }
              }).catch((err) => {
                console.log(err)
                // 如在同一界面则向父传参
                this.$emit('search_res', res.data.newslist)
              })
            })
        }

        // eslint-disable-next-line eqeqeq
        if (this.search_select == 3) {
          // 发送查询课程信息ajax
          this.$axios.get('/api/news/getNewsByTitle/' + this.search)
            .then((res) => {
              console.log(res)
              // 查询成功后跳转
              this.$router.push({
                name: 'News',
                params: {
                  data: res.data.data
                }
              }).catch((err) => {
                console.log(err)
                // 如在同一界面则向父传参
                this.$emit('search_res', res.data.data)
              })
            })
        }

        // eslint-disable-next-line eqeqeq
        if (this.search_select == 4) {
          this.$axios.get('/stockWord?key=ce6f2c1ec17e44b4f483350ef013d1a6' + '&word=%' + this.search + '%')
            .then((res) => {
              console.log(res)
              this.$router.push({
                name: 'StockWord',
                params: {
                  data: res.data.newslist
                }
              }).catch((err) => {
                console.log(err)
                // 如在同一界面则向父传参
                this.$emit('search_res', res.data.newslist)
              })
            })
        }
      }
    }
  }
}
</script>

<style lang='less'>
@import '../less/const.less';
    .header-container {
        position: fixed;
        width: 100%;
        height: 5vh;
        line-height: 5vh;
        border-bottom: 1px solid @first-border;
        background-color: #fff;
        z-index: 99;

        .el-col:nth-child(1) {
          text-align: center;
          color: @brand-color;
          a {
          color: @brand-color;
          text-decoration: none;
          }
        }

      .search-input {
        .el-input__inner{
          height: 4vh
        }
        .el-select {
          width: 7vw;
        }
      }

      .el-col:nth-child(3) {
        height: 100%;
        text-align: center;

        .user-display{
          display: flex;
          justify-content: center;
          height: 100%;
          color: @regular_text-color;
          .el-avatar {
            height: 100%;
          }
        }

        a {
          color: @regular_text-color;
          text-decoration-line: none;
        }
      }
    }
</style>
