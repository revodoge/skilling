<template>
  <div>
    This page assumes max junk chance reduction, uses GE prices, and disassemble rates from RS wiki.
    Components per hour is based on 4 Auto disassembler mk. II machines.
    Note that many of the cheapest items are super low volume and will not buy in the GE.
    <form class="row">
      <div class="col-xs-0 col-md-1"></div>
      <div class="form-group col-xs-12 col-md-10">
        <label for="mat-type">Component type</label>
        <select v-model="material" class="form-control" id="mat-type">
          <template v-for="mat in materials">
            <option v-bind:value="mat">{{mat}}</option>
          </template>
        </select>
      </div>
      <div class="col-xs-0 col-md-1"></div>
    </form>
    <br/>
    <div class="row">
      <div class="col-xs-0 col-md-1"></div>
      <div class="form-group col-xs-12 col-md-10">
        <label for="name">Item name</label>
        <input type="text" v-model="filters.name" class="form-control" id="name">
      </div>
      <div class="col-xs-0 col-md-1"></div>
    </div>
    <br/>
    <div class="row">
      <div class="col-xs-0 col-md-1"></div>
      <div class="col-xs-3 col-md-2">
        <label for="cost">Max cost per comp (raw)</label>
        <input type="number" v-model="filters.cost" class="form-control" id="cost">
      </div>
      <div class="col-xs-3 col-md-3">
        <label for="comps">Min comps per machine per hour</label>
        <input type="number" v-model="filters.comps" class="form-control" id="comps">
      </div>
      <div class="col-xs-3 col-md-2">
        <label for="totCost">Max cost per comp (machine)</label>
        <input type="number" v-model="filters.totCost" class="form-control" id="totCost">
      </div>
      <div class="col-xs-3 col-md-3">
        <label for="compsLimit">Min comps per hour, after GE limit</label>
        <input type="number" v-model="filters.compsLimit" class="form-control" id="compsLimit">
      </div>
      <div class="col-xs-0 col-md-1"></div>
    </div>
    <br/>
    <div class="row">
      <div class="col-xs-0 col-md-1"></div>
      <div class="col-xs-12 col-md-10">
        <div class="table-responsive">
          <table class="table table-hover table-bordered">
            <thead>
            <tr>
              <th v-for="(name, key) in columns"
                  @click="sortBy(key)"
                  :class="{ active: sortKey == key }">
                {{ name }}
                <span class="arrow" :class="sortOrder > 0 ? 'asc' : 'dsc'">
          </span>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="entry in sortedItems">
              <td v-for="(name, key) in columns">
                {{entry[key] | roundNumber}}
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
  import * as _ from 'lodash';

  export default {
    name: 'disassemble',
    data() {
      return {
        chargeCost: 0,
        materials: ['Base', 'Blade', 'Clear', 'Connector', 'Cover', 'Crafted', 'Crystal', 'Deflecting', 'Delicate',
          'Flexible', 'Head', 'Magic', 'Metallic', 'Organic', 'Padded', 'Plated', 'Simple', 'Smooth', 'Spiked',
          'Spiritual', 'Stave', 'Tensile', 'Dextrous', 'Direct', 'Enhancing', 'Ethereal', 'Evasive', 'Healthy',
          'Heavy', 'Imbued', 'Light', 'Living', 'Pious', 'Powerful', 'Precious', 'Precise', 'Protective', 'Sharp',
          'Strong', 'Stunning', 'Subtle', 'Swift', 'Variable'],
        material: this.$route.query.material || 'Base',
        data: [],
        columns: {
          name: 'Name',
          cost: 'Cost per component (raw)',
          comps: 'Components per hour',
          totCost: 'Cost per component (machine)',
          compsLimit: 'Components per hour, after GE limit',
        },
        filters: {cost: 1e69, comps: 0, totCost: 1e69, compsLimit: 0, name: ''},
        sortKey: 'name',
        sortOrder: 1,
      };
    },
    computed: {
      calculatedData() {
        return this.data
          .map((item) => {
            const compsPerItem = item.mats * (100 - item.junk * 0.8) / 100 * item.raw / 100;
            return Object.assign({compsPerItem, cost: item.price / compsPerItem, name: item.name}, item);
          })
          .map(item => Object.assign({
            costWithCharges: item.cost + 3.8 / 3000 * this.chargeCost / item.compsPerItem,
          }, item))
          .map(item => ({
            name: item.name,
            cost: item.cost,
            comps: item.compsPerItem * 240,
            totCost: item.costWithCharges,
            compsLimit: item.compsPerItem * Math.min(240, item.limit / 4),
          }));
      },
      filteredItems() {
        return this.calculatedData
          .filter(a => this.filters.name.length === 0 || a.name.toLowerCase().includes(this.filters.name.toLowerCase()))
          .filter(a => a.cost <= this.filters.cost
            && a.totCost <= this.filters.totCost
            && a.comps >= this.filters.comps
            && a.compsLimit >= this.filters.compsLimit);
      },
      sortedItems() {
        return this.filteredItems
          .sort((prev, current) => this.sortOrder *
            (typeof prev[this.sortKey] === 'number' ? (prev[this.sortKey] - current[this.sortKey])
              : prev[this.sortKey].localeCompare(current[this.sortKey])));
      },
    },
    filters: {
      roundNumber(value) {
        return typeof value === 'number' ? value.toLocaleString('en-US') : value;
      },
    },
    mounted() {
      window.loaded.then(prices => this.chargeCost = prices['Divine charge']);
    },
    watch: {
      material: {
        handler(material) {
          this.$router.push({name: 'Disassembling', query: {material}});
          const wikiCalcUrl = `https://runescape.wiki/w/Calculator:Disassembly_by_material/${material}`;

          this.$http.get(`https://115.ip-167-114-3.net:8080/${wikiCalcUrl}`, {params: {player: this.rsn}})
            .then((response) => {
              const parser = new DOMParser();
              const doc = parser.parseFromString(response.body, 'text/html');
              const table = doc.getElementById('dis-calc-table').children[0];
              this.data = Array.from(table.children).filter(row => row.className === 'dis-calc-row')
                .map(row => ({
                  mats: row.attributes['data-dis-mats'].value,
                  price: row.attributes['data-dis-price'].value,
                  junk: row.attributes['data-dis-junk'].value,
                  raw: row.attributes['data-dis-raw'].value,
                  name: row.children[0].attributes['data-sort-value'].value,
                  limit: row.children[4].attributes['data-sort-value'].value,
                }));
            }, (response) => {
              console.log(response.statusText);
            });
        },
        immediate: true,
      },
    },
    methods: {
      sortBy(key) {
        this.sortOrder = this.sortKey !== key ? 1 : this.sortOrder * -1;
        this.sortKey = key;
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
    content: ",";
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

  table {
    width: 1026px;
    margin: auto;
  }

  table.table > thead > tr > th, table.table > tbody > tr > td {
    white-space: normal;
  }

  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }

  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #000;
  }

  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #000;
  }
</style>
