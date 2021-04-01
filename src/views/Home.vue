<template>
  <div class="home">
    <div class="home-banner">
      <div class="home-search">
        <input type="text" autocomplete="off" id="search" placeholder="请输入您要查询的疾病、症状、医院、医生、药品" class="search"/>
        <button class="search-button" style="color: rgb(90, 158, 254);">
          <img src="@/assets/search-button.png" alt="search-button" style="height: 32px; width: 32px;">
        </button>
      </div>
    </div>

    <b-container>
      <b-row style="text-align: center; margin-top: 2rem">
        <div class="col-lg-4">
          <img src="../assets/index_tcm.png" height="86" width="86"/>
          <router-link to="/HerbGuide">
            <h3>{{$t("中医文化")}}</h3>
          </router-link>
          <p>{{$t("index.herb")}}</p>
        </div>
        <div class="col-lg-4">
          <img src="../assets/index_tcm.png" height="86" width="86"/>
          <router-link to="/knowledge">
            <h3>{{$t("知识百科")}}</h3>
          </router-link>
          <p>{{$t("index.herb")}}</p>
        </div>
        <div class="col-lg-4">
          <img src="../assets/index_tcm.png" height="86" width="86"/>
          <router-link to="/forum/category">
            <h3>{{$t("交流问答")}}</h3>
          </router-link>
          <p>{{$t("index.herb")}}</p>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>

<style scoped>
.home-banner {
  width: 100%;
  height: 410px;
  background: url(../assets/banner-zh.png) no-repeat 50%;
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
