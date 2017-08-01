import Vue from 'vue';
import Router from 'vue-router';
import MethodTable from '@/components/MethodTable';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MethodTable,
    },
  ],
});
