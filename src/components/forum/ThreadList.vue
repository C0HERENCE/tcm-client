<template>
  <a-list v-if="threadData!=null" item-layout="vertical" size="large" :data-source="threadData" :loading="loading">
    <a-list-item slot="renderItem" key="item.thread.title" slot-scope="item">
      <div slot="actions">
        <a-tooltip class="ml-3" :title="$t('views.forum.fav')">
          <a-icon :theme="item.haveFav?'twoTone':'outlined'" type="star" @click="fav(item)"/>
          {{ item.fav }}
        </a-tooltip>
        <a-tooltip class="ml-3" :title="$t('views.forum.like')">
          <a-icon :theme="item.haveLike?'twoTone':'outlined'" type="like" @click="like(item)"/>
          {{ item.like }}
        </a-tooltip>

        {{ item.topic }}
      </div>
      <a-list-item-meta :description="item.thread.content.replace(/(<([^>]+)>)/ig, '').substring(0,60)+'...'">
        <router-link slot="title" :to="'/forum/thread/' + item.thread.id">{{ item.thread.title }}</router-link>
        <a-avatar slot="avatar"
                  :src="item.thread.avatar"/>
      </a-list-item-meta>
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
        if (res.status === 200) {
          console.log(key)
          if (key === 'fav') {
            item["haveFav"] = !item["haveFav"];
            if (checked) item["fav"]++; else item["fav"]--;
          } else {
            item["haveLike"] = !item["haveLike"]
            if (checked) item["like"]++; else item["like"]--;
          }
        }
      })
    },
    like(item) {
      let key = "like"
      if (item.haveLike) key = "dislike"
      actionThread(item.thread.id, key).then(res => {
        if (res.status === 200) {
          item.haveLike = !item.haveLike
          if (item.haveLike) item.like++; else item.like--;
        }
      })
    },
    fav(item) {
      let key = "fav"
      if (item.haveFav) key = "disfav"
      actionThread(item.thread.id, key).then(res => {
        if (res.status === 200) {
          item.haveFav = !item.haveFav
          if (item.haveFav) item.fav++; else item.fav--;
        }
      })
    }
  },
}
</script>

<style scoped>

</style>