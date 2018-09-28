import router from './router';
// import store from './store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条样式
// import { Message } from 'element-ui';
import { getToken } from '@/utils/auth'; // 验权

// const whiteList = ['/login']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  if( getToken() || to.path == '/login') {
    next()
  }else {
    next({
      path: "/login",
      query: {
        redirect: to.fullPath
      }
    });
  }
  NProgress.done();

  // let token = sessionStorage.getItem('token');
  // if (getToken) {
  //   if (to.path === '/login') {
  //     // 已登录 跳转地址为登录页面
  //     next({ path: '' });
  //     NProgress.done(); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
  //   } else {
  //     // 已登录 跳转地址不为登录页面
  //     next({ path: '' });
  //     NProgress.done();
  //   }
  // } else {
  //   // 未登录
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next();
  //   } else {
  //     next('/login');
  //     NProgress.done();
  //   }
  // }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
