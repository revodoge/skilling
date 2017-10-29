import Vue from 'vue';
import Router from 'vue-router';
import MethodTable from '@/components/MethodTable';
import EHPTable from '@/components/EHPTable';
import TVCTable from '@/components/TVCTable';
import MethodAll from '@/components/MethodAll';
import About from '@/components/About';
import Disassemble from '@/components/Disassemble';

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/disassemble', name: 'Disassembling', component: Disassemble},
    {path: '/methods', name: 'Efficient Methods', component: MethodTable},
    {path: '/ehp', name: 'EHP', component: EHPTable},
    {path: '/tvc', name: 'TVC', component: TVCTable},
    {path: '/all', name: 'All Methods', component: MethodAll},
    {path: '/about', name: 'About', component: About},
    {path: '/', redirect: {name: 'About'}},
  ],
});
