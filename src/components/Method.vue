<template>
  <tr v-if="display">
    <td>
      {{skill}}
    </td>
    <td>
      {{name}}
    </td>
    <td>
      {{desc}}
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
      <span v-for="req in requirements">{{ req.name }}<br/></span>
    </td>
    <td>
      <span v-for="modifier in modifiers" v-on:click="toggleModifier(modifier)"
            v-bind:class="{ disabled: modifier.disabled }">
        {{ modifier.name }}<br/></span>
    </td>
  </tr>
</template>

<script>
  export default {
    name: 'method',
    props: {
      data: Object,
      display: Boolean,
      tvc: Number,
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
        modifiers: this.data.modifiers, // modifiers you can boost XP with
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
      xpRate() { // XP rate after all boosts
        return (this.base * (1 + this.baseBoost) * (1 + this.bonusBoost));
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
      toggleModifier(modifier) {
        modifier.disabled = !modifier.disabled;
        this.modifiers.splice(this.modifiers.indexOf(modifier), 1, modifier);
      },
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
        if (window.priceCache[id]) {
          return new Promise((resolve) => {
            resolve(window.priceCache[id]);
          });
        }
        const api = 'https://cors-anywhere.herokuapp.com/http://services.runescape.com/m=itemdb_rs/api/graph/';
        return this.$http.get(`${api + id}.json`, {responseType: 'json'}).then((response) => {
          const i = response.body.daily;
          const price = i[Object.keys(i).sort().reverse()[0]];
          window.priceCache[id] = price;
          return price;
        }, () => NaN);
      },
    },
  };
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  span.disabled {
    opacity: 0.5;
  }
</style>
