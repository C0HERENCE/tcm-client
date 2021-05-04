<template>
  <div id="basic">
    <div id="content">
      <HeaderBar></HeaderBar>
      <div>
        <router-view/>
      </div>
    </div>
    <footer id="footer" class="small">
      {{$t('layouts.basicLayout.footer')}}
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
#basic {
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