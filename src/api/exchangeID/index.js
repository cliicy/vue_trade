import request from '@/utils/request';

/*   交易所查询数据接口 /exchange
*
*
*/
export function exchangeFirstAPI(data) {
  return request({
    url: '/exchange',
    method: 'get',
    data
  });
}

/*  账户查询数据接口 /account/{exchange_id}
*
*
*/
export function queryAccountIdAPI(exchange_id) {
  return request({
    url: `/account/${exchange_id}`,
    method: 'get'
  });
}


/*   策略查询数据接口 /strategy
*
*
*/
export function strategyTypeAPI() {
  return request({
    url: `/strategy`,
    method: 'get'
  });
}

/*   币对查询接口 /symbol
*
*
*/
export function symbolsAPI() {
  return request({
    url: `/symbol`,
    method: 'get'
  });
}

/*   合约类型查询接口 /contract
*
*
*/
export function contractTypeAPI() {
  return request({
    url: `/contract`,
    method: 'get'
  });
}
