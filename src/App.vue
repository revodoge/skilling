<template>
  <div id="app">
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand">
            ⚽
          </a>
        </div>
        <ul class="nav navbar-nav">
          <li><router-link to="/methods">Efficient Skilling Methods</router-link></li>
          <li><router-link to="/ehp">EHP</router-link></li>
          <li><router-link to="/all">All Skilling Methods</router-link></li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
    <footer class="footer">
      <div class="container">
        Join the <a href="https://discord.gg/QRqRFH8">Discord</a> if you want to help or provide feedback.
        Thanks to Marina and Barge for helping test methods
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'app',
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
