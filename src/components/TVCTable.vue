<template>
  <div>
    <form class="row">
      <div class="col-xs-0 col-md-1"></div>
      <div class="form-group col-xs-12 col-md-10">
        <label for="skill">Skill</label>
        <select v-model="skill" class="form-control" id="skill">
          <template v-for="skill in skills">
            <option v-bind:value="skill">{{skill}}</option>
          </template>
        </select>
      </div>
      <div class="col-xs-0 col-md-1"></div>
    </form>
    <form class="row">
      <div class="col-xs-0 col-md-2"></div>
      <div class="form-group col-xs-3 col-md-2">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="spinner"> You ߷ me right 'round
          </label>
        </div>
      </div>
      <div class="form-group col-xs-3 col-md-2">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="noWildy"> I'm scared of CPK
          </label>
        </div>
      </div>
      <div class="form-group col-xs-3 col-md-2">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="afk"> I like to AFK
          </label>
        </div>
      </div>
      <div class="form-group col-xs-3 col-md-2">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="triHard"> I'm a TriHard
          </label>
        </div>
      </div>
      <div class="col-xs-0 col-md-2"></div>
    </form>
    <form class="row">
      <div class="col-xs-0 col-md-2"></div>
      <div class="form-group col-xs-4 col-md-2">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="illuminationActive">Illumination 100%
          </label>
        </div>
      </div>
      <div class="col-xs-0 col-md-1"></div>
      <div class="form-group col-xs-4 col-md-2">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="bxpActive">I have bonus XP
          </label>
        </div>
      </div>
      <div class="col-xs-0 col-md-1"></div>
      <div class="form-group col-xs-4 col-md-2">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="dxpActive">DXP Weekend
          </label>
        </div>
      </div>
      <div class="col-xs-0 col-md-2"></div>
    </form>
    <form class="row">
      <div class="col-xs-3 col-md-3"></div>
      <div class="form-group col-xs-3 col-md-3">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="hideBonus">Hide bonus XP methods
          </label>
        </div>
      </div>
      <div class="form-group col-xs-3 col-md-3">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="hideDaily">Hide dailies
          </label>
        </div>
      </div>
      <div class="col-xs-3 col-md-3"></div>
    </form>
    <div class="row" id="boosts">
      <div class="col-xs-0 col-md-1"></div>
      <div class="col-xs-12 col-md-10">
        <span>
          Boosts (click to toggle):
        </span>
        <span class="list">
          <span v-for="(value, key) in boosts" v-bind:class="{ disabled: !value }" v-on:click="toggleModifier(key)">
          {{key}}
          </span>
        </span>
      </div>
      <div class="col-xs-0 col-md-1"></div>
    </div>
    <br/>
    <template v-for="methodData in filteredMethods">
      <method :key="methodData.id" :tvc="0" :boosts="boosts" :methodData="methodData" :display="false"
              :bxpActive="bxpActive" v-on:xpRateCalculated="updateMethodXpRate"
              :alt="alt" v-on:costCalculated="updateMethodCost" :illuminationActive="illuminationActive"
              :dxpActive="dxpActive"></method>
    </template>
    <div class="row">
      <div class="col-xs-0 col-md-1"></div>
      <div class="col-xs-12 col-md-10">
        <div class="table-responsive">
          <table class="table table-hover table-bordered" id="methods">
            <caption>Skilling methods, with TVC ranges where it is the most efficient (click on a method for more info):</caption>
            <thead>
            <tr>
              <th style="width: 150px;">
                Skill
              </th>
              <th style="width: 150px;">
                Method
              </th>
              <th style="width: 150px;">
                XP/HR
              </th>
              <th style="width: 75px;">
                GP/XP
              </th>
              <th style="width: 250px;">
                Requirements
              </th>
              <th style="width: 250px;">
                Boosts
              </th>
            </tr>
            </thead>
            <tbody>
            <template v-for="method in methodsWithRanges">
              <tr>
                <td colspan="6">
                  <strong>{{method.startTvc | formatXp}} - {{method.endTvc | formatXp}}</strong>
                </td>
              </tr>
              <method :key="method.data.id" :tvc="0" :boosts="boosts" :methodData="method.data" :display="true"
                      :bxpActive="bxpActive" :alt="alt" :illuminationActive="illuminationActive"
                      :dxpActive="dxpActive" v-on:descriptionToggled="toggleDescription"></method>
              <method-desc :desc="method.data.desc" :display="method.data.descriptionDisplay"></method-desc>
            </template>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-xs-0 col-md-1"></div>
    </div>
  </div>
</template>

