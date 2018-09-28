import axios from 'axios';
import { baseUrl } from '@/config/env';
import store from '@/store';
import { Message, MessageBox} from 'element-ui';
import { getToken } from './auth';

// 创建axios实例
const service = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 15000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  // 让每个请求携带自定义token
  if (store.getters.token) {
    config.headers['authKey'] = getToken();
  }

  return config;
}, error => {
  // Do something with request error
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  response => {

    /*
    *   "ret_code":"0001"代表authKey失效，清token跳转登录
    */
    const res = response.data;
    if(res.ret_code === '0001') {
      MessageBox.confirm('登录权限失效，请重新登录',  {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('CLEAR_TOKEN').then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      });
    }

    return response.data;
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
