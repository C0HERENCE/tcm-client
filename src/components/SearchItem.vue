<template>
  <div class="search-main">
    <div class="text_name">
      <a href="#" class="name" style="color: rgb(45, 45, 45);">

        <a :href="searchedItem.url" target="_blank">
          <span style="color: rgb(3, 102, 242);text-decoration:underline" v-html="searchedItem.name">
          </span>
        </a>
      </a>
    </div>
    <div class="content">
      <div class="content_img">
        <img :src="searchedItem.pic" alt=""></div>
      <div class="content_text">
        <div class="text" v-html="searchedItem.intro">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchItem",
  props: {
    searchedItem: {
      id: 0,
      chineseName: '',
      intro: '',
      thumbnail: '',
    },
  },
}
</script>

<style scoped>
.search-main {
  font-family: microsoft yahei;
  font-size: 18px;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
  word-break: break-all;
  width: 730px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #efefef;
}

.content_img {
  font-family: microsoft yahei;
  font-size: 18px;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
  word-break: break-all;
  min-width: 136px;
  height: 102px;
  margin-right: 20px;
}


.content_text {
  font-family: microsoft yahei;
  font-size: 18px;
  -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
  word-break: break-all;
  padding: 0;
  display: block;
  -webkit-box-flex: 1;
  flex: 1;
  overflow: auto;
  box-sizing: border-box;
  position: relative;
  text-align: justify;
}

.content{
  font-family: microsoft yahei;
  font-size: 18px;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(255,0,0,0);
  word-break: break-all;
  display: flex;
}

.text{
  font-family: microsoft yahei;
  text-align: justify;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(255,0,0,0);
  word-break: break-all;
  font-size: 14px;
  line-height: 27px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
img{
  font-family: microsoft yahei;
  font-size: 18px;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(255,0,0,0);
  word-break: break-all;
  width: 136px;
  height: 100%;
}
</style>