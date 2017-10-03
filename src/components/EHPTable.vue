<template>
  <div>
    <form class="row" v-on:submit.prevent="fetchHiscore">
      <div class="col-xs-0 col-md-1"></div>
      <div class="col-xs-12 col-md-10">
        <label for="rsn">Runescape Username</label>
        <span class="input-group">
          <input type="text" v-model="rsn" class="form-control" id="rsn">
          <span class="input-group-btn">
            <button class="btn btn-default" type="submit">Fetch stats</button>
          </span>
        </span>
      </div>
      <div class="col-xs-0 col-md-1"></div>
    </form>
    <br/>
    <!--load all the methods with a 15M EHP and 9M alt to get the relative efficiency-->
    <template v-for="methodData in filteredMethods">
      <method :key="methodData.id" :tvc="20" :boosts="boosts" :methodData="methodData" :display="false"
              :illuminationActive="false" :dxpActive="false" :bxpActive="false"
              :alt="10" v-on:dailyCalculated="updateMethodDaily" v-on:valueCalculated="updateMethodCost"></method>
    </template>
    <div class="row">
      <div class="col-xs-0 col-md-1"></div>
      <div class="col-xs-12 col-md-10">
        <div class="table-responsive">
          <table class="table table-hover table-bordered" id="methods">
            <caption>
              Player EHP (20MM gp/hr TVC, counting in time needed to fund skills, making 10MM gp/hr on alts during AFK skills, 800 days of dailies):
            </caption>
            <thead>
            <tr>
              <th style="width: 150px;">
                Skill
              </th>
              <th style="width: 200px;">
                Player XP
              </th>
              <th style="width: 75px;">
                EHP
              </th>
              <th style="width: 200px;">
                XP Left
              </th>
              <th style="width: 75px;">
                EHP Left
              </th>
              <th style="width: 250px;">
                GP Needed
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(skillData, skill) in userEHP">
              <td>
                {{skill}}
              </td>
              <td>
                {{skillData.current | formatXp}}
              </td>
              <td>
                {{skillData.hoursDone | formatCost}}
              </td>
              <td>
                {{skillData.remaining | formatXp}}
              </td>
              <td>
                {{skillData.hoursLeft | formatCost}}
              </td>
              <td>
                {{skillData.gpLeft | formatXp}}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-xs-0 col-md-1"></div>
    </div>
  </div>
</template>

<script>
  import Method from './Method';

  export default {
    components: {Method},
    name: 'ehp-table',
    data() {
      return {
        boosts: {},
        methods: [],
        rsn: 'Marina',
        stats: {},
      };
    },
    computed: {
      filteredMethods() {
        return this.methods.filter(a => !a.triHard);
      },
      skillCosts() {
        const sorted = this.filteredMethods.sort((a, b) => { // sort methods by skill and efficiency
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
        const skillMap = {};
        window.skillList.forEach((skill, index) =>
          skillMap[skill] = {remaining: 200000000, eCost: 0, rCost: 0, bonusEarned: false});
        for (let i = 0; i < sorted.length; i++) {
          const current = sorted[i];
          const previous = sorted[i - 1];
          if (current.hideMethod) {
            continue;
          }
          if ((previous && !previous.daily && !previous.hideMethod && !previous.bonusEarning &&
              previous.skill === current.skill) || isNaN(current.effectiveCost)) {
            continue;
          }
          if (skillMap[current.skill].remaining <= 0) {
            continue;
          }
          if (skillMap[current.skill].bonusEarned && current.bonusEarning) {
            continue;
          }
          if (current.daily) {
            const applicableDays = Math.min(skillMap[current.skill].remaining / current.dailyAmt, 800);
            const methodXP = applicableDays * current.dailyAmt;
            const methodECost = methodXP * current.effectiveCost;
            const methodRCost = methodXP * current.realCost;
            skillMap[current.skill].remaining -= methodXP;
            skillMap[current.skill].eCost += methodECost;
            skillMap[current.skill].rCost += methodRCost;
          } else {
            skillMap[current.skill].bonusEarned = current.bonusEarning || skillMap[current.skill].bonusEarned;
            const methodXP = skillMap[current.skill].remaining / (current.bonusEarning ? 2 : 1);
            const methodECost = methodXP * current.effectiveCost;
            const methodRCost = methodXP * current.realCost;
            skillMap[current.skill].remaining -= methodXP;
            skillMap[current.skill].eCost += methodECost;
            skillMap[current.skill].rCost += methodRCost;
          }
        }
        return skillMap;
      },
      skillRates() {
        const skillRates = {};
        Object.keys(this.skillCosts).forEach((skill) => {
          const skillInfo = this.skillCosts[skill];
          if (skillInfo.remaining > 0) {
            return;
          }
          const hours = skillInfo.eCost / 20000000;
          const cost = skillInfo.rCost;
          skillRates[skill] = {hours, cost};
        });
        return skillRates;
      },
      userEHP() {
        const ehpTable = {Overall: {current: 0, hoursDone: 0, remaining: 0, hoursLeft: 0, gpLeft: 0}};
        Object.keys(this.skillRates).forEach((skill) => {
          const current = this.stats[skill];
          const hours = this.skillRates[skill].hours;
          const cost = this.skillRates[skill].cost;
          const remaining = 200000000 - current;
          const completionPct = current / 200000000;
          const remainingPct = remaining / 200000000;
          const hoursDone = completionPct * hours;
          const hoursLeft = remainingPct * hours;
          const gpLeft = remainingPct * cost;
          ehpTable[skill] = {current, hoursDone, remaining, hoursLeft, gpLeft};
          ehpTable.Overall.current += current;
          ehpTable.Overall.hoursDone += hoursDone;
          ehpTable.Overall.remaining += remaining;
          ehpTable.Overall.hoursLeft += hoursLeft;
          ehpTable.Overall.gpLeft += gpLeft;
        });
        return ehpTable;
      },
    },
    mounted() {
      this.methods = window.methods.map(o => Object.assign({}, o));
      this.methods.forEach(method => method.id = method.skill + method.name);
      this.methods.forEach(method => method.modifiers.forEach(modifier => this.$set(this.boosts, modifier.name, true)));
      this.fetchHiscore();
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
    },
  };
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
  tr > th {
    text-align: center;
  }

  .row {
    padding-left: 30px;
    padding-right: 30px;
  }

  #methods {
    width: 951px;
    margin: auto;
  }

  #methods.table > thead > tr > th, #methods.table > tbody > tr > td {
    white-space: normal;
  }
</style>
