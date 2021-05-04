<template>
  <div>
    <a-row>
      <a-col>
        <a-button @click="() => {this.visible=true; this.mode='add'}">新增</a-button>
      </a-col>
    </a-row>
    <a-list>
      <a-list-item v-for="i in data" :key="i.id">
        <a-list-item-meta :title="i.title + ' ' +i.english" :description="i.intro">

        </a-list-item-meta>
        <a-space>
          <a-button @click="openEdit(i)">编辑</a-button>
          <a-button @click="categoryEnable(i)">{{ i.enabled ? '禁用' : '启用' }}</a-button>
        </a-space>
      </a-list-item>
    </a-list>
    <a-modal title="添加分类" :visible="visible" :confirm-loading="confirmLoading"
             @ok="handleOk" @cancel="handleCancel">
      <p>
        <a-form>
          <a-form-item label="分类名">
            <a-input v-model="title" placeholder="请输入标题"></a-input>
            <a-input v-model="english" placeholder="英文名称"></a-input>
          </a-form-item>
          <a-form-item label="分类介绍">
            <a-textarea
                v-model="intro"
                placeholder="请输入详细信息"
                :auto-size="{ minRows: 3, maxRows: 5 }">

            </a-textarea>
          </a-form-item>
        </a-form>
      </p>
    </a-modal>
  </div>
</template>

<script>
import {getAllCategories, categoryEnable, addCategory, updateCategory} from "@/api/admin";

export default {
  name: "CategoryInfo",
  data() {
    return {
      data: [],
      intro: "",
      title: "",
      english: "",
      visible: false,
      confirmLoading: false,
      current: {},
    }
  },
  methods: {
    openEdit(i) {
      this.intro = i.intro;
      this.current = i;
      this.visible = true;
      this.title = i.title;
      this.english = i.english
      this.mode = 'edit'
    },
    handleCancel() {
      this.intro = "";
      this.title = "";
      this.english = ""
      this.visible = false;
      this.mode = 'add'
    },
    categoryEnable(item) {
      const d = item.enabled === 1 ? 0 : 1;
      categoryEnable(item.id, d).then(res => {
        this.$message.info(res.message)
        if (res.status === 200)
          item.enabled = d
      })
    },
    handleOk() {
      this.confirmLoading = true;
      if (this.mode === 'add') {
        addCategory(this.title, this.english, this.intro).then(res => {
          this.$message.info(res.message)
        }).finally(() => {
          this.confirmLoading = false
          this.visible = false;
        })
      } else if (this.mode === 'edit') {
        updateCategory(this.current.id, this.title, this.english, this.intro).then(res => {
          this.$message.info(res.message)
          if (res.status === 200) {
            this.current.title = this.title;
            this.current.english = this.english
            this.current.intro = this.intro;
          }
        }).finally(() => {
          this.confirmLoading = false
          this.visible = false;
        })
      }
    },
    loadCategory() {
      getAllCategories().then(res => {
        this.data = res.data
      })
    }
  },
  mounted() {
    this.loadCategory();
  }
}
</script>

<style scoped>

</style>