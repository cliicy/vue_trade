const Mock = require('mockjs');

const Random = Mock.Random;

export const loginAPI = function() {
  return {
		data: {
      ret_code: '0000',
      ret_msg: '',
      data: {
        authKey:  Random.string( 20, 40 )
      },
    }
	}
}