<script>
  import * as _ from 'lodash';
  import Method from './Method';
  import MethodDesc from './MethodDesc';

  export default {
    components: {Method, MethodDesc},
    name: 'tvc-table',
    data() {
      return {
        boosts: {},
        methods: [],
        tvc: 20,
        alt: 10,
        spinner: true,
        afk: false,
        triHard: true,
        noWildy: false,
        illuminationActive: false,
        dxpActive: false,
        bxpActive: false,
        hideBonus: true,
        hideDaily: true,
        skills: window.skillList,
        skill: this.$route.query.skill || 'Agility',
      };
    },
    computed: {
      filteredMethods() {
        return this.methods.filter(a => a.skill === this.skill &&
          (!a.spinner || this.spinner) && (!a.triHard || this.triHard)
          && (a.afk || !this.afk) && (!a.wildy || !this.noWildy)
          && (!a.daily || !this.hideDaily) && (!a.bonusEarning || !this.hideBonus),
        );
      },
      sortedMethods() {
        return this.filteredMethods.filter(a => Object.prototype.hasOwnProperty.call(a, 'realCost'))
          .map(x => Object.assign(x, {timeValuedXpRate: x.lossless ? Infinity : x.xpRate})).sort((a, b) =>
            a.timeValuedXpRate - b.timeValuedXpRate);
      },
      methodsWithRanges() {
        const cheapest = _.minBy(this.sortedMethods, x => x.realCost);
        const methods = this.sortedMethods.slice(this.sortedMethods.indexOf(cheapest));
        return cheapest ? this.buildTvc([], methods, 0) : [];
      },
    },
    mounted() {
      this.methods = window.methods.map(o => Object.assign({}, o));
      this.methods.forEach(method => method.id = method.skill + method.name);
      this.methods.forEach(method => method.descriptionDisplay = false);
      this.methods.forEach(method => method.modifiers.forEach(modifier => this.$set(this.boosts, modifier.name, true)));
    },
    watch: {
      skill(skill) {
        this.$router.push({name: 'TVC', query: {skill}});
      },
    },
    methods: {
      buildTvc(list, methods, minTvc) {
        if (methods.length === 0) {
          return list;
        }
        const currentMethod = methods[0];
        // equality check on xpRate to account for parallel lines showing up as intersecting at -Infinity
        const nextMethod = _.minBy(methods.slice(1),
          method => (currentMethod.timeValuedXpRate === method.timeValuedXpRate ? Infinity :
            (currentMethod.realCost - method.realCost) /
            (1 / method.timeValuedXpRate - 1 / currentMethod.timeValuedXpRate)));
        const remaining = !nextMethod ? [] : methods.slice(methods.indexOf(nextMethod));
        const nextTvc = !nextMethod ? Infinity :
          (currentMethod.realCost - nextMethod.realCost) /
          (1 / nextMethod.timeValuedXpRate - 1 / currentMethod.timeValuedXpRate);
        if (Math.abs(minTvc - nextTvc) > 1) {
          list.push({startTvc: minTvc, endTvc: nextTvc, data: currentMethod});
        }
        return this.buildTvc(list, remaining, nextTvc);
      },
      toggleDescription(method) {
        method.descriptionDisplay = !method.descriptionDisplay;
        this.methods.splice(this.methods.indexOf(method), 1, method);
      },
      toggleModifier(modifier) {
        this.boosts[modifier] = !this.boosts[modifier];
      },
      updateMethodCost(method, eCost, rCost) {
        if (method.effectiveCost !== eCost) {
          method.effectiveCost = eCost;
          method.realCost = rCost;
          this.methods.splice(this.methods.indexOf(method), 1, method);
        }
      },
      updateMethodDaily(method, amount) {
        if (method.dailyAmt !== amount) {
          method.dailyAmt = amount;
          this.methods.splice(this.methods.indexOf(method), 1, method);
        }
      },
      updateMethodXpRate(method, xpRate) {
        if (method.xpRate !== xpRate) {
          method.xpRate = xpRate;
          this.methods.splice(this.methods.indexOf(method), 1, method);
        }
      },
    },
  };
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
  span.disabled {
    opacity: 0.5;
  }

  .list > span:after {
    content: ",";
  }

  .list > span:last-child:after {
    content: "";
  }

  tr > th {
    text-align: center;
  }

  .row {
    padding-left: 30px;
    padding-right: 30px;
  }

  #boosts {
    text-align: left;
  }

  #methods {
    width: 1026px;
    margin: auto;
  }

  #methods.table > thead > tr > th, #methods.table > tbody > tr > td {
    white-space: normal;
  }

  #altLabel > span {
    display: none;
    font-size: 10px;
  }

  #altLabel:hover > span {
    display: block;
  }
</style>
