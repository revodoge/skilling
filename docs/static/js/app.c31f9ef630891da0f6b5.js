webpackJsonp([1],{37:function(t,e,n){"use strict";var s=n(25),o=n(92),r=n(88),i=n.n(r);s.a.use(o.a),e.a=new o.a({routes:[{path:"/",name:"Main",component:i.a}]})},38:function(t,e,n){function s(t){n(85)}var o=n(23)(n(41),n(90),s,null,null);t.exports=o.exports},40:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(24),o=n.n(s),r=n(25),i=n(39),a=n(38),u=n.n(a),c=n(37);r.a.use(i.a),r.a.config.productionTip=!1,new r.a({el:"#app",router:c.a,template:"<App/>",components:{App:u.a}}),r.a.filter("formatXp",function(t){return Math.round(t).toLocaleString("en-US")}),r.a.filter("formatCost",function(t){return isNaN(t)?"loading cost...":t.toFixed(2)});r.a.http.get("https://cors-anywhere.herokuapp.com/http://services.runescape.com/m=itemdb_rs/api/graph/12130.json",{responseType:"json"}).then(function(t){if(t.body){var e=t.body.daily,n=o()(e).sort().reverse()[0];localStorage.getItem("geTime")!==n.toString()&&(localStorage.clear(),localStorage.setItem("geTime",n))}},function(){})},41:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},42:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(24),o=n.n(s),r=n(45),i=n.n(r),a=n(44),u=n.n(a);e.default={name:"method",props:{boosts:{type:Object,required:!0},data:{type:Object,required:!0},display:{type:Boolean,required:!0},tvc:{type:Number,required:!0}},data:function(){return{name:this.data.name,skill:this.data.skill,base:new Function(this.data.base)(),baseCost:NaN,requirements:this.data.requirements,daily:new Function(this.data.daily)(),desc:this.data.desc,lossless:this.data.lossless}},computed:{baseBoost:function(){return this.modifiers.filter(function(t){return!t.disabled}).map(function(t){return new Function(t.effect)().base}).filter(function(t){return void 0!==t}).reduce(function(t,e){return t+e},0)+this.requirements.filter(function(t){return t.effect}).map(function(t){return new Function(t.effect)().base}).filter(function(t){return void 0!==t}).reduce(function(t,e){return t+e},0)},bonusBoost:function(){return this.modifiers.filter(function(t){return!t.disabled}).map(function(t){return new Function(t.effect)().bonus}).filter(function(t){return void 0!==t}).reduce(function(t,e){return t+e},0)+this.requirements.filter(function(t){return t.effect}).map(function(t){return new Function(t.effect)().bonus}).filter(function(t){return void 0!==t}).reduce(function(t,e){return t+e},0)},cost:function(){return this.baseCost/(1+this.baseBoost)/(1+this.bonusBoost)},dailyXP:function(){return this.daily*this.xpRate},effectiveCost:function(){return this.cost+(this.lossless?0:1e6*this.tvc/this.xpRate)},modifiers:function(){var t=this;return this.data.modifiers.map(function(e){return u()(e,{disabled:!t.boosts[e.name]})})},xpRate:function(){return this.base*(1+this.baseBoost)*(1+this.bonusBoost)}},watch:{effectiveCost:function(t){isNaN(t)||this.$emit("valueCalculated",this.data,t)}},mounted:function(){this.evalCost(this.data.baseCost)},methods:{evalCost:function(t){var e=this,n=t.match(/getPrice\((\d+)\)/);n?this.getPrice(n[1]).then(function(s){e.evalCost(t.replace(n[0],s))}):this.baseCost=new Function(t)()},getPrice:function(t){if(localStorage.getItem(t))return new i.a(function(e){e(parseInt(localStorage.getItem(t),10))});return this.$http.get("https://cors-anywhere.herokuapp.com/http://services.runescape.com/m=itemdb_rs/api/graph/"+t+".json",{responseType:"json"}).then(function(e){if(!e.body)return NaN;var n=e.body.daily,s=o()(n).sort().reverse()[0],r=n[s];return localStorage.getItem("geTime")!==s.toString()&&(localStorage.clear(),localStorage.setItem("geTime",s)),localStorage.setItem(t,r),r},function(){return NaN})}}}},43:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(87),o=n.n(s);e.default={components:{Method:o.a},name:"method-table",data:function(){return{rsn:"le me",tvc:10,boosts:{},methods:[],error:!1}},mounted:function(){var t=this,e=this;e.$http.get("./static/skilling_methods.json",{responseType:"json"}).then(function(n){e.methods=n.body,e.methods.forEach(function(t){return t.id=t.skill+t.name}),e.methods.forEach(function(t){return t.display=!0}),e.methods.forEach(function(e){return e.modifiers.forEach(function(e){return t.$set(t.boosts,e.name,!0)})})},function(t){e.error=t.statusText})},computed:{sortedMethods:function(){for(var t=this.methods.sort(function(t,e){var n=t.skill,s=e.skill,o=t.effectiveCost,r=e.effectiveCost;return n<s?-1:n>s?1:o<r?-1:o>r?1:0}),e=0;e<t.length;e++){var n=t[e];n.display=!0;var s=t[e-1];!s||s.daily||s.bonus||s.skill!==n.skill||isNaN(n.effectiveCost)||(n.display=!1)}return t}},methods:{updateMethodCost:function(t,e){t.effectiveCost!==e&&(t.effectiveCost=e,this.methods.splice(this.methods.indexOf(t),1,t))},toggleModifier:function(t){this.boosts[t]=!this.boosts[t]}}}},84:function(t,e){},85:function(t,e){},86:function(t,e){},87:function(t,e,n){function s(t){n(86)}var o=n(23)(n(42),n(91),s,"data-v-1cc31f9f",null);t.exports=o.exports},88:function(t,e,n){function s(t){n(84)}var o=n(23)(n(43),n(89),s,null,null);t.exports=o.exports},89:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.error?n("div",[t._v("\n  Error getting methods: "+t._s(t.error)+"\n")]):n("div",[n("form",{staticClass:"row"},[n("div",{staticClass:"form-group col-xs-4"},[n("label",{attrs:{for:"tvc"}},[t._v("TVC in MM GP/hr")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.tvc,expression:"tvc",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",id:"tvc"},domProps:{value:t.tvc},on:{input:function(e){e.target.composing||(t.tvc=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),n("div",{staticClass:"form-group col-xs-4"},[n("label",{attrs:{for:"rsn"}},[t._v("Runescape Username")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.rsn,expression:"rsn"}],staticClass:"form-control",attrs:{type:"text",id:"rsn"},domProps:{value:t.rsn},on:{input:function(e){e.target.composing||(t.rsn=e.target.value)}}})])]),t._v(" "),n("div",{staticClass:"row",attrs:{id:"boosts"}},[n("span",[t._v("\n      Boosts (click to toggle):\n    ")]),t._v(" "),n("span",{staticClass:"list"},t._l(t.boosts,function(e,s){return n("span",{class:{disabled:!e},on:{click:function(e){t.toggleModifier(s)}}},[t._v("\n      "+t._s(s)+"\n    ")])}))]),t._v(" "),n("div",{staticClass:"table-responsive"},[n("table",{staticClass:"table table-hover table-bordered"},[t._m(0),t._v(" "),n("tbody",t._l(t.sortedMethods,function(e){return n("method",{key:e.id,attrs:{tvc:t.tvc,boosts:t.boosts,data:e,display:e.display},on:{valueCalculated:t.updateMethodCost}})}))])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",{attrs:{width:"150px"}},[t._v("\n          Skill\n        ")]),t._v(" "),n("th",{attrs:{width:"150px"}},[t._v("\n          Method\n        ")]),t._v(" "),n("th",{attrs:{width:"650px"}},[t._v("\n          Description/Guide\n        ")]),t._v(" "),n("th",{attrs:{width:"150px"}},[t._v("\n          XP/HR (no boosts)\n        ")]),t._v(" "),n("th",{attrs:{width:"75px"}},[t._v("\n          GP/XP\n        ")]),t._v(" "),n("th",{attrs:{width:"200px"}},[t._v("\n          Requirements\n        ")]),t._v(" "),n("th",{attrs:{width:"200px"}},[t._v("\n          Boosts\n        ")])])])}]}},90:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]}},91:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.display?n("tr",[n("td",[t._v("\n    "+t._s(t.skill)+"\n  ")]),t._v(" "),n("td",[t._v("\n    "+t._s(t.name)+"\n  ")]),t._v(" "),n("td",[t._v("\n    "+t._s(t.desc)+"\n  ")]),t._v(" "),n("td",[t._v("\n    "+t._s(t._f("formatXp")(t.xpRate))),n("br"),t._v("\n    ("+t._s(t._f("formatXp")(t.base))+")\n    "),t.daily?[n("br"),t._v(t._s(t._f("formatXp")(t.dailyXP))+" XP/day")]:t._e()],2),t._v(" "),n("td",[t._v("\n    "+t._s(t._f("formatCost")(t.cost))+"\n  ")]),t._v(" "),n("td",t._l(t.requirements,function(e,s){return n("span",[t._v("\n      "+t._s(e.name)),s<t.requirements.length-1?[t._v(",")]:t._e()],2)})),t._v(" "),n("td",[n("span",{staticClass:"list"},t._l(t.modifiers,function(e,s){return e.disabled?t._e():n("span",[t._v(t._s(e.name))])}))])]):t._e()},staticRenderFns:[]}},95:function(t,e){}},[40]);
//# sourceMappingURL=app.c31f9ef630891da0f6b5.js.map