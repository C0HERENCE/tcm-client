<template>
  <div class="home">
    <div class="home-banner"
         :class="{'cn-bg': (this.$store.state.app.lang === 'zh-CN'),'en-bg': !(this.$store.state.app.lang === 'zh-CN')}">
      <div class="home-search">
        <input type="text" v-model="keyword" autocomplete="off" id="search" :placeholder="$t('views.home.search-tip')"
               class="search" @keyup.enter="searchGlobal"/>
        <button class="search-button" style="color: rgb(90, 158, 254);" @click="searchGlobal">
          <img src="@/assets/search-button.png" alt="search-button" style="height: 32px; width: 32px;">
        </button>
      </div>
    </div>

    <b-container>
      <b-row style="text-align: center; margin-top: 2rem">
        <div class="col-lg-4">
          <router-link to="/search/result">
            <img src="../assets/index_tcm.png" height="86" width="86"/>
            <h3>{{ $t("views.home.bks") }}</h3>
          </router-link>
        </div>
        <div class="col-lg-4">
          <router-link to="/knowledge">
            <img src="../assets/index_health.png" height="86" width="86"/>
            <h3 v-text="$t('views.home.bkb')"></h3>
          </router-link>
        </div>
        <div class="col-lg-4">
          <router-link to="/forum/category">
            <img src="../assets/index_symptom.png" height="86" width="86"/>
            <h3>{{ $t('views.home.bkw') }}</h3>
          </router-link>
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
      isEn: this.$store.state.app.lang === 'en-US',
      keyword: ''
    }
  },
  methods: {
    searchGlobal() {
      this.$router.push({name: 'SearchResult', params: {keyword: this.keyword}})
    }
  },
  watch: {
    $store(newValue) {
      this.isEn = newValue.state.app.lang === 'en-US'
    }
  },
  mounted() {
    console.log(this.$store.state.app.lang)
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

#search {
  width: 560px;
}
</style>
