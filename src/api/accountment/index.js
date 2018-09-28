import request from '@/utils/request';

/*   账户概况数据接口 /account/general/{exchange_id}/{account_id}/{strategy_id}
*
*   {exchange_id: this.exchangeIdsValue[0], account_id: this.exchangeIdsValue[1], strategy_id: this.strategyValue}
*/
export function generalAPI(data) {
  return request({
    url: `/account/general/${data.exchange_id}/${data.account_id}/${data.strategy_id}`,
    method: 'get'
  });
}


/*   资产分布状况接口 / account/asset/{account_id}
*
*   { account_id: this.exchangeIdsValue[1]}
*/
export function assetAPI(data) {
  return request({
    url: `/account/asset/${data.account_id}`,
    method: 'get',
    data
  });
}
