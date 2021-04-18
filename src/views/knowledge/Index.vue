<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <img :src="coverImg" alt="topbanner" style="width: 100%">
      </b-col>
      <a-menu v-model="current" mode="horizontal" class="menu-list" v-on:click="handleClick">
        <a-menu-item v-for="t in tabs" :key="t.key">
          <a-icon type="mail"/>
          {{t.text}}
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
      current: [this.$route.name],
      tabs: [
        {
          key: 'Herb',
          text: '中药材知识库',
          icon: 'mail'
        },
        {
          key: 'Prescription',
          text: '药方知识库',
          icon: 'mail'
        },
        {
          key: 'Symptom',
          text: '疾病诊疗知识库',
          icon: 'mail'
        },
      ],
      coverImg: require("../../assets/topbanner-herb.png")
    }
  },
  methods: {
    handleClick({key}) {
      if (this.$route.name !== key) {
        this.$router.push(key)
      }
    }
  },
  watch: {
    $route(newValue) {
      const imgArray = {
        Herb: require("../../assets/topbanner-herb.png"),
        Prescription: require("../../assets/topbanner-prescription.jpg"),
        Symptom: require("../../assets/topbanner-symptom.png"),
      };
      this.coverImg = imgArray[newValue.name]
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