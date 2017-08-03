// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App';
import router from './router';

Vue.use(VueResource);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
});

Vue.filter('formatXp', value => Math.round(value).toLocaleString('en-US'));
Vue.filter('formatCost', value => (isNaN(value) ? 'loading cost...' : value.toFixed(2)));

const nuts = 'https://cors-anywhere.herokuapp.com/http://services.runescape.com/m=itemdb_rs/api/graph/12130.json';
Vue.http.get(nuts, {responseType: 'json'}).then((response) => {
  if (!response.body) {
    return;
  }
  const i = response.body.daily;
  const time = Object.keys(i).sort().reverse()[0];
  if (localStorage.getItem('geTime') !== time.toString()) {
    localStorage.clear();
    localStorage.setItem('geTime', time);
  }
}, () => undefined);
