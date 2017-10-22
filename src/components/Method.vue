<template>
  <tr v-if="display" v-on:click="toggleDesc">
    <td>
      {{skill}}
    </td>
    <td>
      {{name}}
    </td>
    <td>
      {{xpRate | formatXp}}
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
      methodData: {
        type: Object,
        required: true,
      },
      display: {
        type: Boolean,
        required: true,
      },
      bxpActive: {
        type: Boolean,
        required: true,
      },
      illuminationActive: {
        type: Boolean,
        required: true,
      },
      dxpActive: {
        type: Boolean,
        required: true,
      },
      tvc: {
        type: Number,
        required: true,
      },
      alt: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        name: this.methodData.name, // the name of the method
        skill: this.methodData.skill, // the skill this method is for
        actionXP: this.methodData.actionXP,
        actionsPerHour: this.methodData.actionsPerHour,
        baseCostPerXp: NaN, // basic cost per XP
        bonusEarning: this.methodData.bonusEarning, // if the method gives bonus XP
        illuminationOnly: this.methodData.illuminationOnly, // method boosted by illumination but not DXP weekend
        noDxp: this.methodData.noDxp, // method unaffected by DXP/Illumination
        noBxp: this.methodData.noBxp, // method unaffected by bonus XP
        requirements: this.methodData.requirements, // requirements needed
        daily: this.methodData.daily, // number of hours you can do the method, if daily method
        desc: this.methodData.desc, // description
        lossless: this.methodData.lossless, // whether this method is lossless XP
      };
    },
    computed: {
      baseXpRate() {
        return this.methodData.baseXpRate ? this.methodData.baseXpRate : this.actionXP * this.actionsPerHour;
      },
      baseBoost() { // calculate the boosts available to base XP
        return this.modifiers.filter(modifier => !modifier.disabled)
            .map(modifier => modifier.effect().base)
            .filter(base => base !== undefined).reduce((acc, cur) => acc * (1 + cur), 1) *
          this.requirements.filter(req => req.effect)
            .map(req => req.effect().base)
            .filter(base => base !== undefined).reduce((acc, cur) => acc * (1 + cur), 1);
      },
      bonusBoost() { // calculate the reward/bonus XP boosts available
        return 1 + this.modifiers.filter(modifier => !modifier.disabled)
            .map(modifier => modifier.effect().bonus)
            .filter(bonus => bonus !== undefined).reduce((acc, cur) => acc + cur, 0) +
          this.requirements.filter(req => req.effect)
            .map(req => req.effect().bonus)
            .filter(bonus => bonus !== undefined).reduce((acc, cur) => acc + cur, 0) +
          this.bxpBoost;
      },
      bxpBoost() {
        if (this.bonusEarning) {
          return 0;
        }
        let boost = 0;
        if (!this.noDxp && this.illuminationActive) {
          boost += 1;
        }
        if (!this.noDxp && !this.illuminationOnly && this.dxpActive) {
          boost += 1;
        }
        if (!this.noBxp && this.bxpActive) {
          boost += 1;
        }
        return boost;
      },
      modifiers() {
        return this.methodData.modifiers.map(modifier =>
          Object.assign({}, Object.assign(modifier, {disabled: !this.boosts[modifier.name]})));
      },
      cost() { // cost per XP after all boosts
        return this.baseCostPerXp * (this.baseXpRate === Infinity ? 1 : (this.baseXpRate / this.xpRate));
      },
      dailyXP() { // how much XP a daily can give per day
        return this.daily ? (this.daily.apply(this) * this.xpRate) : undefined;
      },
      effectiveCost() { // cost after considering time as money
        const alt = this.methodData.alt ? this.methodData.alt : 0;
        return this.cost + (this.lossless ? 0 : (1000000 * (this.tvc - this.alt * alt) / this.xpRate));
      },
      xpRate() { // XP rate after all boosts
        return this.baseXpRate * (this.baseBoost * this.bonusBoost);
      },
    },
    mounted() {
      window.loaded.then(() => this.baseCostPerXp = this.methodData.baseCostPerXp.apply(this));
    },
    methods: {
      toggleDesc() {
        this.$emit('descriptionToggled', this.methodData);
      },
    },
    watch: {
      dailyXP: {
        handler(amount, oldAmount) { // propagate the XP rate after boosts
          if (!isNaN(amount) && amount !== oldAmount) {
            this.$emit('dailyCalculated', this.methodData, amount);
          }
        },
        immediate: true,
      },
      effectiveCost: {
        handler(eCost, oldECost) { // propagate the cost accounting for time to the top to reorder the method display
          if (!isNaN(eCost) && eCost !== oldECost) {
            this.$emit('costCalculated', this.methodData, eCost, this.cost);
          }
        },
        immediate: true,
      },
      xpRate: {
        handler(xpRate, oldXpRate) { // propagate the cost accounting for time to the top to reorder the method display
          if (!isNaN(xpRate) && xpRate !== oldXpRate) {
            this.$emit('xpRateCalculated', this.methodData, xpRate);
          }
        },
        immediate: true,
      },
    },
  };
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
</style>
