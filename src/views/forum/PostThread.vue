<template>
  <div>
    <a-row :gutter="6">
      <a-col :lg="18" :sm="24">
        <a-input :placeholder="$t('views.post.title')" v-model="threadTitle"></a-input>
      </a-col>
      <a-col :lg="6" :sm="24">
        <a-select :placeholder="$t('views.post.category')" v-model="categoryId" style="width: 100%">
          <a-select-option v-for="c in categories" :key="c.id" :value="c.id"> {{ c.title }}</a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <a-mentions :placeholder="$t('views.post.topic')" class="my-2" :loading="loading" @search="onSearch"
                    :prefix="['#']" v-model="mentioned">
          <a-mentions-option v-for="({id, name, pic}) in miniResult" :key="id+name" :value="name">
            <img :src="pic" :alt="pic" style="width: 20px; margin-right: 8px;">
            <span v-html="name"></span>
          </a-mentions-option>
        </a-mentions>
      </a-col>
    </a-row>
    <CKEditor class="my-3" v-model="threadContent"></CKEditor>
    <div class="text-center mb-5">
      <kaptcha @valid="(e) => this.kaptcah = e"></kaptcha>
      <a-button type="primary" style="min-width: 6rem" @click="publishThread">
        {{ $t('views.post.publish') }}
      </a-button>
    </div>
  </div>
</template>

<script>
import {getAllCategories, postThread} from "@/api/forum";
import CKEditor from "@/components/CKEditor";
import debounce from 'lodash/debounce';
import {miniSearchName} from "@/api/search";
import {searchResultConvert} from "@/utils/convert";
import Kaptcha from "@/components/Kaptcha";

export default {

  name: "PostThreadView",
  components: {CKEditor, Kaptcha},
  data() {
    return {
      categories: [],
      categoryId: "",
      threadTitle: "",
      threadContent: "",
      relatedKnowledge: [], // TODO 删除relatedKnowledge
      loading: false,
      miniResult: [],
      mentioned: "",
      kaptcah: false
    }
  },
  methods: {
    onSearch(search) {
      this.search = search;
      this.loading = !!search;
      this.miniResult = [];
      this.loadGithubUsers(search);
    },
    loadGithubUsers(key) {
      if (!key) {
        this.miniResult = []
        return;
      }
      let x = []
      miniSearchName(["herbs_info_v2", "disease", "prescriptions"], key, 10).then(res => {
        if (res.status === 200)
          for (let i = 0; i < res.data.result.length; i++)
            x.push(searchResultConvert(res.data.result[i]))
        this.miniResult = x;
        this.loading = false;
      })
    },
    publishThread() {
      if (this.kaptcah !== true) {
        this.$message.error("验证码输入不正确")
        return;
      }
      if (this.categoryId === "") {
        this.$message.error("请选择帖子板块")
        return;
      }
      if (this.threadTitle === "") {
        this.$message.error("请输入帖子标题")
        return;
      }
      postThread({
        categoryId: this.categoryId,
        title: this.threadTitle,
        content: this.threadContent,
        relatedKnowledge: this.relatedKnowledge,
        topic: this.mentioned
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
    this.loadGithubUsers = debounce(this.loadGithubUsers, 800);
  }
}
</script>

<style scoped>

</style>