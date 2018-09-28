<template>
  <!-- 币种价差曲线图chart3 -->
  <div class="chartContainer2">
      <p>
        <el-button type="text">交易所A：&nbsp;</el-button>
        <el-select v-model="exchangeA" @change="handleExchange">
          <el-option
            v-for="item in exchangeIdsA"
            :key="item.exchange_id"
            :label="item.exchange_name"
            :value="item.exchange_id">
          </el-option>
        </el-select>
        <el-button class="ml60" type="text">&nbsp;&nbsp;交易所B：&nbsp;&nbsp;</el-button>
        <el-select v-model="exchangeB" @change="handleExchange">
          <el-option
            v-for="item in exchangeIdsB"
            :key="item.exchange_id"
            :label="item.exchange_name"
            :value="item.exchange_id">
          </el-option>
        </el-select>
      </p>
      <p>
        <el-button type="text">币对选择：</el-button>
        <el-select v-model="symbolSelect" @change="handleExchange">
          <el-option
            v-for="item in symbolOptions"
            :key="item.symbol_id"
            :label="item.symbol_name"
            :value="item.symbol_id">
          </el-option>
        </el-select>
        <el-button class="ml60" type="text">操作符选择：</el-button>
        <el-select v-model="diffPriceOper" placeholder="-"  @change="handleExchange">
          <el-option value="-">-</el-option>
          <el-option value="/">/</el-option>
        </el-select>
      </p>

      <LineChart :id='"3"' width="100%" height="300px" class="mt30" ref="echarts" :echartsOption="echartsOption" title="币种价差曲线图"></LineChart>

    </div>
</template>

<script>
import LineChart from '@/components/Charts/zoomChart.vue';
import symbolSelect from '@/mixins/symbolSelect';
import { echartsColorArr } from '@/lib/coinMap';
import { exchangeFirstAPI, queryAccountIdAPI, strategyTypeAPI } from '@/api/exchangeID';
import { priceChangeAPI, priceMarginAPI, priceMarginFutureAPI } from '@/api/assets';

export default {
   name: 'assets',
   mixins: [symbolSelect],
   data() {
    return {
      exchangeIdsA: [],
      exchangeA: '',
      exchangeIdsB: [],
      exchangeB: '',
      diffPriceOper: '-',
      echartsOption: {},
    }
  },
  components: {
    LineChart
  },
  mounted() {
    this.initUserIdA()
    .then( () => {
      this.initUserIdB()
      .then( () => {
        this.initSymbols()
        .then( () => {
          this.initEchart()
        })
      })
    })
  },
  methods: {
    // 币种价差曲线图接口调用
    initEchart() {
      console.log({exchange_id1: this.exchangeA, exchange_id2: this.exchangeB, symbol_id:this.symbolSelect, operator: this.diffPriceOper});
      let data = {exchange_id1: this.exchangeA, exchange_id2: this.exchangeB, symbol_id:this.symbolSelect, operator: this.diffPriceOper};
      priceMarginAPI(data)
      .then(res => {
        console.log(res);
        let chartX = [];
        let ChartY = {
            type: 'line',
            name: '币种价差',
            data: [],
            itemStyle: {
                normal: {
                    color: '#77bef7'
                }
            }
        };
        let lineArr= [];
        let lineNameArr = ['币种价差'];
        let colorIndex = 0;
        for(let item of res.data) {
          let d = `${item.trandt} ${item.tm}`; // 2018-09-10 10:20:30
          chartX.push(d);
          ChartY.data.push(item.price_margin);
        }
        console.log('====>',chartX, ChartY, lineNameArr);

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
                    text: "币种价差曲线图",
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
                        var texts = value.substr(8,6);
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
    initUserIdA(cb) {
      return new Promise((resolve, reject) => {
        // 初始化用户账户选择
        exchangeFirstAPI()
        .then( res => {
          this.exchangeIdsA = res.data;
          this.exchangeA = res.data[0].exchange_id;
          resolve();
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    initUserIdB(cb) {
      return new Promise((resolve, reject) => {
        // 初始化用户账户选择
        exchangeFirstAPI()
        .then( res => {
          this.exchangeIdsB = res.data;
          this.exchangeB = res.data[0].exchange_id;
          resolve();
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    // 用户账户选择下拉框 更改方法
    handleItemChangeA(val, cb) {
      console.log('active item:', val);
      queryAccountIdAPI(val)
      .then( res => {
        let index;
        let arr = this.exchangeIdsA.filter((item, key) => {
          if(item.exchange_id == val) {
            index = key;
            return item;
          }
        })
        let json = arr[0];
        json.ids = res.data.map(value => {
          return {...value, label:value.account_id, exchange_id: value.account_id}
        });
        this.$set(this.exchangeIdsA, index, json);
      })
    },
    handleItemChangeB(val, cb) {
      console.log('active item:', val);
      queryAccountIdAPI(val)
      .then( res => {
        let index;
        let arr = this.exchangeIdsA.filter((item, key) => {
          if(item.exchange_id == val) {
            index = key;
            return item;
          }
        })
        let json = arr[0];
        json.ids = res.data.map(value => {
          return {...value, label:value.account_id, exchange_id: value.account_id}
        });
        this.$set(this.exchangeIdsB, index, json);
      })
    },
    // 交易所A 改变触发事件
    handleExchange() {
      this.initEchart();
    },
    // 修改下拉框出发事件
    handleFormData() {
      console.log({exchange_id: this.exchangeIdsValue[0], account_id: this.exchangeIdsValue[1], strategy_id: this.strategyValue})
      generalAPI({exchange_id: this.exchangeIdsValue[0], account_id: this.exchangeIdsValue[1], strategy_id: this.strategyValue})
      .then( res => {
        this.$set(this.accountCommon, 0, res.data)
      })
      assetAPI({ account_id: this.exchangeIdsValue[1]})
      .then( res => {
        this.currencyForm = res.data;
      })
    },
    handleContratChange(value) {
      console.log(value);
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
.ml60 {
  margin-left: 60px;
}
.mt30{
  margin-top: 40px;
}
</style>
