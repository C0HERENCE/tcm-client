<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <img src="@/assets/topbanner-herb.png" alt="topbanner" style="width: 100%">
      </b-col>
      <a-menu v-model="current" mode="horizontal" class="menu-list">
        <a-menu-item key="herb" v-on:click="$router.push('/knowledge/herb')">
          <a-icon type="mail"/>
          中药材知识库
        </a-menu-item>
        <a-menu-item key="prescription" v-on:click="$router.push('/knowledge/prescription')">
          <a-icon type="mail"/>
          药方知识库
        </a-menu-item>
        <a-menu-item key="symptom" v-on:click="$router.push('/knowledge/symptom')">
          <a-icon type="mail"/>
          疾病诊疗知识库
        </a-menu-item>
      </a-menu>
    </b-row>
    <router-view></router-view>
  </b-container>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      current: ['mail'],
    }
  },
}
</script>

<style scoped>
.menu-list {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>