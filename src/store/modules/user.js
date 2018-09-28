import * as Types from '../types';
import { loginAPI } from '@/api/user'
import { getToken, setToken, removeToken, setUserInfo, getUserInfo, removeUserInfo } from '@/utils/auth';

const user = {
  state: {
    token: getToken(),
    userInfo: getUserInfo() ? getUserInfo() : {username: '', userId: ''},
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    [Types.STORE_TOKEN](state, res) {
      state.token = res;
    },
    [Types.SET_USER_INFO](state, res) {
      state.userInfo = res;
    },
  },

  actions: {
    // 保存token
    STORE_TOKEN({commit}, res) {
      setToken(res);
      commit('STORE_TOKEN', res);
    },
    // 清空token
    CLEAR_TOKEN({commit}) {
      removeToken();
      commit('STORE_TOKEN', '');
    },
    LOGIN({commit}, userInfor) {
      return new Promise((resolve, reject) => {
        loginAPI(userInfor).then(res => {
          if(res.ret_code !== '0000') {
            reject(res.ret_msg);
            return;
          }
          // 保存token
          setToken(res.data.authKey);
          commit('STORE_TOKEN', res.data.authKey);
          // 存储 用户信息
          setUserInfo({username: res.data.user_name, userId: res.data.user_id});
          commit('SET_USER_INFO', {username: res.data.user_name, userId: res.data.user_id});

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    LOGOUT({commit}) {
      return new Promise(resolve => {
        // 清空token
        removeToken();
        commit('STORE_TOKEN', '');
        // 清空用户信息
        commit('SET_USER_INFO', {username: '', userId: ''});
        removeUserInfo();
        resolve();
      });
    },
  }
};

export default user;
