<template>
  <tr>
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
      {{xpRate}}<br/>
      ({{base}})
    </td>
    <td>
      {{cost}}
    </td>
    <td>
      <span v-for='req in requirements'>{{ req }}<br/></span>
    </td>
    <td>
      <span v-for='modifier in modifiers'>{{ modifier.name }}<br/></span>
    </td>
  </tr>
</template>

<script>
  export default {
    name: 'method',
    props: {
      data: Object,
      tvc: Number,
    },
    data() {
      return {
        name: this.data.name,
        skill: this.data.skill,
        base: this.data.base,
        baseCost: new Function(this.data.baseCost)(),
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
        return this.data.modifiers.map(modifier => new Function(modifier.effect)().base)
          .filter(bonus => bonus !== undefined).reduce((acc, cur) => acc + cur, 0);
      },
      bonusBoost() {
        return this.data.modifiers.map(modifier => new Function(modifier.effect)().bonus)
          .filter(bonus => bonus !== undefined).reduce((acc, cur) => acc + cur, 0);
      },
      effectiveCost() { // cost after considering time as money
        return this.cost + this.lossless ? 0 : (10000000 / this.xpRate);
      },
      xpRate() {
        // `this` points to the vm instance
        return (this.base * (1 + this.baseBoost) * (1 + this.bonusBoost)).toFixed(0);
      },
      cost() {
        // `this` points to the vm instance
        return (this.baseCost / (1 + this.baseBoost) / (1 + this.bonusBoost)).toFixed(2);
      },
    },
  };
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
