<template>
  <a-list item-layout="vertical" size="large" :data-source="threadData" :loading="loading">
    <a-list-item slot="renderItem" key="item.thread.title" slot-scope="item">
      <div slot="actions">
        <a-tooltip class="ml-3" title="收藏">
          <a-icon :theme="item.haveFav?'twoTone':'outlined'" type="star" @click="doAction(item, 'fav', item.haveFav)"/>
          {{ item.fav }}
        </a-tooltip>
        <a-tooltip class="ml-3" title="点赞">
          <a-icon :theme="item.haveLike?'twoTone':'outlined'" type="like" @click="doAction(item, 'like', item.haveLike)"/>
          {{ item.like }}
        </a-tooltip>
      </div>
      <a-list-item-meta :description="item.thread.content.substring(0,60)+(item.thread.content.length<60?'':'...')">
        <router-link slot="title" :to="'/forum/thread/' + item.thread.id">{{ item.thread.title }}</router-link>
        <a-avatar slot="avatar"
                  src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1589620053,2046679525&fm=26&gp=0.jpg"/>
      </a-list-item-meta>
      <!--      {{ item.content }}-->
    </a-list-item>
  </a-list>
</template>

<script>
import {actionThread} from "@/api/forum";

export default {
  name: "ThreadList",
  data() {
    return {}
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
    doAction(item, key, checked) {
      if (checked) key = 'dis' + key;
      actionThread(item.thread.id, key).then(res => {
        this.$message.info(res.message);
        if (res.status === 200)
          key === 'fav' ? item["haveFav"] = !item["haveFav"] : item["haveLike"] = !item["haveLike"]
      })
    }
  },
}
</script>

<style scoped>

</style>