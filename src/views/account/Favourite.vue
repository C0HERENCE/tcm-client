<template>
<div>
  {{ $t('views.account.myfav') }}
  <a-list :data-source="posts">
    <a-list-item v-for="post in posts" :key="post.id">
      <a-list-item-meta :description="post.createTime">
        <router-link slot="title" :to="'/forum/thread/' + post.id">
          {{post.title}}
        </router-link>
      </a-list-item-meta>
    </a-list-item>
  </a-list>


</div>
</template>

<script>
import {getFavourite} from "@/api/account";

export default {
  name: "Favourite",
  data() {
    return {
      posts: []
    }
  },
  mounted() {
    getFavourite().then(res => {
      this.posts = res.data;
    })
  }
}
</script>

<style scoped>

</style>