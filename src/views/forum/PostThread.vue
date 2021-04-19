<template>
  <div>
    <h3>发布新帖</h3>
    <a-row :gutter="6">
      <a-col :lg="18" :sm="24">
        <a-input placeholder="请填写标题" v-model="threadTitle"></a-input>
      </a-col>
      <a-col :lg="6" :sm="24">
        <a-select placeholder="请选择板块标题" v-model="categoryId" style="width: 100%">
          <a-select-option v-for="c in categories" :key="c.id" :value="c.id"> {{c.title}} </a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <CKEditor class="my-3" v-model="threadContent"></CKEditor>
    <div class="text-center mb-5">
      <a-button type="primary" style="min-width: 6rem" @click="publishThread">发布</a-button>
    </div>
  </div>
</template>

<script>
import {getAllCategories,postThread} from "@/api/forum";
import CKEditor from "@/components/CKEditor";

export default {
  name: "PostThreadView",
  components: {CKEditor},
  data() {
    return {
      categories: [],
      categoryId: "",
      threadTitle: "",
      threadContent: "",
      relatedKnowledge: []
    }
  },
  methods: {
    publishThread() {
      postThread({
        categoryId: this.categoryId,
        title: this.threadTitle,
        content: this.threadContent,
        relatedKnowledge: this.relatedKnowledge
      }).then(res => {
        this.$notification.open({message: res.message});
        if (res.status === 200)
          this.$router.push("/forum/thread/" + res.data)
      })
    }
  },
  mounted() {
    getAllCategories().then(res => {
      this.categories = res.data;
    })
  }
}
</script>

<style scoped>

</style>