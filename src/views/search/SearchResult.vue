<template>
  <b-container>
    <a-row>
      <a-col>
        <div class="text-center my-3" v-if="!advanced">
          <a-input-search v-model="keyword" :placeholder="$t('views.search.search-top')" style="width: 500px;text-align: center"
                          size="large" @search="onSearch" @change="onSearch"/>
        </div>
        <div class="y-3" v-if="advanced">
          <AdvancedSearch @onAdvancedSearch="adSearch"></AdvancedSearch>
        </div>
      </a-col>
    </a-row>
    <a-switch :checked-children="$t('views.search.adv')" :un-checked-children="$t('views.search.adv')" v-model="advanced" class="float-right"/>
    <hr>
    <a-row v-if="results.length!==0">
      <a-col id="#searchResult">
        <SearchItem :searched-item="searchResultConvert(item)" v-for="(item,i) in results" :key="i"></SearchItem>
        <a-pagination @change="pageChange" @showSizeChange="pageChange" size="small" :total="total" show-size-changer
                      show-quick-jumper :pageSizeOptions="['5','10', '20', '50']"/>
      </a-col>
    </a-row>
    <a-back-top ref="backTop"/>
  </b-container>
</template>

<script>
import SearchItem from "@/components/SearchItem";
import AdvancedSearch from "@/components/AdvancedSearch";
import {globalSearch, advancedSearch} from "@/api/search";
import {searchResultConvert} from "@/utils/convert";
// import debounce from 'lodash/debounce';

export default {
  name: "SearchResult",
  components: {SearchItem, AdvancedSearch},
  data() {
    return {
      results: [],
      total: 0,
      keyword: '',
      advanced: false,
    }
  },
  methods: {
    searchResultConvert,
    pageChange(page, pageSize) {
      this.Search(page-1, pageSize)
      this.$refs['backTop'].scrollToTop()
    },
    adSearch(checkedDatabase, keywords) {
      this.Search(0, 10, checkedDatabase, keywords)
    },
    onSearch() {
      this.Search()
    },
    Search(page = 0, pageSize = 10, checkedDatabase = [], keywords = []) {
      if (this.advanced) {
        advancedSearch(keywords, page, pageSize, checkedDatabase).then(res => {
          this.results = res.data.result
          this.total = res.data.total.value
        })
      } else {
        if (!this.keyword) return;
        globalSearch(this.keyword, page, pageSize).then(res => {
          console.log(res.data.result)
          this.results = res.data.result
          this.total = res.data.total.value
        })
      }
    }
  },
  mounted() {
    this.keyword = this.$route.params.keyword
    this.Search();
    // this.Search = debounce(this.Search, 500);

  }
}
</script>

<style scoped>

</style>