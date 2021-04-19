<template>
  <a-row :gutter="16">
    <a-col :lg="6" :md="12" :sm="24">
      <CategoryList @menuChanged="e=>this.currentCategoryId=e"></CategoryList>
    </a-col>
    <a-col :lg="18" :md="12" :sm="24">
      <a-row>
        <a-col :lg="20" :sm="12">
          <a-input-search placeholder="输入关键词搜索帖子" enter-button="搜索" size="large" @search="onSearch"/>
        </a-col>
        <a-col :lg="4" :sm="12">
          <a-button size="large" class="float-right">
            <router-link :to="{name: 'PostThread'}">发布新帖</router-link>
          </a-button>
        </a-col>
      </a-row>

      <TypeList @typeChanged="e=>this.currentTypeId=e"></TypeList>
      <ThreadList :loading="loading" :thread-data="threadData"></ThreadList>
    </a-col>
    <a-back-top />
  </a-row>
</template>

<script>
import CategoryList from "@/components/forum/CategoryList";
import TypeList from "@/components/forum/TypeList";
import ThreadList from "@/components/forum/ThreadList";
import {getThreadByCategoryId} from "@/api/forum";


export default {
  name: "Category",
  components: {CategoryList, TypeList, ThreadList},
  data() {
    return {
      currentCategoryId: '',
      currentTypeId: '',
      threadData: [],
      loading: false
    };
  },
  methods: {
    onSearch() {

    },
    getThreads(cid, tid) {
      this.loading = true;
      getThreadByCategoryId(cid, tid).then(res => {
        this.threadData = res.data;
        this.loading = false;
      })
    }
  },
  mounted() {
    if (this.$route.params.goto !== "" && this.$route.params.goto !== undefined) {
      this.currentCategoryId = this.$route.params.goto;
    }
  },
  watch: {
    currentCategoryId(newValue, oldValue) {
      if (oldValue !== newValue)
        this.getThreads(newValue, this.currentTypeId)
    },
    currentTypeId(newValue, oldValue) {
      if (oldValue !== newValue)
        this.getThreads(this.currentCategoryId, newValue)
    },
  },
}
</script>

<style scoped>

</style>