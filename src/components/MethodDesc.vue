<template>
  <tr v-if="display">
    <td colspan="6" v-html="desc"></td>
  </tr>
</template>

<script>
  export default {
    name: 'method-desc',
    props: {
      desc: {
        type: String,
        required: true,
      },
      display: {
        type: Boolean,
        required: true,
      },
    },
  };
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  td {
    text-align: left;
  }
</style>
