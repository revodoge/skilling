import Vue from 'vue';
import Router from 'vue-router';
import MethodTable from '@/components/MethodTable';
import EHPTable from '@/components/EHPTable';
import MethodAll from '@/components/MethodAll';

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/methods', name: 'Methods', component: MethodTable},
    {path: '/ehp', name: 'EHP', component: EHPTable},
    {path: '/all', name: 'All Methods', component: MethodAll},
    {path: '/', redirect: {name: 'Methods'}},
  ],
});
