<template>
  <div>
    <form class="row">
      <div class="col-xs-0 col-md-1 col-lg-2"></div>
      <div class="col-xs-12 col-md-10 col-lg-8">
        <label for="rsn">Runescape Username</label>
        <span class="input-group">
          <input type="text" v-model="rsn" class="form-control" id="rsn">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" v-on:click="fetchHiscore">Fetch stats</button>
          </span>
        </span>
      </div>
      <div class="col-xs-0 col-md-1 col-lg-2"></div>
    </form>
    <br/>
    <!--load all the methods with a 15M EHP to get the relative efficiency-->
    <template v-for="methodData in methods">
      <method :key="methodData.id" :tvc="15" :boosts="boosts" :data="methodData" :display="false"
              v-on:dailyCalculated="updateMethodDaily" v-on:valueCalculated="updateMethodCost"
              v-on:cCalculated="updateMethodC"></method>
    </template>
    <div class="row">
      <div class="col-xs-0 col-md-1 col-lg-2"></div>
      <div class="col-xs-12 col-md-10 col-lg-8">
        <div class="table-responsive">
          <table class="table table-hover table-bordered" id="methods">
            <caption>Player EHP (15M gp/hr TVC, counting in time needed to fund skills):</caption>
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
      <div class="col-xs-0 col-md-1 col-lg-2"></div>
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
      skillCosts() {
        const sorted = this.methods.sort((a, b) => { // sort methods by skill and efficiency
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
        const skillList = ['Attack', 'Defence', 'Strength', 'Constitution', 'Ranged', 'Prayer', 'Magic',
          'Cooking', 'Woodcutting', 'Fletching', 'Fishing', 'Firemaking', 'Crafting', 'Smithing',
          'Mining', 'Herblore', 'Agility', 'Thieving', 'Slayer', 'Farming', 'Runecrafting',
          'Hunter', 'Construction', 'Summoning', 'Dungeoneering', 'Divination', 'Invention'];
        const skillMap = {};
        skillList.forEach((skill, index) => skillMap[skill] = {remaining: 200000000, eCost: 0, rCost: 0, bonus: false});
        for (let i = 0; i < sorted.length; i++) {
          const current = sorted[i];
          const previous = sorted[i - 1];
          if ((previous && !previous.daily && !previous.bonus &&
              previous.skill === current.skill) || isNaN(current.effectiveCost)) {
            continue;
          }
          if (skillMap[current.skill].remaining <= 0) {
            continue;
          }
          if (skillMap[current.skill].bonus && current.bonus) {
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
            skillMap[current.skill].bonus = current.bonus || skillMap[current.skill].bonus;
            const methodXP = skillMap[current.skill].remaining / (current.bonus ? 2 : 1);
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
          const hours = skillInfo.eCost / 15000000;
          const cost = skillInfo.rCost;
          skillRates[skill] = {hours, cost};
        });
        return skillRates;
      },
      userEHP() {
        const ehpTable = {};
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
        });
        return ehpTable;
      },
    },
    mounted() {
      this.methods = window.methods.map(o => Object.assign({}, o));
      this.methods.forEach(method => method.id = method.skill + method.name);
      this.methods.forEach(method => method.display = true);
      this.methods.forEach(method => method.descriptionDisplay = false);
      this.methods.forEach(method => method.modifiers.forEach(modifier => this.$set(this.boosts, modifier.name, true)));
      this.fetchHiscore();
    },
    methods: {
      fetchHiscore() {
        const hiScoreUrl = 'https://cors-anywhere.herokuapp.com/http://services.runescape.com/m=hiscore/index_lite.ws';
        this.$http.get(hiScoreUrl, {params: {player: this.rsn}}).then((response) => {
          const skillXpList = response.body.split('\n').slice(1, 28).map(stats => parseInt(stats.split(',')[2], 10));
          const skillList = ['Attack', 'Defence', 'Strength', 'Constitution', 'Ranged', 'Prayer', 'Magic',
            'Cooking', 'Woodcutting', 'Fletching', 'Fishing', 'Firemaking', 'Crafting', 'Smithing',
            'Mining', 'Herblore', 'Agility', 'Thieving', 'Slayer', 'Farming', 'Runecrafting',
            'Hunter', 'Construction', 'Summoning', 'Dungeoneering', 'Divination', 'Invention'];
          const statsMap = {};
          skillList.forEach((skill, index) => statsMap[skill] = skillXpList[index]);
          this.stats = statsMap;
        }, (response) => {
          console.log(response.statusText);
        });
      },
      updateMethodCost(method, cost) {
        if (method.effectiveCost !== cost) {
          method.effectiveCost = cost;
          this.methods.splice(this.methods.indexOf(method), 1, method);
        }
      },
      updateMethodC(method, cost) {
        if (method.realCost !== cost) {
          method.realCost = cost;
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