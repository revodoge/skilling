import Vue from 'vue';
import Router from 'vue-router';
import MethodTable from '@/components/MethodTable';
import EHPTable from '@/components/EHPTable';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Methods',
      component: MethodTable,
    },
    {
      path: '/ehp',
      name: 'EHP',
      component: EHPTable,
    },
  ],
});
