<template>
  <div v-if="error">
    Error getting methods: {{error}}
  </div>
  <div v-else>
    Input your TVC in millions of GP/hr, decimals are allowed
    <input v-model.number="tvc" type="number">
    <table>
      <thead>
      <tr>
        <td>
          Skill
        </td>
        <td>
          Method Name
        </td>
        <td>
          Method Description/Guide
        </td>
        <td>
          XP/HR (no boosts)
        </td>
        <td>
          GP/XP
        </td>
        <td>
          Requirements
        </td>
        <td>
          Boosts
        </td>
      </tr>
      </thead>
      <tbody>
      <method v-for="methodData in sortedMethods" :key="methodData.id" :tvc="tvc" :data="methodData"
              :display="methodData.display" v-on:valueCalculated="updateMethodCost"></method>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Method from './Method';

  export default {
    components: {Method},
    name: 'method-table',
    data() {
      return {
        tvc: 10,
        methods: [],
        error: false,
      };
    },
    mounted() {
      const self = this;
      self.$http.get('./static/skilling_methods.json', {responseType: 'json'}).then((response) => {
        self.methods = response.body;
        self.methods.forEach(method => method.id = method.skill + method.name);
        self.methods.forEach(method => method.display = true);
      }, (response) => {
        self.error = response.statusText;
      });
    },
    computed: {
      sortedMethods() {
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
        for (let i = 0; i < sorted.length; i++) { // only display the best non-daily for each skill
          const current = sorted[i];
          current.display = true;
          const previous = sorted[i - 1];
          if (previous && !previous.daily && previous.skill === current.skill) {
            current.display = false;
          }
        }
        return sorted;
      },
    },
    methods: {
      updateMethodCost(method, cost) {
        if (method.effectiveCost !== cost) {
          method.effectiveCost = cost;
          this.methods.splice(this.methods.indexOf(method), 1, method);
        }
      },
    },
  };
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  table {
    width: 100%;
    padding-top: 10px;
  }
</style>
