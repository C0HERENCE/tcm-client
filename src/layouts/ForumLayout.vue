<template>
  <div>
    <HeaderBar></HeaderBar>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
export default {
  name: "ForumLayout",
  components: {
    HeaderBar
  }
}
</script>

<style scoped>

</style>