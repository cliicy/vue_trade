<template>
  <!-- OKEX合约价差chart4 -->
  <div class="chartContainer2">
      <p>
        <el-button type="text">&nbsp;&nbsp;币对选择：&nbsp;&nbsp;</el-button>
        <el-select v-model="symbolSelect" @change="handleFormData">
          <el-option
            v-for="item in symbolOptions"
            :key="item.symbol_id"
            :label="item.symbol_name"
            :value="item.symbol_id">
          </el-option>
        </el-select>
      </p>
      <p>
        <el-button type="text">合约类型：2*</el-button>
        <el-select v-model="contractSelectMid" @change="handleFormData">
          <el-option
            v-for="item in contractOptionsMid"
            :key="item.contract"
            :label="item.contract"
            :value="item.contract">
          </el-option>
        </el-select>
        <el-button type="text">-</el-button>
        <el-select v-model="contractSelectLeft" @change="handleFormData">
          <el-option
            v-for="item in contractOptionsLeft"
            :key="item.contract"
            :label="item.contract"
            :value="item.contract">
          </el-option>
        </el-select>
        <el-button type="text">-</el-button>
        <el-select v-model="contractSelectRight" @change="handleFormData">
          <el-option
            v-for="item in contractOptionsRight"
            :key="item.contract"
            :label="item.contract"
            :value="item.contract">
          </el-option>
        </el-select>
      </p>
      <LineChart :id='"4"' width="100%" height="300px" class="mt30" ref="echarts" :echartsOption="echartsOption" title="OKEX合约价差"></LineChart>
    </div>
</template>

<script>
import LineChart from '@/components/Charts/zoomChart.vue';
import symbolSelect from '@/mixins/symbolSelect';
import { echartsColorArr } from '@/lib/coinMap';
import { priceMarginFutureAPI } from '@/api/assets';
import { contractTypeAPI } from '@/api/exchangeID';

export default {
   name: 'assets',
   mixins: [symbolSelect],
   data() {
    return {
      contractSelectMid: '',
      contractOptionsMid: [],
      contractSelectLeft: '',
      contractOptionsLeft: [],
      contractSelectRight: '',
      contractOptionsRight: [],
      echartsOption: {}
    }
  },
  components: {
    LineChart
  },
  mounted() {
      this.initSymbols()
      .then( () => {
        this.initContract()
        .then( () => {
          this.initPriceMarginFutureAPI();
        })
      })
  },
  methods: {
    initPriceMarginFutureAPI() {
      console.log( {symbol_id: this.symbolSelect, left: this.contractSelectLeft, right: this.contractSelectRight, mid: this.contractSelectMid})
      let data = {symbol_id: this.symbolSelect, left: this.contractSelectLeft, right: this.contractSelectRight, mid: this.contractSelectMid};
      priceMarginFutureAPI(data)
      .then( res => {
        let chartX = [];
        let ChartY = {
            type: 'line',
            name: 'OKEX合约价差',
            data: [],
            itemStyle: {
                normal: {
                    color: '#77bef7'
                }
            }
        };
        let lineArr= [];
        let lineNameArr = ['OKEX合约价差'];
        let colorIndex = 0;
        for(let item of res.data) {
          let dArr = item.tm.split(' ');
          let d = `${dArr[0]} ${dArr[1]}`; // 2018-09-10 10:20:30
          chartX.push(d);
          ChartY.data.push(item.price_minus);
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
                    text: "OKEX合约价差",
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
                    data: chartX,
                    axisLabel : {//坐标轴刻度标签的相关设置。
                      formatter: function (value, index) {
                    // 格式化成月/日，只在第一个刻度显示年份
                        var texts = value.substr(10,6);
                        return texts;
                      }
                    }
                },
                yAxis: {
                  scale: true
                },
                series: ChartY
            }

          this.$refs.echarts.initChart();
      })
    },
    initContract() {
      return new Promise((resolve, reject) => {
        contractTypeAPI()
        .then( res => {
          this.contractOptionsMid = res.data;
          this.contractSelectMid = res.data[1].contract;
          this.contractOptionsLeft = res.data;
          this.contractSelectLeft = res.data[0].contract;
          this.contractOptionsRight = res.data;
          this.contractSelectRight = res.data[2].contract;
          resolve();
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    handleFormData() {
      this.initPriceMarginFutureAPI();
    },
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
