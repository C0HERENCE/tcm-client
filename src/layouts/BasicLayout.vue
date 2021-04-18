<template>
  <div id="app">
    <div id="content">
      <HeaderBar></HeaderBar>
      <router-view/>
    </div>
    <footer id="footer" class="small">
      中医药知识科普平台 ©2021
    </footer>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar";
export default {
  name: "BasicLayout",
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