<template>
  <div v-if="error">
    Error getting methods: {{error}}
  </div>
  <div v-else>
    <form class="row">
      <div class="col-xs-0 col-md-1 col-lg-2"></div>
      <div class="form-group col-xs-6 col-md-5 col-lg-4">
        <label for="tvc">TVC in MM GP/hr</label>
        <input v-model.number="tvc" type="number" class="form-control" id="tvc">
      </div>
      <div class="form-group col-xs-6 col-md-5 col-lg-4">
        <label for="rsn">Runescape Username</label>
        <input type="text" v-model="rsn" class="form-control" id="rsn">
      </div>
      <div class="col-xs-0 col-md-1 col-lg-2"></div>
    </form>
    <div class="row" id="boosts">
      <div class="col-xs-0 col-md-1 col-lg-2"></div>
      <div class="col-xs-12 col-md-10 col-lg-8">
        <span>
          Boosts (click to toggle):
        </span>
        <span class="list">
          <span v-for="(value, key) in boosts" v-bind:class="{ disabled: !value }" v-on:click="toggleModifier(key)">
          {{key}}
          </span>
        </span>
      </div>
      <div class="col-xs-0 col-md-1 col-lg-2"></div>
    </div>
    <div class="row">
      <div class="col-xs-0 col-md-1 col-lg-2"></div>
      <div class="col-xs-12 col-md-10 col-lg-8">
        <div class="table-responsive">
          <table class="table table-hover table-bordered">
            <thead>
            <tr>
              <th width="150px">
                Skill
              </th>
              <th width="150px">
                Method
              </th>
              <th width="150px">
                XP/HR (no boosts)
              </th>
              <th width="75px">
                GP/XP
              </th>
              <th width="150px">
                Requirements
              </th>
              <th width="150px">
                Boosts
              </th>
            </tr>
            </thead>
            <tbody>
            <template v-for="methodData in sortedMethods">
              <method :key="methodData.id" :tvc="tvc" :boosts="boosts" :data="methodData" :display="methodData.display"
                      v-on:valueCalculated="updateMethodCost" v-on:descriptionToggled="toggleDescription"></method>
              <method-desc :desc="methodData.desc"
                           :display="methodData.display && methodData.descriptionDisplay"></method-desc>
            </template>
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
  import MethodDesc from './MethodDesc';

  export default {
    components: {Method, MethodDesc},
    name: 'method-table',
    data() {
      return {
        rsn: 'le me',
        tvc: 10,
        boosts: {},
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
        self.methods.forEach(method => method.descriptionDisplay = false);
        self.methods.forEach(method => method.modifiers.forEach(modifier => this.$set(this.boosts, modifier.name, true)));
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
          if (previous && !previous.daily && !previous.bonus &&
            previous.skill === current.skill && !isNaN(current.effectiveCost)) {
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
      toggleDescription(method) {
        method.descriptionDisplay = !method.descriptionDisplay;
        this.methods.splice(this.methods.indexOf(method), 1, method);
      },
      toggleModifier(modifier) {
        this.boosts[modifier] = !this.boosts[modifier];
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
</style>
