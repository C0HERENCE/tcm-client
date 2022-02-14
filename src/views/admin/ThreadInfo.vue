<template>
  <div>
    <a-list :data-source="data" :pagination="pagination">
      <a-list-item slot="renderItem" slot-scope="i">
        <a slot="actions" @click="deleteThread(i)">{{ i.enabled === 1 ? '删除' : '恢复' }}</a>
        <a slot="actions">查看评论</a>
        <router-link :to="'/forum/thread/' + i.id" slot="actions">前往查看</router-link>
        <a-list-item-meta>
          <a-avatar slot="avatar" :src="i.avatar"></a-avatar>
          <span slot="title">
            <span>{{ '《' + i.title + '》  发布者： ' + i.nickname }}</span>
            <br>
            <a-tag :color="colors[i.categoryid % colors.length]" class="my-1">
                {{ i.categorytitle }}
            </a-tag>
            <a-tag :color="colors[i.typeid % colors.length]" class="my-1">
                {{ i.typename }}
            </a-tag>
            <span class="mx-2">发布于 {{i.createtime}}</span>
            <span>编辑于 {{i.modifytime}}</span>
          </span>
        </a-list-item-meta>
        {{i.content.substr(0, 40) + '...'}}

      </a-list-item>
    </a-list>
    <!--    {{ data }}-->
  </div>
</template>

<script>
const colors = ["pink", "green", "red", "purple", "blue", "yellow", "grey", "cyan", "black", "orange"]
import {getAllThreads, deleteThread} from "@/api/admin";

export default {
  name: "ThreadInfo",
  data() {
    return {
      data: [],
      colors,
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 5,
      },
    }
  },
  methods: {
    loadAll(keyword, categoryId, typeId, authorId) {
      getAllThreads(keyword, categoryId, typeId, authorId).then(res => {
        this.data = res.data
      })
    },
    deleteThread(i) {
      let d = 1
      if (i.enabled === 1)
        d = 0;
      deleteThread(i.id, d).then(res=>{
        this.$message.info(res.message)
        if (res.status === 200) {
          i.enabled = d;
        }
      })
    }
  },
  mounted() {
    this.loadAll("", 0, 0, 0);
  }
}
</script>

<style scoped>

</style>