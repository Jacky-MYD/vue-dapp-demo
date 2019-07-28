// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import 'font-awesome/css/font-awesome.min.css'
import store from './store'
import ajax from './store/ajax'
import ipfsPublic from './util/ipfs'

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.$ipfs = ipfsPublic;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
