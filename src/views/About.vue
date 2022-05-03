<template>
<v-chart :option="option_column" style="height: 400px;width 600px;"></v-chart>
</template>

<script>

export default {

  data () {
    return {
      option_column: {
        title: { text: 'Column Chart' },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    }
  }
}
</script>

<style>

</style>
