<template>
  <div>
    <a-form layout="inline">
      <a-form-item label="关键词">
        <a-input placeholder="请输入名称" v-model="searchText"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button @click="handleSearch"> <a-icon type="search"></a-icon>筛查</a-button>
      </a-form-item>
    </a-form>
    <a-table :loading="loading" @change="handleTableChange" :columns="columns" :data-source="data"
             :pagination="pagination" rowKey="id">
      <template slot="linkTo" scope="v, record">
        <a :href="'/knowledge/prescription/' + v" target="_blank">{{record.name}}</a>
      </template>
      <template slot="Edit" scope="v,record">
        <a-button @click="edit(record)">编辑详情</a-button>
      </template>
    </a-table>

    <a-drawer height="100%" placement="bottom" :closable="true" :visible="drawer" @close="drawer=false">
      <span class="text-muted">当前正在编辑:
        <span style="font-weight: bolder">中药方剂知识库</span>
        /
        <span style="font-weight: bolder"> {{ currentRecord.name }} </span>
        /
        <a-select placeholder="请选择字段编辑" @change="(e) => this.editText = this.currentRecord[e]" style="min-width: 7rem" v-model="selectedField">
          <a-select-option v-for="(v,k) in diseaseData" :key="k">{{ v }}</a-select-option>
        </a-select>
      </span>
      <CKEditor v-model="editText"></CKEditor>
      <div class="text-center">
        <a-button class="m-3" type="primary" @click="saveChange">保存</a-button>
        <a-button class="m-3">重置</a-button>
      </div>
    </a-drawer>
  </div>
</template>


<script>
const diseaseData = {
  "name": '名字',
  // "thumb": '插图',
  "intro": '介绍',
  "alias": '别名',
  "provenance": '出处',
  "classification": '分类',
  "jfunction": '功用',
  "jattending": '主治',
  "rhymeFormulas": '歌诀',
  "usage": '用法用量',
  "zcomposition": '组成',
  "jcomposition": '组成',
  "fangyi": '方义',
  "comFeatures": '配伍特点',
  "zfunction": '功用',
  "apply": '运用',
  "zattending": '主治',
  "cut": '加减化裁',
  "useAttention": '使用注意',
  "note": '附注',
  "abstracts": '重要文献',
}
import {getAllKnowledge, advancedSearch, updateEs} from "@/api/admin";
import CKEditor from "@/components/CKEditor";

export default {
  name: "PrescriptionInfo",
  components: {CKEditor},
  methods: {
    saveChange() {
      console.log(this.currentRecord.id, this.selectedField, this.editText);
      updateEs("prescriptions", this.currentRecord.id, this.selectedField, this.editText).then(res => {
        this.$message.info(res.data)
      })
    },
    edit(record) {
      this.drawer = true;
      this.currentRecord = record;
      console.log(record)
      this.selectedField = 'intro'
      this.editText = this.currentRecord[this.selectedField];
    },
    handleTableChange(pagination) {
      this.getKnowledge(pagination.current, pagination.pageSize)
      const pager = {...this.pagination};
      pager.current = pagination.current;
      this.pagination = pager;
    },
    handleSearch() {
      this.getKnowledge(1, 10);
    },
    getKnowledge(page, size) {
      console.log(page, size)
      this.loading = true;
      if (this.searchText === "") {
        getAllKnowledge("prescriptions", page, size).then(res => {
          const pagination = {...this.pagination};
          pagination.total = res.data.total.value;
          this.loading = false;
          this.pagination = pagination;
          this.data = res.data.list
        })
      } else {
        let kef = {}
        kef["id"] = 1
        kef["keyword"] = this.searchText;
        kef["treeValue"] = ["chineseName"];
        kef["enabled"] = 1;
        advancedSearch([kef], page-1, size, ["prescriptions"]).then(res=>{
          const pagination = {...this.pagination};
          pagination.total = res.data.total.value;
          this.loading = false;
          this.pagination = pagination;
          this.data = res.data.result;
        })
      }
    }
  },
  data() {
    return {
      data: [],
      columns: [
        {dataIndex: "id", title: "中文名称", scopedSlots:{customRender:'linkTo'}},
        {dataIndex: "jattending", title: "主治",},
        {dataIndex: "classification", title: "分类",},
        {dataIndex: "jfunction", title: "功效",},
        {key:"编辑", dataIndex:'id', scopedSlots:{customRender:'Edit'}}
      ],
      loading: false,
      drawer: false,
      currentRecord: {},
      pagination: {},
      searchText: "",
      diseaseData,
      editText: "",
      selectedField: 'introduction',
    };
  },
  mounted() {
    this.getKnowledge(1, 10);
  }
}
</script>

<style scoped>

</style>