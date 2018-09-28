const Mock = require('mockjs');

const Random = Mock.Random;

const exchangeArr = [
  {
    "exchange_id": "01",
    "exchange_name": "火币"

  },
  {
    "exchange_id": "02",
    "exchange_name": "币安"
  },
  {
    "exchange_id": "03",
    "exchange_name": "fcoin"

  },
  {
    "exchange_id": "04",
    "exchange_name": "okex合约"
  },
  {
    "exchange_id": "05",
    "exchange_name": "okex现货"

  }
];

export const exchangeFirstAPI = function() {
    return {
      "ret_code": "0000",
      "ret_msg": "",
      data: exchangeArr,
	}
}

export const queryAccountIdAPI = function() {
  let AccountId = [];
  for(let i = 0; i < 6; i++) {
      let myCustomerCell = {
          account_id: Random.integer(1000,9999),
          user_id: '10000',
          exchange_id: `0${i+1}`
      }
      AccountId.push(myCustomerCell);
  }

  return {
    ret_code: '0000',
    ret_msg: '',
    data: AccountId,
  }
}


export const strategyTypeAPI = function() {
  let strategy = [];
  for(let i = 0; i < 6; i++) {
      let strategyCell = {
        tran_strategy_id: i+1,
        tran_strategy_name: Random.csentence(2, 5)
      }
      strategy.push(strategyCell);
  }

  return {
    "ret_code": "0000",
    "ret_msg": "",
    data: strategy,
  }
}

export const symbolsAPI = function() {
  let strategy = [];
  for(let i = 0; i < 6; i++) {
      let strategyCell = {
          symbol_id: i+1,
          symbol_name: Random.csentence(2, 5)
      }
      strategy.push(strategyCell);
  }

  return {
    "ret_code": "0000",
    "ret_msg": "",
    data: strategy,
  }
}



