<template>
  <div id="app">
    <nav class="navbar navbar-default navbar-static-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <span class="navbar-brand">⚽</span>
        </div>
        <ul class="nav navbar-nav">
          <li><a href="#/methods">Efficient Skilling Methods</a></li>
          <li><a href="#/ehp">EHP</a></li>
          <li><a href="#/tvc">Method TVC</a></li>
          <li><a href="#/all">Compare skilling methods</a></li>
          <li><a href="#/about">About</a></li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
    <footer class="navbar navbar-default footer navbar-fixed-bottom">
      <div class="container-fluid">
        <div class="navbar-footer">
          <span class="navbar-brand">Methods are no longer updated and may be out of date. PM doge#2526 on Discord if you are interested in updating</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import './skilling_methods';

  export default {
    name: 'app',
  };
</script>

<style>
  footer.navbar .navbar-brand {
    color: #000;
  }

  footer.navbar {
    background-color: #fb9a9a;
  }

  nav {
    font-family: 'Comic Sans MS', sans-serif;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    overflow: hidden;
    width: 100%;
  }
</style>
