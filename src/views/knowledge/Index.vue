<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <img :src="coverImg" alt="topbanner" style="width: 100%">
      </b-col>
      <a-menu v-model="current" mode="horizontal" class="menu-list" v-on:click="handleClick">
        <a-menu-item v-for="t in tabs" :key="t.key">
          <a-icon type="mail"/>
          {{ t.text }}
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
          text: '中药材 · Herb',
          icon: 'mail'
        },
        {
          key: 'Prescription',
          text: '药方 · Prescription',
          icon: 'mail'
        },
        {
          key: 'Symptom',
          text: '疾病诊疗 · Disease',
          icon: 'mail'
        },
      ],
      coverImg: this.$store.state.app.lang === 'zh-CN' ? require("@/assets/topbanner-herb-zh.png") : require("@/assets/topbanner-herb-en.png")
    }
  },
  methods: {
    handleClick({key}) {
      if (this.$route.name !== key) {
        this.$router.push({name: key})
      }
    }
  },
  watch: {
    $route(newValue) {
      const imgArray = {
        Herb: {
          "zh-CN": require("@/assets/topbanner-herb-zh.png"),
          "en-US": require("@/assets/topbanner-herb-en.png"),
        },
        Prescription: {
          "zh-CN": require("@/assets/topbanner-prescription-zh.jpg"),
          "en-US": require("@/assets/topbanner-prescription-en.png"),
        },
        Symptom: {
          "zh-CN": require("@/assets/topbanner-symptom-zh.png"),
          "en-US": require("@/assets/topbanner-disease-en.png"),
        }
      };
      this.coverImg = imgArray[newValue.meta.cover][this.$store.state.app.lang]
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