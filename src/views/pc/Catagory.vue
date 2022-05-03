<template>
  <main-page>
    <div class="catagory-info-wrapper">
      <div class="catagory-info">
        <h3> 课程分类列表 </h3>
             <div v-for="item in catagoryList" :key="item.id">
              <router-link :to="{ name: 'CourseList', query: {
                id: item.id
              } }" style="text-decoration: none; color:#303133;">{{ item.name }}</router-link>
            </div>
      </div>

    </div>

  </main-page>
</template>

<script>
import MainPage from '../../components/MainPage.vue'
export default {
  data () {
    return {
      catagoryList: []
    }
  },
  mounted () {
    this.$axios.get('/api/catagory/listAll')
      .then((res) => {
        console.log(res)
        this.catagoryList = res.data.data
      })
  },
  components: {
    MainPage
  }
}
</script>

<style lang='less' scoped>
@import '../../less/const.less';
  .catagory-info-wrapper {
      margin-top: 5vh;
      color: @regular_text-color;
      font-size: @main-word;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .catagory-info {
          width: 60%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
          padding: 0 20px;
          padding-bottom: 20px;
          margin: 20px 0;

          div {
            margin: 10px 0;
            .router-link {
              text-decoration: none;
            }
          }
      }
  }
</style>
