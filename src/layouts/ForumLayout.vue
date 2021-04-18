<template>
  <div>
    <HeaderBar></HeaderBar>
    <b-container>
      <a-row :gutter="24">
        <a-col :lg="18">
          <router-view></router-view>
        </a-col>
        <a-col :lg="6">
          <router-view name="side"></router-view>
          <div class="small text-muted text-center my-3">
          中医药科普平台 ©2021
          </div>
        </a-col>
      </a-row>
    </b-container>
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