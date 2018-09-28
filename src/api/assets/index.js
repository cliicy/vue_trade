import request from '@/utils/request';

/*   每日资产汇总chart数据接口  /currency/asset/{exchange_id}/{account_id}/{symbol_id}
*
*   {exchange_id: this.exchangeSelect, symbol_id: this.symbolSelect}
*/
export function assetAPI(data) {
  return request({
    url: `/currency/asset/0/0/${data.symbol_id}`,
    method: 'get'
  });
}

/*   币种价格变化chart数据接口  /currency/price_change /{exchange_id}/{ symbol_id }
*
*   {exchange_id: this.exchangeSelect, symbol_id: this.symbolSelect}
*/
export function priceChangeAPI(data) {
  return request({
    url: `/currency/price_change/0/${data.symbol_id}`,
    method: 'get'
  });
}

/*   币种价差chart数据接口 /currency/price_margin/{exchange_id1}/{exchange_id2}/{symbol_id}/{operator}
*
*     {exchange_id1: this.exchangeA, exchange_id2: this.exchangeB, symbol_id:this.symbolSelect, operator: this.diffPriceOper}
*/
export function priceMarginAPI(data) {
  return request({
    url: `/currency/price_margin/${data.exchange_id1}/${data.exchange_id2}/${data.symbol_id}/${data.operator}`,
    method: 'get'
  });
}

/*   OKEX合约价差chart数据接口  /currency /price_margin_future/{exchange_id}/{symbol_id}/{left}/{mid}/{right}
*
*     {symbol_id: "0", left: "this_week", right: "quarter", mid: "next_week"}
*/
export function priceMarginFutureAPI(data) {
  return request({
    url: `/currency/price_margin_future/0/${data.symbol_id}/${data.left}/${data.mid}/${data.right}`,
    method: 'get'
  });
}
