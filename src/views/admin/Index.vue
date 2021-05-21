<template>
  <div>
    欢迎来到管理中心
  </div>
</template>

<script>
export default {
  name: "Index",
  beforeCreate() {
    console.log("xx")
    if (this.$store.state.user.isAdmin !== true) {
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>

</style>