<template>
  <a-row class="my-1" :gutter="8">
    <a-col :lg="5" :md="8" :sm="24">
      <a-card title="疾病诊疗分类">
        <a-tree :tree-data="gData" @select="onSelect">
        </a-tree>
      </a-card>
    </a-col>
    <a-col :lg="19" :md="16" :sm="24">
      <a-card>
        <a-radio-group v-model="selectedInitial" @change="onInitialChange">
          <a-radio value="All">
            全部
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
                <router-link v-for="j in selectedCategory.display[i]" :key="j.id" to="/">
                  {{j.chinesename}}
                </router-link>
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
    }
  },
  mounted() {
    getCategoryByTypeId(3).then(res => {
      this.gData = res.data;
    })
  }
}
</script>