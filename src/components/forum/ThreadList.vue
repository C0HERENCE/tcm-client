<template>
  <a-list item-layout="vertical" size="large" :data-source="threadData" :loading="loading">
    <a-list-item slot="renderItem" key="item.thread.title" slot-scope="item" >
      <template v-for="{ type, keyField } in actions" slot="actions">
              <span :key="type">
                <a-icon :type="type" style="margin-right: 8px" @click="handleClickAction(item, keyField)"/>
                {{ item[keyField] }}
              </span>
      </template>
      <a-list-item-meta :description="item.thread.content">
        <a slot="title" :href="item.href">{{ item.thread.title }}</a>
        <a-avatar slot="avatar" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1589620053,2046679525&fm=26&gp=0.jpg"/>
      </a-list-item-meta>
      {{ item.content }}
    </a-list-item>
  </a-list>
</template>

<script>
import {actionThread} from "@/api/forum";

export default {
  name: "ThreadList",
  data() {
    return {
      actions: [
        {type: 'star-o', keyField: 'fav'},
        {type: 'like-o', keyField: 'liked'},
        {type: 'message', keyField: 'views'},
      ],
    }
  },
  props: {
    threadData: {
      default: []
    },
    loading: {
      default: true
    }
  },
  methods: {
    handleClickAction(item, type) {
      console.log(type)
      let key = 'fav';
      if (type === 'fav' && true) key = 'fav'
      // if (type === 'fav' && false) key = 'disfav'
      if (type === 'liked' && true) key = 'like'
      // if (type === 'liked' && false) key = 'dislike'
      actionThread(item.thread.id, key).then(res=>{
        this.$message.info(res.message);
      })
    }
  },
}
</script>

<style scoped>

</style>