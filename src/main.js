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

window.itemPrices = {};
window.getPrice = function (name) {
  return window.itemPrices[name.replace('\'', '\\\'')] || NaN;
};

window.loaded = new Promise((resolve) => {
// eslint-disable-next-line max-len
  const priceUrl = 'https://243.ip-149-56-134.net:8080/https://runescape.wikia.com/api.php?action=parse&page=Module%3AGEPrices/data&format=json';
  Vue.http.get(priceUrl, {responseType: 'json'}).then((response) => {
    if (!response.body) {
      return;
    }
    const items = response.body.parse.text['*'].match(/\[.*?(?=,)/g);
    items.forEach((item) => {
      const itemMatch = item.match(/\['(.*?)'] = (\d+)/);
      window.itemPrices[itemMatch[1]] = parseInt(itemMatch[2], 10);
    });
    resolve();
  }, () => undefined);
});
