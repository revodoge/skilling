<template>
  <tr v-if="display" v-on:click="toggleDesc">
    <td>
      {{skill}}
    </td>
    <td>
      {{name}}
    </td>
    <td>
      {{xpRate | formatXp}}<br/>
      ({{base | formatXp}})
      <template v-if="daily"><br/>{{dailyXP | formatXp}} XP/day</template>
    </td>
    <td>
      {{cost | formatCost}}
    </td>
    <td>
      <span class="list">
        <span v-for="(req, index) in requirements">{{req.name}}</span>
      </span>
    </td>
    <td>
      <span class="list">
        <span v-for="(modifier, index) in modifiers" v-if="!modifier.disabled">{{modifier.name}}</span>
      </span>
    </td>
  </tr>
</template>

<script>
  export default {
    name: 'method',
    props: {
      boosts: {
        type: Object,
        required: true,
      },
      data: {
        type: Object,
        required: true,
      },
      display: {
        type: Boolean,
        required: true,
      },
      tvc: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        name: this.data.name, // the name of the method
        skill: this.data.skill, // the skill this method is for
        base: new Function(this.data.base)(), // base XP per hour
        baseCost: NaN, // basic cost per XP
        requirements: this.data.requirements, // requirements needed
        daily: new Function(this.data.daily)(), // number of hours you can do the method, or false for non-daily methods
        desc: this.data.desc, // description
        lossless: this.data.lossless, // whether this method is lossless XP
      };
    },
    computed: {
      baseBoost() { // calculate the boosts available to base XP
        return this.modifiers.filter(modifier => !modifier.disabled)
            .map(modifier => new Function(modifier.effect)().base)
            .filter(base => base !== undefined).reduce((acc, cur) => acc + cur, 0) +
          this.requirements.filter(req => req.effect)
            .map(req => new Function(req.effect)().base)
            .filter(base => base !== undefined).reduce((acc, cur) => acc + cur, 0);
      },
      bonusBoost() { // calculate the reward/bonus XP boosts available
        return this.modifiers.filter(modifier => !modifier.disabled)
            .map(modifier => new Function(modifier.effect)().bonus)
            .filter(bonus => bonus !== undefined).reduce((acc, cur) => acc + cur, 0) +
          this.requirements.filter(req => req.effect)
            .map(req => new Function(req.effect)().bonus)
            .filter(bonus => bonus !== undefined).reduce((acc, cur) => acc + cur, 0);
      },
      cost() { // cost per XP after all boosts
        return (this.baseCost / (1 + this.baseBoost) / (1 + this.bonusBoost));
      },
      dailyXP() { // how much XP a daily can give per day
        return this.daily * this.xpRate;
      },
      effectiveCost() { // cost after considering time as money
        return this.cost + (this.lossless ? 0 : (1000000 * this.tvc / this.xpRate));
      },
      modifiers() {
        return this.data.modifiers.map(modifier =>
          Object.assign(modifier, {disabled: !this.boosts[modifier.name]})); // modifiers you can boost XP with
      },
      xpRate() { // XP rate after all boosts
        return (this.base * (1 + this.baseBoost) * (1 + this.bonusBoost));
      },
    },
    watch: {
      effectiveCost(cost) { // propagate the cost accounting for time to the top to reorder the method display
        if (!isNaN(cost)) {
          this.$emit('valueCalculated', this.data, cost);
        }
      },
    },
    mounted() {
      this.evalCost(this.data.baseCost);
    },
    methods: {
      evalCost(costString) { // evaluate cost and take prices from GE
        const unevaluatedPrice = costString.match(/getPrice\((\d+)\)/);
        if (unevaluatedPrice) {
          this.getPrice(unevaluatedPrice[1]).then((price) => {
            this.evalCost(costString.replace(unevaluatedPrice[0], price));
          });
        } else {
          this.baseCost = new Function(costString)();
        }
      },
      getPrice(id) { // price from GE, consider a better API to use
        if (localStorage.getItem(id)) {
          return new Promise((resolve) => {
            resolve(parseInt(localStorage.getItem(id), 10));
          });
        }
        const api = 'https://cors-anywhere.herokuapp.com/http://services.runescape.com/m=itemdb_rs/api/graph/';
        return this.$http.get(`${api + id}.json`, {responseType: 'json'}).then((response) => {
          if (!response.body) {
            return NaN;
          }
          const i = response.body.daily;
          const time = Object.keys(i).sort().reverse()[0];
          const price = i[time];
          if (localStorage.getItem('geTime') !== time.toString()) {
            localStorage.clear();
            localStorage.setItem('geTime', time);
          }
          localStorage.setItem(id, price);
          return price;
        }, () => NaN);
      },
      toggleDesc() {
        this.$emit('descriptionToggled', this.data);
      },
    },
  };
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
