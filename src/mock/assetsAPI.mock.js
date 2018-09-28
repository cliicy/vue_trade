const Mock = require('mockjs');

const Random = Mock.Random;

const vipLevelArr = ['01','02','03','04','05'];

export const priceChangeAPI = function() {
    let myCustomer = [];
    for(let i = 0; i < 100; i++) {
        let myCustomerCell = {
            ts: Random.now('second'),
            close: Random.float(10, 500, 2, 2),
            exchange_id: vipLevelArr[Math.floor((Math.random()*vipLevelArr.length))]
        }
        myCustomer.push(myCustomerCell);
    }
    
    return {
      ret_code: '0000',
      ret_msg: '',
      data: myCustomer,
	}
}