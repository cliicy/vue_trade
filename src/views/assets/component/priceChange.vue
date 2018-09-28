<template>
  <!-- 币种价格变化chart2 -->
  <div class="chartContainer2">
    <p>
      <el-button type="text">币对选择：</el-button>
      <el-select v-model="symbolSelect" @change="handleFormData">
        <el-option
          v-for="item in symbolOptions"
          :key="item.symbol_id"
          :label="item.symbol_name"
          :value="item.symbol_id">
        </el-option>
      </el-select>
    </p>
    <LineChart :id='"2"' width="100%" class="mt30" height="300px" ref="echarts" :echartsOption="echartsOption" title="币种价格变化"></LineChart>
  </div>
</template>

<script>
import LineChart from '@/components/Charts/zoomChart.vue';
import symbolSelect from '@/mixins/symbolSelect';
import exchangeSelect from '@/mixins/exchangeSelect';
import { echartsColorArr } from '@/lib/coinMap';
import { priceChangeAPI, priceMarginAPI, priceMarginFutureAPI } from '@/api/assets';

export default {
   name: 'assets',
   mixins: [symbolSelect, exchangeSelect],
   data() {
    return {
      echartsOption: {},
    }
  },
  components: {
    LineChart
  },
  mounted() {
    this.initSymbols()
    .then( () => {
      this.initExchanges()
      .then( () => {
        console.log({symbol_id: this.symbolSelect});
        this.initEchart();
      })
    })
  },
  methods: {
    handleFormData() {
      this.initEchart();
    },
    initEchart() {
      priceChangeAPI({symbol_id: this.symbolSelect})
      .then( res => {
        console.log(res)
        let chartX = {};
          let ChartY = {};
          let lineArr= [];
          let lineNameArr = [];
          let colorIndex = 0;
          for(let item of res.data) {
            let d = item.tm; // 2018-09-10 10:20:30
            if(Object.keys(chartX).indexOf(item.exchange_id) === -1) {

              let coinNameArr = this.exchangeOptions.filter( value => {
                return  value.exchange_id == item.exchange_id;
              });
              lineArr.push(coinNameArr[0].exchange_id);
              lineNameArr.push(coinNameArr[0].exchange_name);
              chartX[item.exchange_id] = [d];
              ChartY[item.exchange_id] = {};
              ChartY[item.exchange_id].data = [item.close];
              ChartY[item.exchange_id].type = 'line';
              ChartY[item.exchange_id].name = coinNameArr[0].exchange_name;
              ChartY[item.exchange_id].itemStyle = {
                  normal: {
                      color: echartsColorArr[colorIndex]
                  }
              }
              colorIndex++;
            }else {
              chartX[item.exchange_id].push(d);
              ChartY[item.exchange_id].data.push(item.close);
            }
            // chartX:   {01: ['2018-09-10 10:20:30', ....]}
            // ChartY:   {
            //     01: {arr: [], type: , name: , itemStyle: {} },
            //     01: {arr: [], type: , name: , itemStyle: {} },
            //  }
          }
          console.log('====>',chartX, ChartY, lineArr, lineNameArr)
          let seriesLine = [];
          let xData = chartX[lineArr[0]];
          for(let item in ChartY) {
            seriesLine.push(ChartY[item]);
          }


        this.echartsOption =  {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                  show:true,
                    orient: 'horizontal',
                    right: '10%',
                    // 图标
                    data: lineNameArr,
                },
                title: {
                    text: "币种价格变化",
                    left:'center',
                    textStyle: {
                      color: '#409EFF'
                    }
                },
                dataZoom: [{
                    type: 'slider',
                    start: 50,
                    end: 70
                }, {
                    type: 'inside',
                    start: 50,
                    end: 70
                }],
                xAxis: {
                    data: xData,
                    axisLabel : {//坐标轴刻度标签的相关设置。
                      formatter: function (value, index) {
                    // 格式化成月/日，只在第一个刻度显示年份
                        var texts = value.substr(11,5);
                        return texts;
                      }
                    }
                },
                yAxis: {
                  scale: true
                },
                series: seriesLine
            }

          this.$refs.echarts.initChart();
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.title {
  margin: 30px 0 0 10%;
}
.chartContainer  {
  margin-top: 30px;
  > p{
    margin: 30px 0 0 10%;
  }
}
.chartContainer2 {
    margin-top: 40px;
    > p{
    margin: 30px 0 0 10%;
  }
}
.mr10{
  margin:10px 30px 60px 0;
}
.mt30{
  margin-top: 40px;
}
</style>
