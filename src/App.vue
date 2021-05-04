<template>
  <a-config-provider>
    <div id="app">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<script>
  export default {
    name: 'App',

  }
</script>

<style>
.anticon {
  vertical-align: 0 !important;
}
</style>
