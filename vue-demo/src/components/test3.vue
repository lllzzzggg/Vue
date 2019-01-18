<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'test3',
  props:['title'],
  data () {
    return {
      msg: []
    }
  },
  mounted () {
    this.drawLine()
    console.log(this.title)
  },
  watch:{
    title(val){
      this.msg = val
      this.drawLine()
      console.log('父组件传值改变' + this.title)
    }
  },
  methods:{
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
          title: { text: '在Vue中使用echarts' },
          tooltip: {},
          xAxis: {
              data: this.msg
          },
          yAxis: {},
          series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
          }]
      });
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
