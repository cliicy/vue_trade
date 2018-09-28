import Vue from 'vue';
import Router from 'vue-router';

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from '../views/layout/Layout';

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: '/strategy',
    name: 'strategy',
    children: [{
      path: 'strategy',
      component: () => import(/* webpackChunkName: "strategy" */ '@/views/strategy'),
      meta: { title: '我的策略', icon: 'home' }
    }]
  },
  {
    path: '/transaction',
    component: Layout,
    redirect: '/transaction/newdeal',
    name: 'transaction',
    meta: { title: '我的交易', icon: 'home' },
    children: [
      {
        path: 'newdeal',
        name: 'newdeal',
        component: () => import(/* webpackChunkName: "newdeal" */ '@/views/newdeal'),
        meta: { title: '新建交易', icon: 'edit' }
      },
      {
        path: 'dealmanage',
        name: 'dealmanage',
        component: () => import(/* webpackChunkName: "dealmanage" */ '@/views/dealmanage'),
        meta: { title: '交易管理', icon: 'form' }
      },
    ]
  },
  {
    path: '/accountment',
    component: Layout,
    redirect: '/accountment/account',
    name: 'accountment',
    children: [{
      path: 'account',
      component: () => import(/* webpackChunkName: "account" */ '@/views/account'),
      meta: { title: '账户管理', icon: 'home' }
    }]
  },
  {
    path: '/assessment',
    component: Layout,
    redirect: '/assessment/assets',
    name: 'assessment',
    meta: { title: '绩效评估', icon: 'home' },
    children: [
      {
        path: 'assets',
        name: 'assets',
        component: () => import(/* webpackChunkName: "assets" */ '@/views/assets'),
        meta: { title: '每日资产汇总', icon: 'chart' }
      },
      {
        path: 'transactionQuery',
        name: 'transactionQuery',
        component: () => import(/* webpackChunkName: "transaction" */ '@/views/transactionQuery'),
        meta: { title: '交易查询', icon: 'list' }
      },
    ]
  },
  {
    path: '/log',
    component: Layout,
    redirect: '/log/interface',
    name: 'log',
    meta: { title: '日志查询', icon: 'bug' },
    children: [
      {
        path: 'interface',
        name: 'interface',
        component: () => import(/* webpackChunkName: "interface" */ '@/views/interface'),
        meta: { title: '接口日志', icon: 'nested' }
      },
      {
        path: 'warning',
        name: 'warning',
        component: () => import(/* webpackChunkName: "warning" */ '@/views/warning'),
        meta: { title: '警告日志', icon: '404' }
      },
      {
        path: 'operation',
        name: 'operation',
        component: () => import(/* webpackChunkName: "operation" */ '@/views/operation'),
        meta: { title: '操作日志', icon: 'dashboard' }
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

