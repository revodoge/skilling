<template>
  <div class="row">
    <div class="col-xs-0 col-md-1"></div>
    <div class="col-xs-12 col-md-10">
      Welcome to the <a href="http://services.runescape.com/m=forum/forums.ws?92,93,752,65939571" target="_blank">Soccermoms clan</a>
      skilling webpage, use the navbar at the top to switch between the different pages. The pages here are aimed to help guide you to
      the most efficient skilling methods for your means.
      <br>
      <br>
      Methods listed are aimed at maxed players going for 120 or 200m and may not necessarily apply to players going for max.
      XP rates and EHP are based on high intensity training (e.g. not losing ticks between sets of arrows, banking on tick)
      so your actual rates may be lower if you have higher ping or are off with your timing.
      <br>
      <br>
      Items that aren't strictly needed for some methods are listed as requirements when they are easy to obtain and offer significant improvements
      (e.g. urns, portables, skill outfits, dungeoneering scrolls) to reduce the clutter on the skilling boost toggles.
      Modified skilling outfits are also listed as requirements when they make a notable difference in the cost of some methods (e.g. herblore, leather crafting)
      even though they aren't as accessible as the other requirements. It is highly recommended that you buy skill outfit add-ons from Vic if you don't have them yet.
      <br>
      <br>
      Credit for video footage and guides referenced on the page goes to their original authors.
      <br>
      Special thanks to Barge, Inter, and Marina for their help in verifying some of the methods listed here.
      <br>
      Join the <a href="https://discord.gg/CbdCqc8" target="_blank">Discord</a>
      or PM JusticeDeeps in game if you have questions or feedback, or want to help with the website.
      <br>
      <br>
      Recent webpage updates:
      <br>
      <ul>
        <li v-for="commit in commits">
          <a v-bind:href="commit.url" target="_blank">{{commit.message}}</a>
        </li>
      </ul>
    </div>
    <div class="col-xs-0 col-md-1"></div>
  </div>
</template>

<script>
  export default {
    name: 'about',
    data() {
      return {
        commits: [],
      };
    },
    mounted() {
      this.fetchCommits();
    },
    methods: {
      fetchCommits() {
        const commitHistoryUrl = 'https://api.github.com/repos/revodoge/skilling/commits';
        this.$http.get(commitHistoryUrl).then((response) => {
          this.commits = response.body.slice(0, 15).map(commit => ({
            message: commit.commit.message,
            url: commit.html_url,
          }));
        });
      },
    },
  };
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  div {
    text-align: left;
  }
</style>
