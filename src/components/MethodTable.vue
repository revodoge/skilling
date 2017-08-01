<template>
  <div v-if="error">
    Error getting methods: {{error}}
  </div>
  <div v-else>
    Input your TVC in millions of GP/hr, decimals are allowed
    <input type="number" v-model.number="tvc">
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
      <method v-for="methodData in methods" :key="methodData.id" :tvc="tvc" :data="methodData"></method>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Method from './Method';

  export default {
    components: { Method },
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
      self.$http.get('./static/skilling_methods.json', { responseType: 'json' }).then((response) => {
        self.methods = response.body;
        console.log(self.methods);
      }, (response) => {
        self.error = response.statusText;
      });
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
