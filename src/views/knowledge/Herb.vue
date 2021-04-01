<template>
  <b-row>
    <b-col cols="3">
      <a-card title="中药材分类" class="my-1">
        <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onChange"/>
        <a-tree :tree-data="gData" @expand="onExpand">
          <template slot="title" slot-scope="{ title }">
        <span v-if="title.indexOf(searchValue) > -1">
          {{ title.substr(0, title.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
        </span>
            <span v-else>{{ title }}</span>
          </template>
        </a-tree>
      </a-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "Herb",
  data() {
    return {
      searchValue: '',
      autoExpandParent: true,
      gData: [
        {
          key: '1',
          title: '1',
          children: [{
            key: '1-1',
            title: '1-1'
          }]
        }
      ],
    };
  },
  methods: {
    onChange() {
      
    }
  },
}
</script>

<style scoped>

</style>