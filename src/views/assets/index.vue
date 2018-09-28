<template>
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="每日资产汇总" name="first">
    <!-- 币种价格变化chart  -->
      <Asset-chart v-if="activeName2 == 'first'"></Asset-chart>
    </el-tab-pane>

    <el-tab-pane label="币种价格变化" name="second">
    <!-- 币种价格变化chart2 -->
    <Price-change  v-if="activeName2 == 'second'"></Price-change>
    </el-tab-pane>

    <el-tab-pane label="币种价差曲线图" name="third">
    <!-- 币种价差chart -->
    <Price-margin v-if="activeName2 == 'third'"></Price-margin>
    </el-tab-pane>

    <el-tab-pane label="OKEX合约价差" name="fourth">
    <!-- OKEX合约价差chart -->
    <Price-margin-future v-if="activeName2 == 'fourth'"></Price-margin-future>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { AssetChart, PriceChange, PriceMargin, PriceMarginFuture } from './component';

export default {
   name: 'assets',
   data() {
    return {
      activeName2: 'first',
    }
  },
  components: {
    AssetChart,
    PriceChange,
    PriceMargin,
    PriceMarginFuture
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>
