<template>
  <div class="home">
    <div class="home-banner" :class="{'cn-bg': (this.$store.state.app.lang === 'zh-CN'),'en-bg': !(this.$store.state.app.lang === 'zh-CN')}">
      <div class="home-search">
        <input type="text" autocomplete="off" id="search" placeholder="请输入您要查询的中药材、疾病症状或药方关键词" class="search"/>
        <button class="search-button" style="color: rgb(90, 158, 254);">
          <img src="@/assets/search-button.png" alt="search-button" style="height: 32px; width: 32px;">
        </button>
        <router-link to="#" class="pt-4 small ml-2">高级检索</router-link>
      </div>
    </div>

    <b-container>
      <b-row style="text-align: center; margin-top: 2rem">
        <div class="col-lg-4">
          <router-link to="/">
            <img src="../assets/index_tcm.png" height="86" width="86"/>
            <h3>{{$t("信息检索")}}</h3>
          </router-link>
<!--          <p>{{$t("index.herb")}}</p>-->
        </div>
        <div class="col-lg-4">
          <router-link to="/knowledge">
            <img src="../assets/index_health.png" height="86" width="86"/>
            <h3>{{$t("知识库")}}</h3>
          </router-link>
<!--          <p>{{$t("index.herb")}}</p>-->
        </div>
        <div class="col-lg-4">
          <router-link to="/forum/category">
            <img src="../assets/index_symptom.png" height="86" width="86"/>
            <h3>{{$t("交流问答")}}</h3>
          </router-link>
<!--          <p>{{$t("index.herb")}}</p>-->
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      isEn: this.$store.state.app.lang === 'en-US'
    }
  },
  watch: {
    $store(newValue) {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
      this.isEn = newValue.state.app.lang === 'en-US'
    }
  },
  mounted() {
    console.log(this.$store.state.app.lang )
  }
}
</script>

<style scoped>
.cn-bg {
  background: url(../assets/banner-zh.png) no-repeat 50%;
}

.en-bg {
  background: url(../assets/banner-en.png) no-repeat 50%;
}
.home-banner {
  width: 100%;
  height: 410px;
  background-size: cover;
  justify-content: center;
  display: flex;
  align-items: center;
}

.home-search {
  -webkit-box-direction: normal;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
  word-break: break-all;
  margin-top: 350px;
  display: flex;
}

.search-button {
  border-radius: 0 4px 4px 0;
  height: 60px;
  width: 84px;
  outline: 0 none !important;
  border: none;
  background: #3e8bf4 no-repeat 50%;
  background-size: 38px 38px;
  cursor: pointer;
}

#search{
  width: 560px;
}
</style>
