import request from '@/utils/request';
import qs from 'qs';


/*   用户登录接口
*
*
*/
export function loginAPI(data) {
  return request({
    url: '/login',
    method: 'post',
    data: qs.stringify(data)
  });
}
