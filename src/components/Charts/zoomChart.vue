<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    echartsOption: Object,
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {

      this.$nextTick( () => {
         console.log(this.echartsOption)
        this.chart = echarts.init(document.getElementById(this.id))

        this.chart.setOption( this.echartsOption)
      })

      // var xData = [];
      // var lineData = [];
      // var line2Data = [];
      // var line3Data = [];
      // var line4Data = [];
      // var count = 100;
      // var timeLine = 20180101;
      // for (var i = 0; i < count; i++) {
      //     var val = Math.random() * 100;
      //     xData.push(20180101 + i + '10:30:30');
      //     lineData.push(echarts.number.round(val, 2));
      // }
      // for (var i = 0; i < count; i++) {
      //     var val = Math.random() * 100;
      //     line2Data.push(echarts.number.round(val, 2));
      // }

      // for (var i = 0; i < count; i++) {
      //     var val = Math.random() * 100;
      //     line3Data.push(echarts.number.round(val, 2));
      // }

      // for (var i = 0; i < count; i++) {
      //     var val = Math.random() * 100;
      //     line4Data.push(echarts.number.round(val, 2));
      // }
      // this.chart = echarts.init(document.getElementById(this.id))

      // this.chart.setOption( this.echartsOption)
      //   {
      //     tooltip: {
      //         trigger: 'axis',
      //         axisPointer: {
      //             type: 'shadow'
      //         }
      //     },
      //     legend: {
      //       show:true,
      //         orient: 'horizontal',
      //         right: '10%',
      //         data: ['Fcoin','比安','火币','OKEx'],
      //     },
      //     title: {
      //         text: this.title,
      //         left:'center',
      //         textStyle: {
      //           color: '#409EFF'
      //         }
      //     },
      //     dataZoom: [{
      //         type: 'slider',
      //         start: 50,
      //         end: 70
      //     }, {
      //         type: 'inside',
      //         start: 50,
      //         end: 70
      //     }],
      //     xAxis: {
      //         data: xData,
      //          axisLabel : {//坐标轴刻度标签的相关设置。
      //           formatter: function (value, index) {
      //         // 格式化成月/日，只在第一个刻度显示年份
      //             var texts = value.substr(8,5);
      //             return texts;
      //         }
      //         }

      //     },
      //     yAxis: {},
      //     series: [{
      //         type: 'line',
      //         name: 'Fcoin',
      //         data: lineData,
      //         itemStyle: {
      //             normal: {
      //                 color: '#77bef7'
      //             }
      //         }
      //     },{
      //         type: 'line',
      //         name: '比安',
      //         data: line2Data,
      //         itemStyle: {
      //             normal: {
      //                 color: '#FF1493'
      //             }
      //         }
      //     },{
      //         type: 'line',
      //         name: '火币',
      //         data: line3Data,
      //         itemStyle: {
      //             normal: {
      //                 color: '#303030'
      //             }
      //         }
      //     },{
      //         type: 'line',
      //         name: 'OKEx',
      //         data: line4Data,
      //         itemStyle: {
      //             normal: {
      //                 color: '#0000CD'
      //             }
      //         }
      //     }]
      // }
      // )
    }
  }
}
</script>
