import { coinNameMap } from './../lib/coinMap'
const Mock = require('mockjs');

const Random = Mock.Random;

const vipLevelArr = ['BTC','BCH','ETH','ETC','LTC','EOS','XRP','USDT'];

export const assetAPI = function() {
  let myCustomer = [];
	for(let i = 0; i < 10; i++) {
    let myCustomerCell = {
        coin_amt: Random.integer(0,1000000),
        current_price: Random.integer(0,1000000),
        to_coin: Random.integer(0,1000000),
        to_usd: Random.integer(0,1000000),
        e_desc: coinNameMap[vipLevelArr[Math.floor((Math.random()*vipLevelArr.length))]]
    }
    myCustomer.push(myCustomerCell);
	}
  return {
    ret_code: '0000',
    ret_msg: 'xxxx',
		data: myCustomer,
		totalPages: 4
	}
}

export const generalAPI = function() {
    return {
      data: {
        Trandt:  Random.integer(0,50),
        annual_voltility: Random.float(0,100,2,2),
        total: Random.float(0,1000,2,2),
        available: Random.float(0,1000,2,2),
        position: Random.float(0,100,2,2),
        max_drawdown: Random.integer(0,10),
        shape: Random.integer(0,99),
        downside_voltility: Random.float(0,100,2,2)
      },
      totalPages: 4
    }
}
