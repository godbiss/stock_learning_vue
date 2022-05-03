<template>
    <el-container class="news-main-container">
        <Header title="STOCK LEARN" @search_res='getRes'></Header>
        <el-main class="news-info-wrapper">
          <div class="news-info-container" v-for="item in res" :key="item.news.id">
            <h3>{{ item.news.title }}</h3>
            <div class="news-auth-info">作者: &nbsp;{{item.news.author}}</div>
            <div class="news-content-info">{{ item.news.content }}</div>
            <div class="news-time-info"> {{ item.news.updatetime }} </div>
          </div>
        </el-main>
    </el-container>
</template>

<script>
import Header from '../../components/Header.vue'

export default {
  components: { Header },
  data () {
    return {
      res: ''
    }
  },
  methods: {
    getRes (res) {
      if (res !== '') {
        console.log(res)
        this.res = res
      }
    }
  },
  mounted () {
    console.log(this.$route.params.data)
    this.res = this.$route.params.data
    if (this.$route.params.data === '' || this.$route.params.data === null) {
      this.getRes()
    }
  }
}
</script>

<style lang='less' scoped>
@import '../../less/const.less';
    .news-main-container {
        .news-info-wrapper{
            margin-top: 5vh;
            color: @regular_text-color;
            font-size: @main-word;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .news-info-container {
               width: 60%;
               box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
               padding: 0 20px;
               padding-bottom: 20px;
               margin: 20px 0;
            }

            .news-content-info {
              width: 100%;
              white-space: pre-line;
              margin: 10px 0;
              word-wrap:break-word;
            }

            .news-time-info {
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
            }
        }
    }
</style>
