webpackJsonp([1],{100:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("form",{staticClass:"row"},[s("div",{staticClass:"col-xs-0 col-md-1 col-lg-2"}),t._v(" "),s("div",{staticClass:"form-group col-xs-6 col-md-5 col-lg-4"},[s("label",{attrs:{for:"tvc"}},[t._v("MM GP/hr my Time is Worth")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.number",value:t.tvc,expression:"tvc",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",id:"tvc"},domProps:{value:t.tvc},on:{input:function(e){e.target.composing||(t.tvc=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),s("div",{staticClass:"form-group col-xs-6 col-md-5 col-lg-4"},[t._m(0),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.number",value:t.alt,expression:"alt",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",id:"alt"},domProps:{value:t.alt},on:{input:function(e){e.target.composing||(t.alt=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),s("div",{staticClass:"col-xs-0 col-md-1 col-lg-2"})]),t._v(" "),s("form",{staticClass:"row",on:{submit:function(e){e.preventDefault(),t.onSubmit(e)},"!submit":function(e){t.fetchHiscore(e)}}},[s("div",{staticClass:"col-xs-0 col-md-1 col-lg-2"}),t._v(" "),s("div",{staticClass:"form-group col-xs-12 col-md-10 col-lg-8"},[s("label",{attrs:{for:"rsn"}},[t._v("Runescape Username")]),t._v(" "),s("span",{staticClass:"input-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.rsn,expression:"rsn"}],staticClass:"form-control",attrs:{type:"text",id:"rsn"},domProps:{value:t.rsn},on:{input:function(e){e.target.composing||(t.rsn=e.target.value)}}}),t._v(" "),t._m(1)])]),t._v(" "),s("div",{staticClass:"col-xs-0 col-md-1 col-lg-2"})]),t._v(" "),s("form",{staticClass:"row"},[s("div",{staticClass:"col-xs-0 col-md-3"}),t._v(" "),s("div",{staticClass:"form-group col-xs-4 col-md-2"},[s("div",{staticClass:"checkbox"},[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.spinner,expression:"spinner"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.spinner)?t._i(t.spinner,null)>-1:t.spinner},on:{__c:function(e){var s=t.spinner,n=e.target,i=!!n.checked;if(Array.isArray(s)){var o=t._i(s,null);n.checked?o<0&&(t.spinner=s.concat(null)):o>-1&&(t.spinner=s.slice(0,o).concat(s.slice(o+1)))}else t.spinner=i}}}),t._v(" I ߷ my XP\n        ")])])]),t._v(" "),s("div",{staticClass:"form-group col-xs-4 col-md-2"},[s("div",{staticClass:"checkbox"},[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.afk,expression:"afk"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.afk)?t._i(t.afk,null)>-1:t.afk},on:{__c:function(e){var s=t.afk,n=e.target,i=!!n.checked;if(Array.isArray(s)){var o=t._i(s,null);n.checked?o<0&&(t.afk=s.concat(null)):o>-1&&(t.afk=s.slice(0,o).concat(s.slice(o+1)))}else t.afk=i}}}),t._v(" I like to AFK\n        ")])])]),t._v(" "),s("div",{staticClass:"form-group col-xs-4 col-md-2"},[s("div",{staticClass:"checkbox"},[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.noWildy,expression:"noWildy"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.noWildy)?t._i(t.noWildy,null)>-1:t.noWildy},on:{__c:function(e){var s=t.noWildy,n=e.target,i=!!n.checked;if(Array.isArray(s)){var o=t._i(s,null);n.checked?o<0&&(t.noWildy=s.concat(null)):o>-1&&(t.noWildy=s.slice(0,o).concat(s.slice(o+1)))}else t.noWildy=i}}}),t._v(" I'm scared of CPK\n        ")])])]),t._v(" "),s("div",{staticClass:"col-xs-0 col-md-3"})]),t._v(" "),s("div",{staticClass:"row",attrs:{id:"boosts"}},[s("div",{staticClass:"col-xs-0 col-md-1 col-lg-2"}),t._v(" "),s("div",{staticClass:"col-xs-12 col-md-10 col-lg-8"},[s("span",[t._v("\n        Boosts (click to toggle):\n      ")]),t._v(" "),s("span",{staticClass:"list"},t._l(t.boosts,function(e,n){return s("span",{class:{disabled:!e},on:{click:function(e){t.toggleModifier(n)}}},[t._v("\n        "+t._s(n)+"\n        ")])}))]),t._v(" "),s("div",{staticClass:"col-xs-0 col-md-1 col-lg-2"})]),t._v(" "),s("br"),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-0 col-md-1 col-lg-2"}),t._v(" "),s("div",{staticClass:"col-xs-12 col-md-10 col-lg-8"},[s("div",{staticClass:"table-responsive"},[s("table",{staticClass:"table table-hover table-bordered",attrs:{id:"methods"}},[s("caption",[t._v("Most efficient methods (click on a method for more info):")]),t._v(" "),t._m(2),t._v(" "),s("tbody",[t._l(t.sortedMethods,function(e){return[s("method",{key:e.id,attrs:{tvc:t.tvc,boosts:t.boosts,data:e,display:!0,alt:t.alt},on:{valueCalculated:t.updateMethodCost,descriptionToggled:t.toggleDescription}}),t._v(" "),s("method-desc",{attrs:{desc:e.desc,display:!0}})]})],2)])])]),t._v(" "),s("div",{staticClass:"col-xs-0 col-md-1 col-lg-2"})])])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("label",{attrs:{for:"alt",id:"altLabel"}},[t._v("MM GP/hr My Alt Makes (0 = no alt)*\n        "),s("span",[t._v("alt is assumed to only be used for AFK skills, make a copy if you want to customize it to your usage")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"input-group-btn"},[s("button",{staticClass:"btn btn-default",attrs:{type:"submit"}},[t._v("Hide my 200m skills")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",{staticStyle:{width:"150px"}},[t._v("\n              Skill\n            ")]),t._v(" "),s("th",{staticStyle:{width:"150px"}},[t._v("\n              Method\n            ")]),t._v(" "),s("th",{staticStyle:{width:"150px"}},[t._v("\n              XP/HR (no boosts)\n            ")]),t._v(" "),s("th",{staticStyle:{width:"75px"}},[t._v("\n              GP/XP\n            ")]),t._v(" "),s("th",{staticStyle:{width:"250px"}},[t._v("\n              Requirements\n            ")]),t._v(" "),s("th",{staticStyle:{width:"250px"}},[t._v("\n              Boosts\n            ")])])])}]}},101:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.display?s("tr",{on:{click:t.toggleDesc}},[s("td",[t._v("\n    "+t._s(t.skill)+"\n  ")]),t._v(" "),s("td",[t._v("\n    "+t._s(t.name)+"\n  ")]),t._v(" "),s("td",[t._v("\n    "+t._s(t._f("formatXp")(t.xpRate))),s("br"),t._v("\n    ("+t._s(t._f("formatXp")(t.base))+")\n    "),t.daily?[s("br"),t._v(t._s(t._f("formatXp")(t.dailyXP))+" XP/day")]:t._e()],2),t._v(" "),s("td",[t._v("\n    "+t._s(t._f("formatCost")(t.cost))+"\n  ")]),t._v(" "),s("td",[s("span",{staticClass:"list"},t._l(t.requirements,function(e,n){return s("span",[t._v(t._s(e.name))])}))]),t._v(" "),s("td",[s("span",{staticClass:"list"},t._l(t.modifiers,function(e,n){return e.disabled?t._e():s("span",[t._v(t._s(e.name))])}))])]):t._e()},staticRenderFns:[]}},102:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.display?s("tr",[s("td",{attrs:{colspan:"6"},domProps:{innerHTML:t._s(t.desc)}})]):t._e()},staticRenderFns:[]}},103:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("form",{staticClass:"row",on:{submit:function(e){e.preventDefault(),t.onSubmit(e)},"!submit":function(e){t.fetchHiscore(e)}}},[s("div",{staticClass:"col-xs-0 col-md-1 col-lg-2"}),t._v(" "),s("div",{staticClass:"col-xs-12 col-md-10 col-lg-8"},[s("label",{attrs:{for:"rsn"}},[t._v("Runescape Username")]),t._v(" "),s("span",{staticClass:"input-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.rsn,expression:"rsn"}],staticClass:"form-control",attrs:{type:"text",id:"rsn"},domProps:{value:t.rsn},on:{input:function(e){e.target.composing||(t.rsn=e.target.value)}}}),t._v(" "),t._m(0)])]),t._v(" "),s("div",{staticClass:"col-xs-0 col-md-1 col-lg-2"})]),t._v(" "),s("br"),t._v(" "),t._l(t.methods,function(e){return[s("method",{key:e.id,attrs:{tvc:15,boosts:t.boosts,data:e,display:!1,alt:9},on:{dailyCalculated:t.updateMethodDaily,valueCalculated:t.updateMethodCost}})]}),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-0 col-md-1 col-lg-2"}),t._v(" "),s("div",{staticClass:"col-xs-12 col-md-10 col-lg-8"},[s("div",{staticClass:"table-responsive"},[s("table",{staticClass:"table table-hover table-bordered",attrs:{id:"methods"}},[s("caption",[t._v("\n            Player EHP (15MM gp/hr TVC, counting in time needed to fund skills, 9MM gp/hr on alts for AFK skills):\n          ")]),t._v(" "),t._m(1),t._v(" "),s("tbody",t._l(t.userEHP,function(e,n){return s("tr",[s("td",[t._v("\n              "+t._s(n)+"\n            ")]),t._v(" "),s("td",[t._v("\n              "+t._s(t._f("formatXp")(e.current))+"\n            ")]),t._v(" "),s("td",[t._v("\n              "+t._s(t._f("formatCost")(e.hoursDone))+"\n            ")]),t._v(" "),s("td",[t._v("\n              "+t._s(t._f("formatXp")(e.remaining))+"\n            ")]),t._v(" "),s("td",[t._v("\n              "+t._s(t._f("formatCost")(e.hoursLeft))+"\n            ")]),t._v(" "),s("td",[t._v("\n              "+t._s(t._f("formatXp")(e.gpLeft))+"\n            ")])])}))])])]),t._v(" "),s("div",{staticClass:"col-xs-0 col-md-1 col-lg-2"})])],2)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"input-group-btn"},[s("button",{staticClass:"btn btn-default",attrs:{type:"submit"}},[t._v("Fetch stats")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",{staticStyle:{width:"150px"}},[t._v("\n              Skill\n            ")]),t._v(" "),s("th",{staticStyle:{width:"200px"}},[t._v("\n              Player XP\n            ")]),t._v(" "),s("th",{staticStyle:{width:"75px"}},[t._v("\n              EHP\n            ")]),t._v(" "),s("th",{staticStyle:{width:"200px"}},[t._v("\n              XP Left\n            ")]),t._v(" "),s("th",{staticStyle:{width:"75px"}},[t._v("\n              EHP Left\n            ")]),t._v(" "),s("th",{staticStyle:{width:"250px"}},[t._v("\n              GP Needed\n            ")])])])}]}},107:function(t,e){},26:function(t,e,s){function n(t){s(92)}var i=s(5)(s(46),s(101),n,"data-v-1cc31f9f",null);t.exports=i.exports},39:function(t,e,s){function n(t){s(93)}var i=s(5)(s(48),s(102),n,"data-v-277cf650",null);t.exports=i.exports},40:function(t,e,s){"use strict";var n=s(27),i=s(104),o=s(97),a=s.n(o),r=s(95),l=s.n(r),c=s(96),d=s.n(c);n.a.use(i.a),e.a=new i.a({routes:[{path:"/methods",name:"Methods",component:a.a},{path:"/ehp",name:"EHP",component:l.a},{path:"/all",name:"All Methods",component:d.a},{path:"/",redirect:{name:"Methods"}}]})},41:function(t,e,s){function n(t){s(90)}var i=s(5)(s(44),s(99),n,null,null);t.exports=i.exports},43:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(16),i=s.n(n),o=s(27),a=s(42),r=s(41),l=s.n(r),c=s(40);o.a.use(a.a),o.a.config.productionTip=!1,new o.a({el:"#app",router:c.a,template:"<App/>",components:{App:l.a}}),o.a.filter("formatXp",function(t){return Math.round(t).toLocaleString("en-US")}),o.a.filter("formatCost",function(t){return isNaN(t)?"loading cost...":t.toFixed(2)});o.a.http.get("https://cors-anywhere.herokuapp.com/http://services.runescape.com/m=itemdb_rs/api/graph/12130.json",{responseType:"json"}).then(function(t){if(t.body){var e=t.body.daily,s=i()(e).sort().reverse()[0];localStorage.getItem("geTime")!==s.toString()&&(localStorage.clear(),localStorage.setItem("geTime",s))}},function(){})},44:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},45:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(8),i=s.n(n),o=s(16),a=s.n(o),r=s(26),l=s.n(r);e.default={components:{Method:l.a},name:"ehp-table",data:function(){return{boosts:{},methods:[],rsn:"Marina",stats:{}}},computed:{skillCosts:function(){var t=this.methods.sort(function(t,e){var s=t.skill,n=e.skill,i=t.effectiveCost,o=e.effectiveCost;return s<n?-1:s>n?1:i<o?-1:i>o?1:0}),e={};window.skillList.forEach(function(t,s){return e[t]={remaining:2e8,eCost:0,rCost:0,bonus:!1}});for(var s=0;s<t.length;s++){var n=t[s],i=t[s-1];if((!i||i.daily||i.bonus||i.skill!==n.skill)&&!isNaN(n.effectiveCost)&&!(e[n.skill].remaining<=0||e[n.skill].bonus&&n.bonus))if(n.daily){var o=Math.min(e[n.skill].remaining/n.dailyAmt,800),a=o*n.dailyAmt,r=a*n.effectiveCost,l=a*n.realCost;e[n.skill].remaining-=a,e[n.skill].eCost+=r,e[n.skill].rCost+=l}else{e[n.skill].bonus=n.bonus||e[n.skill].bonus;var c=e[n.skill].remaining/(n.bonus?2:1),d=c*n.effectiveCost,u=c*n.realCost;e[n.skill].remaining-=c,e[n.skill].eCost+=d,e[n.skill].rCost+=u}}return e},skillRates:function(){var t=this,e={};return a()(this.skillCosts).forEach(function(s){var n=t.skillCosts[s];if(!(n.remaining>0)){var i=n.eCost/15e6,o=n.rCost;e[s]={hours:i,cost:o}}}),e},userEHP:function(){var t=this,e={Overall:{current:0,hoursDone:0,remaining:0,hoursLeft:0,gpLeft:0}};return a()(this.skillRates).forEach(function(s){var n=t.stats[s],i=t.skillRates[s].hours,o=t.skillRates[s].cost,a=2e8-n,r=n/2e8,l=a/2e8,c=r*i,d=l*i,u=l*o;e[s]={current:n,hoursDone:c,remaining:a,hoursLeft:d,gpLeft:u},e.Overall.current+=n,e.Overall.hoursDone+=c,e.Overall.remaining+=a,e.Overall.hoursLeft+=d,e.Overall.gpLeft+=u}),e}},mounted:function(){var t=this;this.methods=window.methods.map(function(t){return i()({},t)}),this.methods.forEach(function(t){return t.id=t.skill+t.name}),this.methods.forEach(function(t){return t.display=!0}),this.methods.forEach(function(t){return t.descriptionDisplay=!1}),this.methods.forEach(function(e){return e.modifiers.forEach(function(e){return t.$set(t.boosts,e.name,!0)})}),this.fetchHiscore()},methods:{fetchHiscore:function(){var t=this;this.$http.get("https://cors-anywhere.herokuapp.com/http://services.runescape.com/m=hiscore/index_lite.ws",{params:{player:this.rsn}}).then(function(e){var s=e.body.split("\n").slice(1,28).map(function(t){return parseInt(t.split(",")[2],10)}),n={};window.skillList.forEach(function(t,e){return n[t]=s[e]}),t.stats=n},function(t){console.log(t.statusText)})},updateMethodCost:function(t,e,s){t.effectiveCost!==e&&(t.effectiveCost=e,t.realCost=s,this.methods.splice(this.methods.indexOf(t),1,t))},updateMethodDaily:function(t,e){t.dailyAmt!==e&&(t.dailyAmt=e,this.methods.splice(this.methods.indexOf(t),1,t))}}}},46:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(16),i=s.n(n),o=s(50),a=s.n(o),r=s(8),l=s.n(r);e.default={name:"method",props:{boosts:{type:Object,required:!0},data:{type:Object,required:!0},display:{type:Boolean,required:!0},tvc:{type:Number,required:!0},alt:{type:Number,required:!0}},data:function(){return{name:this.data.name,skill:this.data.skill,actionXP:this.data.actionXP,actionsPerHour:this.data.actionsPerHour,baseCost:NaN,requirements:this.data.requirements,daily:this.data.daily,desc:this.data.desc,lossless:this.data.lossless}},computed:{base:function(){return this.data.base?Function(this.data.base).apply(this):this.actionXP*this.actionsPerHour},baseBoost:function(){return this.modifiers.filter(function(t){return!t.disabled}).map(function(t){return t.effect().base}).filter(function(t){return void 0!==t}).reduce(function(t,e){return t*(1+e)},1)*this.requirements.filter(function(t){return t.effect}).map(function(t){return t.effect().base}).filter(function(t){return void 0!==t}).reduce(function(t,e){return t*(1+e)},1)},bonusBoost:function(){return this.modifiers.filter(function(t){return!t.disabled}).map(function(t){return t.effect().bonus}).filter(function(t){return void 0!==t}).reduce(function(t,e){return t+e},0)+this.requirements.filter(function(t){return t.effect}).map(function(t){return t.effect().bonus}).filter(function(t){return void 0!==t}).reduce(function(t,e){return t+e},0)},modifiers:function(){var t=this;return this.data.modifiers.map(function(e){return l()({},l()(e,{disabled:!t.boosts[e.name]}))})},cost:function(){return this.baseCost*(this.base===1/0?1:this.base/this.xpRate)},dailyXP:function(){return Function(this.daily).apply(this)*this.xpRate},effectiveCost:function(){var t=this.data.alt?this.data.alt:0;return this.cost+(this.lossless?0:1e6*(this.tvc-this.alt*t)/this.xpRate)},xpRate:function(){return this.base*(this.baseBoost*(1+this.bonusBoost))}},mounted:function(){this.evalCost(this.data.baseCost)},methods:{evalCost:function(t){var e=this,s=t.match(/getPrice\((\d+)\)/);s?this.getPrice(s[1]).then(function(n){e.evalCost(t.replace(s[0],n))}):this.baseCost=Function(t).apply(this)},getPrice:function(t){if(localStorage.getItem(t))return new a.a(function(e){e(parseInt(localStorage.getItem(t),10))});return this.$http.get("https://cors-anywhere.herokuapp.com/http://services.runescape.com/m=itemdb_rs/api/graph/"+t+".json",{responseType:"json"}).then(function(e){if(!e.body)return NaN;var s=e.body.daily,n=i()(s).sort().reverse()[0],o=s[n];return localStorage.getItem("geTime")!==n.toString()&&(localStorage.clear(),localStorage.setItem("geTime",n)),localStorage.setItem(t,o),o},function(){return NaN})},toggleDesc:function(){this.$emit("descriptionToggled",this.data)}},watch:{dailyXP:{handler:function(t){isNaN(t)||this.$emit("dailyCalculated",this.data,t)},immediate:!0},effectiveCost:{handler:function(t){isNaN(t)||this.$emit("valueCalculated",this.data,t,this.cost)},immediate:!0}}}},47:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(8),i=s.n(n),o=s(26),a=s.n(o),r=s(39),l=s.n(r);e.default={components:{Method:a.a,MethodDesc:l.a},name:"method-all",data:function(){return{boosts:{},methods:[],rsn:"couchy",stats:{},tvc:50,alt:0,spinner:!0,afk:!1,noWildy:!1}},computed:{sortedMethods:function(){var t=this;return this.methods.filter(function(e){return(!e.spinner||t.spinner)&&(e.afk||!t.afk)&&(!e.wildy||!t.noWildy)}).sort(function(t,e){var s=t.skill,n=e.skill,i=t.effectiveCost,o=e.effectiveCost;return s<n?-1:s>n?1:i<o?-1:i>o?1:0})}},mounted:function(){var t=this;this.methods=window.methods.map(function(t){return i()({},t)}),this.methods.forEach(function(t){return t.id=t.skill+t.name}),this.methods.forEach(function(t){return t.display=!0}),this.methods.forEach(function(t){return t.descriptionDisplay=!1}),this.methods.forEach(function(e){return e.modifiers.forEach(function(e){return t.$set(t.boosts,e.name,!0)})})},methods:{fetchHiscore:function(){var t=this;this.$http.get("https://cors-anywhere.herokuapp.com/http://services.runescape.com/m=hiscore/index_lite.ws",{params:{player:this.rsn}}).then(function(e){var s=e.body.split("\n").slice(1,28).map(function(t){return parseInt(t.split(",")[2],10)}),n={};window.skillList.forEach(function(t,e){return n[t]=s[e]}),t.stats=n},function(t){console.log(t.statusText)})},toggleDescription:function(t){t.descriptionDisplay=!t.descriptionDisplay,this.methods.splice(this.methods.indexOf(t),1,t)},toggleModifier:function(t){this.boosts[t]=!this.boosts[t]},updateMethodCost:function(t,e){t.effectiveCost!==e&&(t.effectiveCost=e,this.methods.splice(this.methods.indexOf(t),1,t))}}}},48:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"method-desc",props:{desc:{type:String,required:!0},display:{type:Boolean,required:!0}}}},49:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(8),i=s.n(n),o=s(26),a=s.n(o),r=s(39),l=s.n(r);e.default={components:{Method:a.a,MethodDesc:l.a},name:"method-table",data:function(){return{boosts:{},methods:[],rsn:"couchy",stats:{},tvc:50,alt:0,spinner:!0,afk:!1,noWildy:!1}},computed:{sortedMethods:function(){for(var t=this,e=this.methods.filter(function(e){return(!e.spinner||t.spinner)&&(e.afk||!t.afk)&&(!e.wildy||!t.noWildy)}).sort(function(t,e){var s=t.skill,n=e.skill,i=t.effectiveCost,o=e.effectiveCost;return s<n?-1:s>n?1:i<o?-1:i>o?1:0}),s=0;s<e.length;s++){var n=e[s];n.display=!0;var i=e[s-1];2e8!==this.stats[n.skill]&&(!i||i.skill!==n.skill||(i.daily||i.bonus)&&i.display||isNaN(n.effectiveCost))||(n.display=!1)}return e}},mounted:function(){var t=this;this.methods=window.methods.map(function(t){return i()({},t)}),this.methods.forEach(function(t){return t.id=t.skill+t.name}),this.methods.forEach(function(t){return t.display=!0}),this.methods.forEach(function(t){return t.descriptionDisplay=!1}),this.methods.forEach(function(e){return e.modifiers.forEach(function(e){return t.$set(t.boosts,e.name,!0)})})},methods:{fetchHiscore:function(){var t=this;this.$http.get("https://cors-anywhere.herokuapp.com/http://services.runescape.com/m=hiscore/index_lite.ws",{params:{player:this.rsn}}).then(function(e){var s=e.body.split("\n").slice(1,28).map(function(t){return parseInt(t.split(",")[2],10)}),n={};window.skillList.forEach(function(t,e){return n[t]=s[e]}),t.stats=n},function(t){console.log(t.statusText)})},toggleDescription:function(t){t.descriptionDisplay=!t.descriptionDisplay,this.methods.splice(this.methods.indexOf(t),1,t)},toggleModifier:function(t){this.boosts[t]=!this.boosts[t]},updateMethodCost:function(t,e){t.effectiveCost!==e&&(t.effectiveCost=e,this.methods.splice(this.methods.indexOf(t),1,t))}}}},89:function(t,e){},90:function(t,e){},91:function(t,e){},92:function(t,e){},93:function(t,e){},94:function(t,e){},95:function(t,e,s){function n(t){s(94)}var i=s(5)(s(45),s(103),n,null,null);t.exports=i.exports},96:function(t,e,s){function n(t){s(91)}var i=s(5)(s(47),s(100),n,null,null);t.exports=i.exports},97:function(t,e,s){function n(t){s(89)}var i=s(5)(s(49),s(98),n,null,null);t.exports=i.exports},98:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("form",{staticClass:"row"},[s("div",{staticClass:"col-xs-0 col-md-1 col-lg-2"}),t._v(" "),s("div",{staticClass:"form-group col-xs-6 col-md-5 col-lg-4"},[s("label",{attrs:{for:"tvc"}},[t._v("MM GP/hr my Time is Worth")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.number",value:t.tvc,expression:"tvc",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",id:"tvc"},domProps:{value:t.tvc},on:{input:function(e){e.target.composing||(t.tvc=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),s("div",{staticClass:"form-group col-xs-6 col-md-5 col-lg-4"},[t._m(0),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.number",value:t.alt,expression:"alt",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",id:"alt"},domProps:{value:t.alt},on:{input:function(e){e.target.composing||(t.alt=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),s("div",{staticClass:"col-xs-0 col-md-1 col-lg-2"})]),t._v(" "),s("form",{staticClass:"row",on:{submit:function(e){e.preventDefault(),t.onSubmit(e)},"!submit":function(e){t.fetchHiscore(e)}}},[s("div",{staticClass:"col-xs-0 col-md-1 col-lg-2"}),t._v(" "),s("div",{staticClass:"form-group col-xs-12 col-md-10 col-lg-8"},[s("label",{attrs:{for:"rsn"}},[t._v("Runescape Username")]),t._v(" "),s("span",{staticClass:"input-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.rsn,expression:"rsn"}],staticClass:"form-control",attrs:{type:"text",id:"rsn"},domProps:{value:t.rsn},on:{input:function(e){e.target.composing||(t.rsn=e.target.value)}}}),t._v(" "),t._m(1)])]),t._v(" "),s("div",{staticClass:"col-xs-0 col-md-1 col-lg-2"})]),t._v(" "),s("form",{staticClass:"row"},[s("div",{staticClass:"col-xs-0 col-md-3"}),t._v(" "),s("div",{staticClass:"form-group col-xs-4 col-md-2"},[s("div",{staticClass:"checkbox"},[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.spinner,expression:"spinner"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.spinner)?t._i(t.spinner,null)>-1:t.spinner},on:{__c:function(e){var s=t.spinner,n=e.target,i=!!n.checked;if(Array.isArray(s)){var o=t._i(s,null);n.checked?o<0&&(t.spinner=s.concat(null)):o>-1&&(t.spinner=s.slice(0,o).concat(s.slice(o+1)))}else t.spinner=i}}}),t._v(" I ߷ my XP\n        ")])])]),t._v(" "),s("div",{staticClass:"form-group col-xs-4 col-md-2"},[s("div",{staticClass:"checkbox"},[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.afk,expression:"afk"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.afk)?t._i(t.afk,null)>-1:t.afk},on:{__c:function(e){var s=t.afk,n=e.target,i=!!n.checked;if(Array.isArray(s)){var o=t._i(s,null);n.checked?o<0&&(t.afk=s.concat(null)):o>-1&&(t.afk=s.slice(0,o).concat(s.slice(o+1)))}else t.afk=i}}}),t._v(" I like to AFK\n        ")])])]),t._v(" "),s("div",{staticClass:"form-group col-xs-4 col-md-2"},[s("div",{staticClass:"checkbox"},[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.noWildy,expression:"noWildy"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.noWildy)?t._i(t.noWildy,null)>-1:t.noWildy},on:{__c:function(e){var s=t.noWildy,n=e.target,i=!!n.checked;if(Array.isArray(s)){var o=t._i(s,null);n.checked?o<0&&(t.noWildy=s.concat(null)):o>-1&&(t.noWildy=s.slice(0,o).concat(s.slice(o+1)))}else t.noWildy=i}}}),t._v(" I'm scared of CPK\n        ")])])]),t._v(" "),s("div",{staticClass:"col-xs-0 col-md-3"})]),t._v(" "),s("div",{staticClass:"row",attrs:{id:"boosts"}},[s("div",{staticClass:"col-xs-0 col-md-1 col-lg-2"}),t._v(" "),s("div",{staticClass:"col-xs-12 col-md-10 col-lg-8"},[s("span",[t._v("\n        Boosts (click to toggle):\n      ")]),t._v(" "),s("span",{staticClass:"list"},t._l(t.boosts,function(e,n){return s("span",{class:{disabled:!e},on:{click:function(e){t.toggleModifier(n)}}},[t._v("\n        "+t._s(n)+"\n        ")])}))]),t._v(" "),s("div",{staticClass:"col-xs-0 col-md-1 col-lg-2"})]),t._v(" "),s("br"),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-0 col-md-1 col-lg-2"}),t._v(" "),s("div",{staticClass:"col-xs-12 col-md-10 col-lg-8"},[s("div",{staticClass:"table-responsive"},[s("table",{staticClass:"table table-hover table-bordered",attrs:{id:"methods"}},[s("caption",[t._v("Most efficient methods (click on a method for more info):")]),t._v(" "),t._m(2),t._v(" "),s("tbody",[t._l(t.sortedMethods,function(e){return[s("method",{key:e.id,attrs:{tvc:t.tvc,boosts:t.boosts,data:e,display:e.display,alt:t.alt},on:{valueCalculated:t.updateMethodCost,descriptionToggled:t.toggleDescription}}),t._v(" "),s("method-desc",{attrs:{desc:e.desc,display:e.display&&e.descriptionDisplay}})]})],2)])])]),t._v(" "),s("div",{staticClass:"col-xs-0 col-md-1 col-lg-2"})])])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("label",{attrs:{for:"alt",id:"altLabel"}},[t._v("MM GP/hr My Alt Makes (0 = no alt)*\n        "),s("span",[t._v("alt is assumed to only be used for AFK skills, make a copy if you want to customize it to your usage")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"input-group-btn"},[s("button",{staticClass:"btn btn-default",attrs:{type:"submit"}},[t._v("Hide my 200m skills")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",{staticStyle:{width:"150px"}},[t._v("\n              Skill\n            ")]),t._v(" "),s("th",{staticStyle:{width:"150px"}},[t._v("\n              Method\n            ")]),t._v(" "),s("th",{staticStyle:{width:"150px"}},[t._v("\n              XP/HR (no boosts)\n            ")]),t._v(" "),s("th",{staticStyle:{width:"75px"}},[t._v("\n              GP/XP\n            ")]),t._v(" "),s("th",{staticStyle:{width:"250px"}},[t._v("\n              Requirements\n            ")]),t._v(" "),s("th",{staticStyle:{width:"250px"}},[t._v("\n              Boosts\n            ")])])])}]}},99:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("nav",{staticClass:"navbar navbar-default navbar-fixed-top"},[s("div",{staticClass:"container-fluid"},[t._m(0),t._v(" "),s("ul",{staticClass:"nav navbar-nav"},[s("li",[s("router-link",{attrs:{to:"/methods"}},[t._v("Efficient Skilling Methods")])],1),t._v(" "),s("li",[s("router-link",{attrs:{to:"/ehp"}},[t._v("EHP")])],1),t._v(" "),s("li",[s("router-link",{attrs:{to:"/all"}},[t._v("All Skilling Methods")])],1)])])]),t._v(" "),s("router-view"),t._v(" "),t._m(1)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"navbar-header"},[s("a",{staticClass:"navbar-brand"},[t._v("\n          ⚽\n        ")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("footer",{staticClass:"footer"},[s("div",{staticClass:"container"},[t._v("\n      Join the "),s("a",{attrs:{href:"https://discord.gg/QRqRFH8"}},[t._v("Discord")]),t._v(" if you want to help or provide feedback.\n      Thanks to Marina and Barge for helping test methods\n    ")])])}]}}},[43]);
//# sourceMappingURL=app.4e4522088432d4df10e7.js.map