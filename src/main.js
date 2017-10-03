// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import App from './App';
import router from './router';

Vue.use(VueAnalytics, {id: 'UA-104473602-1', router});
Vue.config.productionTip = false;

Vue.filter('formatXp', value => Math.round(value).toLocaleString('en-US'));
Vue.filter('formatCost', value => (isNaN(value) ? 'loading cost...' : value.toFixed(2)));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
});
