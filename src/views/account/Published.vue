<template>
<div>
  {{ $t('views.published.my-pub')}}

  <a-list>
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
import {getOldPosts} from "@/api/account";

export default {
  name: "Published",
  data() {
    return {
      posts: []
    }
  },
  mounted() {
    getOldPosts().then(res => {
      this.posts = res.data
    })
  }
}
</script>

<style scoped>

</style>