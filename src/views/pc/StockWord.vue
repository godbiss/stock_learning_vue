<template>
    <el-container class="stock-word-main-container">
        <Header title="STOCK LEARN" @search_res='getRes'></Header>
        <el-main class="info-wraper">
            <div class="info-container" v-for=" map in newslist" :key="map['id']">
                <h3>{{ map['term'] }}</h3>
                <div style="white-space: pre-line">{{ map['content'] }}</div>
            </div>

        </el-main>
    </el-container>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  data () {
    return {
      newslist: ''
    }
  },
  components: {
    Header
  },
  methods: {
    getRes (newslist) {
      if (newslist !== '') {
        this.newslist = newslist
        this.newslist.forEach((item, index, array) => {
          this.newslist[index].content = item.content.replaceAll('　　', '\n')
        })
        console.log(this.newslist)
      }
    }
  },
  mounted () {
    console.log(this.$route.params.data)
    this.newslist = this.$route.params.data
    if (this.$route.params.data === '' || this.$route.params.data === null) {
      this.getRes()
    }
    this.newslist.forEach((item, index, array) => {
      this.newslist[index].content = item.content.replaceAll('　　', '\n')
    })
  }
}
</script>

<style lang='less' scoped>
@import '../../less/const.less';
    .stock-word-main-container {
        .info-wraper{
            margin-top: 5vh;
            color: @regular_text-color;
            font-size: @main-word;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .info-container {
               width: 60%;
               box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
               padding: 0 20px;
               padding-bottom: 20px;
               margin: 20px 0;
            }
        }
    }
</style>
