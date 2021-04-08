<template>
  <div>
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
import HeaderBar from "@/components/HeaderBar";
export default {
  name: "BasicLayout",
  components: {
    HeaderBar
  }
}
</script>

<style scoped>
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