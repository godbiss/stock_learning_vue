<template>
<el-container direction='vertical' class="index-container">
    <Header title="STOCK LEARN"></Header>
    <div class="carousel-container">
        <el-carousel :interval="4000" type="card" height="50vh">
        <el-carousel-item v-for="item in urls" :key="item.name">
          <router-link :to="item">{{item.name}}</router-link>
          </el-carousel-item>
      </el-carousel>
    </div>
    <el-main>
      <el-row>
        <el-col :span="12"><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.2008php.com%2F09_Website_appreciate%2F10-07-11%2F1278861720_g.jpg&refer=http%3A%2F%2Fwww.2008php.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653553830&t=7eef89438054fb8fae0e2098ab5a2ea6" alt=""></el-col>
        <el-col :span="12">
            <h3>Course</h3>
            <p>
              write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!
            </p>
        </el-col>
      </el-row>
      <hr>
      <el-row>
        <el-col :span="12"><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.2008php.com%2F09_Website_appreciate%2F10-07-11%2F1278861720_g.jpg&refer=http%3A%2F%2Fwww.2008php.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653553830&t=7eef89438054fb8fae0e2098ab5a2ea6" alt=""></el-col>
        <el-col :span="12">
            <h3>Course</h3>
            <p>
              write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!
            </p>
        </el-col>
      </el-row>
      <hr>
      <el-row>
        <el-col :span="12"><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.2008php.com%2F09_Website_appreciate%2F10-07-11%2F1278861720_g.jpg&refer=http%3A%2F%2Fwww.2008php.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653553830&t=7eef89438054fb8fae0e2098ab5a2ea6" alt=""></el-col>
        <el-col :span="12">
            <h3>Course</h3>
            <p>
              write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!write something here!
            </p>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>公安备案号11010502030143
    京ICP备19004658号
    京网文〔2020〕1039-165号
    经营性网站备案信息
    北京互联网违法和不良信息举报中心
    家长监护
    网络110报警服务
    中国互联网举报中心
    Chrome商店下载
    ©1999-2022北京创新乐知网络技术有限公司
    版权与免责声明
    版权申诉
    出版物许可证
    营业执照</el-footer>
</el-container>

</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'Index',
  data () {
    return {
      urls: [{ name: 'Stock' }, { name: 'Catagory' }, { name: 'News' }]
    }
  },
  components: {
    Header
  }
}
</script>

<style lang='less' scoped>
@import '../../less/const.less';
  .carousel-container{
    display: block;
    width: 100%;
    margin-top: 6vh;
    font-weight: bold;

  a {
    text-decoration: none;
    color: @regular_text-color;
    text-align: center;
    line-height: 90vh;
    font-size: @big-title-word;
  }

    .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    }

    .el-carousel__item {
      a{
        display: block;
        height: 100%;
        width: 100%;
      }
    }

  // .el-carousel__item:nth-child(2n) {
  //   // background-color: #99a9bf;
  //   background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091020%2F1zlypnrglwe1zlypnrglwe.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653545216&t=912f5107344c161cdfa9e82eb27b6661");
  //   background-size: cover;
  // }

  // .el-carousel__item:nth-child(2n+1) {
  //   background-color: #d3dce6;
  // }

    .el-carousel__item:nth-child(n) {
      background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091020%2F1zlypnrglwe1zlypnrglwe.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653545216&t=912f5107344c161cdfa9e82eb27b6661");
      background-size: cover;
    }

    .el-carousel__item:nth-child(2n) {
      background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-033e0ebd65a9a14dde3a9ee51450cdf8_1440w.jpg%3Fsource%3D172ae18b&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653891316&t=83b4b279bf791610c21215af76573baf");
      background-size: cover;
    }

    .el-carousel__item:nth-child(3) {
      background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.zhicheng.com%2Fuploadfile%2F2021%2F0714%2F20210714102406340.jpg&refer=http%3A%2F%2Fwww.zhicheng.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653891316&t=14bd98ec16020682c88669f618bf10e6");
      background-size: cover;
    }
  }

  .el-main {
    height: 100vh;

    .el-row {
      .el-col:nth-child(1){
        display: flex;
        justify-content: center;
        img {
          width: 50%;
          height: 50%;
        }
      }

    }

    hr {
      background-color: @first-border;
    }
  }

  .el-footer {
    color: @placeholder-text-color;
    font-size: @help-word;
    text-align: center;
    padding: 0 10vw;
  }
</style>
