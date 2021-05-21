<template>
  <a-row class="my-1" :gutter="8">
    <a-col :lg="5" :md="8" :sm="24">
      <a-card title="疾病诊疗/Disease">
        <a-tree :tree-data="gData" @select="onSelect">
        </a-tree>
      </a-card>
    </a-col>
    <a-col :lg="19" :md="16" :sm="24">
      <a-card>
        <a-radio-group v-model="selectedInitial" @change="onInitialChange">
          <a-radio value="All">
            {{$t('views.forum.all')}}
          </a-radio>
          <a-radio v-for="i in Object.keys(selectedCategory.mapped)" :key="i" :value="i">{{i}}</a-radio>
        </a-radio-group>
      </a-card>
      <a-card>
        <a-list>
          <a-list-item v-for="i in Object.keys(selectedCategory.display)" :key="i">
            <a-list-item-meta>
              <div slot="title">{{i}}</div>
              <div slot="description">
                <a-popover trigger="click" v-for="j in selectedCategory.display[i]" :key="j.id">
                  <span slot="title">
                    <a-button type="link"
                              @click="$router.push({name: 'SearchResult', params: {keyword: $store.state.app.lang === 'zh-CN'? j.chinesename : j.latinname}})">
                      查看更多
                    </a-button>
                  </span>
                  <a-list slot="content" :loading="loading">
                    <a-list-item v-for="mini in miniResult" :key="mini.id">
                      <a-list-item-meta :description="mini.intro.substr(0,20)+'...'">
                        <router-link slot="title" :to="mini.url"><span v-html="mini.name"></span></router-link>
                        <a-avatar slot="avatar" :src="mini.pic"/>
                      </a-list-item-meta>
                    </a-list-item>
                  </a-list>
                  <a-button type="link" @click="miniSearch(j)">
                    {{ $store.state.app.lang === 'zh-CN' ? j.chinesename : j.latinname }}
                  </a-button>
                </a-popover>
              </div>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import {getCategoryByTypeId, getKnowledgeByCategoryId} from "@/api/knowledge";
import {miniSearchName} from "@/api/search";
import {searchResultConvert} from "@/utils/convert";
export default {
  name: "Symptom",
  data() {
    return {
      gData: [],
      selectedInitial: 'All',
      selectedCategory: {
        id: 0,
        mapped: {},
        display: {}
      },
      miniResult: [],
      loading: false
    };
  },
  methods: {
    onInitialChange(e) {
      if (e.target.value === 'All')
        this.selectedCategory.display = this.selectedCategory.mapped;
      else {
        this.selectedCategory.display = { }
        this.selectedCategory.display[e.target.value] = this.selectedCategory.mapped[e.target.value]
      }
    },
    onSelect(selected) {
      if (selected[0] < 1000 && this.selectedCategory.key !== selected[0]) {
        this.selectedCategory.key = selected[0]
        getKnowledgeByCategoryId(selected[0]).then(res => {
          this.selectedCategory.mapped = res.data.map
          this.selectedCategory.display = res.data.map
          this.selectedInitial = "All"
        })
      }
    },
    miniSearch(disease) {
      this.loading = true;
      this.miniResult = []
      miniSearchName(["disease"], disease.chinesename, 3).then(res => {
        if (res.status === 200)
          for (let i = 0; i< res.data.result.length;i++)
            this.miniResult.push(searchResultConvert(res.data.result[i]))
      }).finally(() => this.loading=false)
    }
  },
  mounted() {
    getCategoryByTypeId(2).then(res => {
      this.gData = res.data;
    })
  }
}
</script>