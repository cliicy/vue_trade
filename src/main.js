import Vue from 'vue';

import 'normalize.css/normalize.css';// A modern alternative to CSS resets

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import locale from 'element-ui/lib/locale/lang/en'; // lang i18n
/** others plugins start */
import 'font-awesome/css/font-awesome.min.css';
import vuescroll from 'vuescroll';
import VueDragResize from 'vue-drag-resize';
import VueDraggableResizable from 'vue-draggable-resizable';

/** others plugins end */
import '@/styles/index.scss'; // global css

import App from './App';
import router from './router';
import store from './store';
import * as filters from './filters' // global filters

import '@/icons'; // icon
import '@/permission'; // permission control

// require('@/mock/index')

Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.component('vue-drag-resize', VueDragResize);
Vue.component('vue-draggable-resizable', VueDraggableResizable);
Vue.use(vuescroll);
// vuescroll全局配置
Vue.prototype.$vuescrollConfig = {
  bar: {
    vBar: {
      background: '#409eff'
    }
  }
};

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
