<template>
  <div id="app">
    <div id="content">
      <HeaderBar></HeaderBar>
      <router-view/>
    </div>
    <footer id="footer">
      AbcdefggfedcbA ©2021
    </footer>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue';
  export default {
    name: 'App',
    components: {
      HeaderBar
    }
  }
</script>

<style scoped>
#app {
  min-height: 100vh;
  position: relative;
}
#content {
  padding-bottom: 2.5rem;
}
#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem;
  text-align: center;
}
</style>
