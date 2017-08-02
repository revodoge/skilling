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
        name: this.data.name,
        skill: this.data.skill,
        base: new Function(this.data.base)(),
        baseCost: NaN,
        requirements: this.data.requirements,
        // Add modifiers so you can specify if you have skilling outfits?
        daily: this.data.daily,
        desc: this.data.desc,
        lossless: this.data.lossless,
        modifiers: this.data.modifiers,
      };
    },
    computed: {
      baseBoost() {
        return this.modifiers.filter(modifier => !modifier.disabled)
            .map(modifier => new Function(modifier.effect)().base)
            .filter(base => base !== undefined).reduce((acc, cur) => acc + cur, 0) +
          this.requirements.filter(req => req.effect)
            .map(req => new Function(req.effect)().base)
            .filter(base => base !== undefined).reduce((acc, cur) => acc + cur, 0);
      },
      bonusBoost() {
        return this.modifiers.filter(modifier => !modifier.disabled)
            .map(modifier => new Function(modifier.effect)().bonus)
            .filter(bonus => bonus !== undefined).reduce((acc, cur) => acc + cur, 0) +
          this.requirements.filter(req => req.effect)
            .map(req => new Function(req.effect)().bonus)
            .filter(bonus => bonus !== undefined).reduce((acc, cur) => acc + cur, 0);
      },
      xpRate() {
        // `this` points to the vm instance
        return (this.base * (1 + this.baseBoost) * (1 + this.bonusBoost));
      },
      cost() {
        // `this` points to the vm instance
        return (this.baseCost / (1 + this.baseBoost) / (1 + this.bonusBoost));
      },
      effectiveCost() { // cost after considering time as money
        return this.cost + (this.lossless ? 0 : (1000000 * this.tvc / this.xpRate));
      },
    },
    watch: {
      effectiveCost(cost) {
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
      evalCost(costString) {
        const unevaluatedPrice = costString.match(/getPrice\((\d+)\)/);
        if (unevaluatedPrice) {
          this.getPrice(unevaluatedPrice[1]).then((price) => {
            this.evalCost(costString.replace(unevaluatedPrice[0], price));
          });
        } else {
          this.baseCost = new Function(costString)();
        }
      },
      getPrice(id) {
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
