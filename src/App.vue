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
          <li><a href="#/all">All Skilling Methods</a></li>
          <li><a href="#/about">About</a></li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import './skilling_methods';

  export default {
    name: 'app',
  };
</script>

<style>
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
