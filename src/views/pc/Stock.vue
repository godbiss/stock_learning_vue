<template>
    <el-container class="stock-main-container">
        <Header title="STOCK LEARN" @search_res='getRes'></Header>
        <el-main class="stock-info-wrapper">
            <div v-if="newslist !== ''" class="stock-info">
                <h3>搜索结果：{{ reskey }}</h3>
              <el-descriptions>
                  <el-descriptions-item label="股票信息">{{ resvalue[0] }}</el-descriptions-item>
                  <el-descriptions-item label="今日开盘价">{{ resvalue[1] }}</el-descriptions-item>
                  <el-descriptions-item label="昨日收盘价">{{ resvalue[2] }}</el-descriptions-item>
                  <el-descriptions-item label="最近成交价">{{ resvalue[3] }}</el-descriptions-item>
                  <el-descriptions-item label="最高成交价">{{ resvalue[4] }}</el-descriptions-item>
                  <el-descriptions-item label="最低成交价">{{ resvalue[5] }}</el-descriptions-item>
                  <el-descriptions-item label="买入价">{{ resvalue[6] }}</el-descriptions-item>
                  <el-descriptions-item label="卖出价">{{ resvalue[7] }}</el-descriptions-item>
                  <el-descriptions-item label="成交数量">{{ resvalue[8] }}</el-descriptions-item>
                  <el-descriptions-item label="成交金额">{{ resvalue[9] }}</el-descriptions-item>
              </el-descriptions>
              <el-button @click="switchPic(1)">分时图</el-button>
              <el-button @click="switchPic(2)">日k图</el-button>
              <el-button @click="switchPic(3)">周k图</el-button>
              <el-button @click="switchPic(4)">月k图</el-button>
                <el-image
                style="width: 100%"
                :src="picUrl"
                fit="fill"></el-image>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  components: {
    Header
  },
  data () {
    return {
      newslist: '',
      key: '',
      value: '',
      option_column: {},
      picUrl: ''
    }
  },
  computed: {
    reskey () {
      return Object.keys(this.newslist[0])[0]
    },
    resvalue () {
      return this.newslist[0][Object.keys(this.newslist[0])[0]].split(',')
    }
    // // eslint-disable-next-line vue/no-dupe-keys
    // option_column () {
    //   return {
    //     title: { text: this.reskey },
    //     tooltip: {},
    //     xAxis: {
    //       data: [this.resvalue[11], this.resvalue[13], this.resvalue[15], this.resvalue[17], this.resvalue[19], this.resvalue[21]]
    //     },
    //     yAxis: {},
    //     series: [
    //       {
    //         name: '价位',
    //         type: 'line',
    //         data: [this.resvalue[12], this.resvalue[14], this.resvalue[16], this.resvalue[18], this.resvalue[20], this.resvalue[22]]
    //       }
    //     ]
    //   }
    // }
  },
  methods: {
    getRes (newslist) {
      if (newslist !== '') {
        this.newslist = newslist
        // this.initChart()
      }
    },
    switchPic (num) {
      if (num === 1) {
        this.picUrl = '/sinajs/min/n/' + this.reskey + '.gif'
      } else if (num === 2) {
        this.picUrl = '/sinajs/daily/n/' + this.reskey + '.gif'
      } else if (num === 3) {
        this.picUrl = '/sinajs/weekly/n/' + this.reskey + '.gif'
      } else if (num === 4) {
        this.picUrl = '/sinajs/monthly/n/' + this.reskey + '.gif'
      }
    }
    // initChart () {
    //   this.option_column = {
    //     title: { text: this.resvalue[0] },
    //     tooltip: {},
    //     xAxis: {
    //       data: ['买一数', '买二数', '买三数', '买四数', '买五数']
    //     },
    //     yAxis: {},
    //     series: [
    //       {
    //         name: '数量',
    //         type: 'bar',
    //         data: [this.resvalue[12], this.resvalue[14], this.resvalue[16], this.resvalue[18], this.resvalue[20]]
    //       }
    //     ]
    //   }
    // }
  },
  mounted () {
    console.log(this.$route.params.data)
    // const that = this
    this.newslist = this.$route.params.data
    var list = this.$route.params.data
    console.log(list)
    // var key = Object.keys(list[0])[0]
    // var value = list[0][Object.keys(list[0])[0]]
    if (this.$route.params.data === '' || this.$route.params.data === null) {
      this.getRes()
    }

    // console.log('mounted data')
    // that.option_column = {
    //   title: { text: key },
    //   tooltip: {},
    //   xAxis: {
    //     data: [value[11], value[13], value[15], value[17], value[19], value[21]]
    //   },
    //   yAxis: {},
    //   series: [
    //     {
    //       name: '价位',
    //       type: 'line',
    //       data: [value[12], value[14], value[16], value[18], value[20], value[22]]
    //     }
    //   ]
    // }
    // console.log('mounted end')
  }
}
</script>

<style lang="less" scoped>
@import '../../less/const.less';
    .stock-main-container {
        .stock-info-wrapper{
            margin-top: 5vh;
            color: @regular_text-color;
            font-size: @main-word;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .stock-info {
               width: 60%;
               box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
               padding: 0 20px;
               padding-bottom: 20px;
               margin: 20px 0;
            }

            h3{
                font-size: @title-word;
                color: @main-text-color
            }

            #chart {
                width: 600px;
                height: 300px;
            }
        }
    }
</style>
