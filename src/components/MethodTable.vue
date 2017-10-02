<template>
  <div>
    <form class="row">
      <div class="col-xs-0 col-md-1"></div>
      <div class="form-group col-xs-6 col-md-5">
        <label for="tvc">MM GP/hr my time is worth</label>
        <input v-model.number="tvc" type="number" class="form-control" id="tvc">
      </div>
      <div class="form-group col-xs-6 col-md-5">
        <label for="alt" id="altLabel">MM GP/hr my alt makes (0 = no alt)*
          <span>alt is assumed to only be used for AFK skills, make a copy if you want to customize it to your usage</span></label>
        <input v-model.number="alt" type="number" class="form-control" id="alt">
      </div>
      <div class="col-xs-0 col-md-1"></div>
    </form>
    <form class="row" v-on:submit.prevent="fetchHiscore">
      <div class="col-xs-0 col-md-1"></div>
      <div class="form-group col-xs-12 col-md-10">
        <label for="rsn">Runescape Username</label>
        <span class="input-group">
          <input type="text" v-model="rsn" class="form-control" id="rsn">
          <span class="input-group-btn">
            <button class="btn btn-default" type="submit">Hide my 200m skills</button>
          </span>
        </span>
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
    <div class="row">
      <div class="col-xs-0 col-md-1"></div>
      <div class="col-xs-12 col-md-10">
        <div class="table-responsive">
          <table class="table table-hover table-bordered" id="methods">
            <caption>Most efficient methods (click on a method for more info):</caption>
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
            <template v-for="methodData in sortedMethods">
              <method :key="methodData.id" :tvc="tvc" :boosts="boosts" :methodData="methodData"
                      :display="methodData.display" :bxpActive="bxpActive"
                      :alt="alt" v-on:valueCalculated="updateMethodCost" :illuminationActive="illuminationActive"
                      :dxpActive="dxpActive"
                      v-on:descriptionToggled="toggleDescription"></method>
              <method-desc :desc="methodData.desc"
                           :display="methodData.display && methodData.descriptionDisplay"></method-desc>
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
  import _ from 'lodash';
  import Method from './Method';
  import MethodDesc from './MethodDesc';

  export default {
    components: {Method, MethodDesc},
    name: 'method-table',
    data() {
      return {
        boosts: {},
        methods: [],
        rsn: 'couchy',
        stats: {},
        tvc: 100,
        alt: 0,
        spinner: true,
        afk: false,
        triHard: true,
        noWildy: false,
        illuminationActive: false,
        dxpActive: false,
        bxpActive: false,
      };
    },
    computed: {
      sortedMethods() {
        const sorted = this.methods.filter(a =>
          (!a.spinner || this.spinner) && (!a.triHard || this.triHard)
          && (a.afk || !this.afk) && (!a.wildy || !this.noWildy),
        ).sort((a, b) => { // sort methods by skill and efficiency
          const skillA = a.skill;
          const skillB = b.skill;
          const costA = a.effectiveCost;
          const costB = b.effectiveCost;

          if (skillA < skillB) return -1;
          if (skillA > skillB) return 1;
          if (costA < costB) return -1;
          if (costA > costB) return 1;
          return 0;
        });
        // TODO: add warning if TVC is set too low and a method has negative cost
        // TODO: add warning if alt is higher than TVC
        const skillsMap = window.skillList.reduce((acc, skill) => {
          // hide bonus XP methods for illuminaiton/DXP or if bonus is already accumulated
          acc[skill] = {
            bonusEarning: this.illuminationActive || this.dxpActive || this.bxpActive,
            normal: false,
            mutuallyExclusive: false,
          };
          return acc;
        }, {});
        for (let i = 0; i < sorted.length; i++) { // only display the best non-daily for each skill
          const current = sorted[i];
          current.normal = !current.bonusEarning;

          const methodTypeAlreadyMarked = function markMethodType(methodType) {
            return skillsMap[current.skill][methodType] && current[methodType];
          };

          const markMethodType = function markMethodType(methodType) {
            skillsMap[current.skill][methodType] = skillsMap[current.skill][methodType] || current[methodType];
          };

          // add filters for BoC, Tree Runs to see the best value
          current.display = !(this.stats[current.skill] === 200000000 || (!isNaN(current.effectiveCost)
            && (skillsMap[current.skill].normal || methodTypeAlreadyMarked('bonusEarning')
              || methodTypeAlreadyMarked('mutuallyExclusive'))));
          markMethodType('mutuallyExclusive');
          if (!current.daily) {
            markMethodType('bonusEarning');
            markMethodType('normal');
          }
        }
        // TODO: track multiskill methods (e.g. all warbands skills, daily challenges, goebie)
        // find all method by method name. filter visible ones. compare each to the best outside of that method
        // set all but the best to hidden
        /*
        this.crossSkillMethods.forEach(method => {
        const methods = sorted.filter(skill => skill.name === method && skill.display);
        const other = methods.map(method => sorted.find(otherMethod => otherMethod.skill === method.skill
         && !otherMethod.bonusEarning));
        const ratio = methods.zip(other).map((method, other) => other.effectiveCost / method.effectiveCost);
        });
        */

        return sorted;
      },
    },
    mounted() {
      this.methods = window.methods.map(o => Object.assign({}, o));
      this.methods.forEach(method => method.id = method.skill + method.name);
      this.methods.forEach(method => method.display = true);
      this.methods.forEach(method => method.descriptionDisplay = false);
      this.methods.forEach(method => method.modifiers.forEach(modifier => this.$set(this.boosts, modifier.name, true)));
    },
    methods: {
      fetchHiscore() {
        const hiScoreUrl = 'https://243.ip-149-56-134.net:8080/http://services.runescape.com/m=hiscore/index_lite.ws';
        this.$http.get(hiScoreUrl, {params: {player: this.rsn}}).then((response) => {
          const skillXpList = response.body.split('\n').slice(1, 28).map(stats => parseInt(stats.split(',')[2], 10));
          const statsMap = {};
          window.skillList.forEach((skill, index) => statsMap[skill] = skillXpList[index]);
          this.stats = statsMap;
        }, (response) => {
          console.log(response.statusText);
        });
      },
      toggleDescription(method) {
        method.descriptionDisplay = !method.descriptionDisplay;
        this.methods.splice(this.methods.indexOf(method), 1, method);
      },
      toggleModifier(modifier) {
        this.boosts[modifier] = !this.boosts[modifier];
      },
      updateMethod: _.debounce(function updateMethod(method) {
        this.$set(this.methods, this.methods.indexOf(method), method);
      }, 50),
      updateMethodCost(method, cost) {
        if (method.effectiveCost !== cost) {
          method.effectiveCost = cost;
          this.updateMethod(method);
        }
      },
    },
    watch: {
      afk(afk) {
        if (afk) {
          this.triHard = false;
        }
      },
      triHard(triHard) {
        if (triHard) {
          this.afk = false;
        }
      },
      illuminationActive(active) {
        if (active) {
          this.dxpActive = false;
        }
      },
      dxpActive(active) {
        if (active) {
          this.illuminationActive = false;
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
    content: ", ";
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
