<template>
  <a-row :gutter="16">
    <a-col :lg="6" :md="12" :sm="24">
      <CategoryList @menuChanged="e=>this.currentCategoryId=e"></CategoryList>
    </a-col>
    <a-col :lg="18" :md="12" :sm="24">
      <a-row>
        <a-col :lg="24" :sm="12">
          <a-input-search v-model="keyword" :placeholder="$t('views.forum.search-tip')"
                          :enter-button="$t('views.forum.search')" size="large" class="my-2" @search="onSearch"/>
        </a-col>
      </a-row>

      <TypeList @typeChanged="e=>this.currentTypeId=e"></TypeList>
      <ThreadList :loading="loading" :thread-data="threadData"></ThreadList>
    </a-col>
    <a-back-top/>
  </a-row>
</template>

<script>
import CategoryList from "@/components/forum/CategoryList";
import TypeList from "@/components/forum/TypeList";
import ThreadList from "@/components/forum/ThreadList";
import {getThreadByCategoryId, searchByKeyword} from "@/api/forum";


export default {
  name: "Category",
  components: {CategoryList, TypeList, ThreadList},
  data() {
    return {
      currentCategoryId: '',
      currentTypeId: '',
      threadData: [],
      loading: false,
      keyword: '',
    };
  },
  methods: {
    onSearch() {
      this.loading = true;
      searchByKeyword(this.keyword).then(res => {
        this.threadData = res.data;
        this.loading = false;
      })
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
    } else if (this.$route.params.q) {
      this.keyword = this.$route.params.q
      this.onSearch();
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