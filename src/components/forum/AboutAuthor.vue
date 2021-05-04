<template>
  <a-card>
    <a-card-meta v-if="author !== null">
      <p slot="title">{{author.nickname}}</p>
      <a-avatar slot="avatar" :src="author.avatar"/>
      <span slot="description">{{author.intro !== "" ? author.intro : '-'}}</span>
    </a-card-meta>
  </a-card>
</template>

<script>
import {getAuthorByThreadId} from "@/api/forum";

export default {
name: "AboutAuthor",
  data() {
    return {
      author: null
    }
  },
  mounted() {
    getAuthorByThreadId(this.$route.params.id).then(res => {
      if (res.data == null) {
        this.author = res.data;
        return;
      }
      this.author = res.data;
    })
  }
}
</script>

<style scoped>

</style>