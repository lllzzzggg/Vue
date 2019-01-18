<template>
  <div>
    <div id="myChart" :style="{width: '4.9rem', height: '3.69rem'}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'daderChart',
  props: {
    moduleName: Array,
    moduleScore: Array
  },
  mounted () {
    this.optionName = this.moduleName.map((item, index) => {
      return {
        name: item,
        max: 100
      }
    })
    this.drawLine()
  },
  data () {
    return {
      optionName: [],
      optionScore: []
    }
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      let self = this
      // 绘制图表
      myChart.setOption({
        radar: {
          shape: 'circle',
          radius: '63%',
          nameGap: 13,
          name: {
            color: '#3C2E14',
            fontSize: 17,
            fontWeight: 400,
            formatter: function (value) {
              if (value.length >= 15) {
                return value.replace(/\s/g, '\n')
              } else {
                return value
              }
            }
          },
          indicator: self.optionName
        },
        series: [{
          type: 'radar',
          symbol: 'circle',
          itemStyle: {
            color: '#A945E4',
            borderType: 'solid'
          },
          lineStyle: {
            color: '#C98EDB'
          },
          areaStyle: {
            color: '#C98EDB',
            opacity: 0.7
          },
          data: [
            {
              value: self.moduleScore
            }
          ]
        }]
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
