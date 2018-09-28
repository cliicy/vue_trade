<template>
  <div class="account-view">
      <!-- 参数管理 -->
      <div class="head-params">

        <el-button type="text">用户账户选择：</el-button>
        <!-- 用户的账户选择 -->
        <el-cascader
          :options="exchangeIds"
          @active-item-change="handleItemChange"
          @change="handleFormData"
          :props="exchangeIdsProps"
          v-model="exchangeIdsValue"
          :show-all-levels="true"
          class="m-r10"
        ></el-cascader>

        <el-button type="text">策略选择：</el-button>
        <!-- 策略选择 -->
        <el-select class="m-r10" v-model="strategyValue"  @change="handleFormData">
          <el-option
            v-for="item in strategys"
            :key="item.tran_strategy_id"
            :label="item.tran_strategy_name"
            :value="item.tran_strategy_id">
          </el-option>
        </el-select>
      </div>

      <el-tabs disabled class="line-bottom">
        <el-tab-pane label="账户概况"></el-tab-pane>
      </el-tabs>

      <el-table
        :data="accountCommon"
        border
        :header-cell-style="getRowClass"
        style="width: 80%;">
        <el-table-column label="年华收益率">
          <template slot-scope="scope">
            {{ scope.row.annual_voltility }}
          </template>
        </el-table-column>
        <el-table-column label="总资产">
          <template slot-scope="scope">
            {{ scope.row.total }}
          </template>
        </el-table-column>
        <el-table-column label="可用资金">
          <template slot-scope="scope">
            {{ scope.row.available }}
          </template>
        </el-table-column>
        <el-table-column label="总体仓位">
          <template slot-scope="scope">
            {{ scope.row.position }}
          </template>
        </el-table-column>
        <el-table-column label="最大回撤">
          <template slot-scope="scope">
            {{ scope.row.max_drawdown }}
          </template>
        </el-table-column>
        <el-table-column label="Sharpe">
          <template slot-scope="scope">
            {{ scope.row.shape }}
          </template>
        </el-table-column>
        <el-table-column label="策略波动率">
          <template slot-scope="scope">
            {{ scope.row.downside_voltility }}
          </template>
        </el-table-column>
      </el-table>

      <el-tabs disabled class="line-bottom">
        <el-tab-pane label="资产分布状况"></el-tab-pane>
      </el-tabs>

      <el-table
        :data="currencyForm"
        border
        :stripe="true"
        :header-cell-style="getRowClass"
        style="width: 80%">
        <el-table-column label="标签">
          <template slot-scope="scope">
            {{ scope.row.e_desc}}
          </template>
        </el-table-column>
        <el-table-column label="币个数">
          <template slot-scope="scope">
            {{ scope.row.coin_amt }}
          </template>
        </el-table-column>

        <el-table-column label="当前价格">
          <template slot-scope="scope">
            {{ scope.row.current_price }}
          </template>
        </el-table-column>
        <el-table-column label="转化为人民币">
          <template slot-scope="scope">
            {{ scope.row.to_coin }}
          </template>
        </el-table-column>
        <el-table-column label="转化为美元">
          <template slot-scope="scope">
            {{ scope.row.to_usd }}
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import { exchangeFirstAPI, queryAccountIdAPI, strategyTypeAPI } from '@/api/exchangeID';
import { assetAPI, generalAPI } from '@/api/accountment';

export default {
name: 'account',
   data() {
    return {
      exchangeIds: [],
      exchangeIdsProps: {
        value: 'exchange_id',
        label: 'label',
        children: 'ids'
      },
      exchangeIdsValue: [],
      strategys: [
        {
          tran_strategy_id: '0',
          tran_strategy_name: '无策略'
        }
      ],
      strategyValue: '0',
      accountCommon: [],
      currencyForm: [],
    }
  },
  mounted() {
    // 初始化页面
    this.initUserId(this.handleFormData);
    // this.strategyTypeAPI()
  },
  methods: {
    initUserId(cb) {
      // 初始化用户账户选择
      exchangeFirstAPI()
      .then( res => {
        console.log(res.data)
        let exchangeFirstArr = res.data.map(item => {
          return {...item, label:item.exchange_name, ids: []}
        })
        queryAccountIdAPI(exchangeFirstArr[0].exchange_id)
        .then( result => {
          console.log(result)
          if(!result.data) {
            this.$set(this.exchangeIdsValue, 0, exchangeFirstArr[0].exchange_id);
            this.$set(this.exchangeIdsValue, 1, null);
            this.exchangeIds = exchangeFirstArr;
          }else {
            exchangeFirstArr[0].ids = result.data.map(value => {
              return {...value, label:value.account_id, exchange_id: value.account_id}
            })
            this.$set(this.exchangeIdsValue, 0, exchangeFirstArr[0].exchange_id);
            this.$set(this.exchangeIdsValue, 1, exchangeFirstArr[0].ids[0].account_id);
            this.exchangeIds = exchangeFirstArr;
          }

          cb && cb();
        })
      })
      // 初始化策略选项
      strategyTypeAPI()
      .then( res => {
        for(let item of res.data) {
          this.strategys.push(item);
        }
      })
    },
    // 用户账户选择下拉框 更改方法
    handleItemChange(val, cb) {
      console.log('active item:', val);
      queryAccountIdAPI(val)
      .then( res => {
        let index;
        let arr = this.exchangeIds.filter((item, key) => {
          if(item.exchange_id == val) {
            index = key;
            return item;
          }
        })
        let json = arr[0];
        json.ids = res.data.map(value => {
          return {...value, label:value.account_id, exchange_id: value.account_id}
        });
        this.$set(this.exchangeIds, index, json);
      })
    },
    // 修改下拉框出发事件
    handleFormData() {
      if(!this.exchangeIdsValue[1]) {
        return;
      }
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
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return 'background:rgb(64, 158, 255);color: #fff;border: 1px solid rgb(48, 65, 86);'
      } else {
        return ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.account-view{
  width: 80%;
  height: 100%;
  margin: 0 10%;
  padding-bottom: 60px;
  .line-bottom{
    margin: 30px auto;
  }
  .head-params{
    width: 100%;
    margin: 60px auto 0;
    .m-r10{
      margin-right: 40px;
    }
  }
}
</style>
