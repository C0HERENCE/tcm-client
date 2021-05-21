<template>
  <div>
    <a-form layout="inline">
      <a-form-item label="关键词">
        <a-input placeholder="请输入名称" v-model="searchText"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button @click="handleSearch"> <a-icon type="search"></a-icon>筛查</a-button>
      </a-form-item>
      <a-form-item>
        <a-upload name="file" :multiple="false" action="/api/admin/knowledge2?esindex=herbs_info_v2"
                  :show-upload-list="false" @change="batchAdd">
          <div class="ant-upload-preview">
            <a-icon type="cloud-upload-o" class="upload-icon"/>
            添加新内容
          </div>
        </a-upload>
      </a-form-item>
    </a-form>
    <a-table :loading="loading" @change="handleTableChange" :columns="columns" :data-source="data"
             :pagination="pagination" rowKey="id">
      <template slot="linkTo" scope="v, record">
        <a :href="'/knowledge/herb/' + v" target="_blank">{{record.chinesename}}</a>
      </template>
      <template slot="Edit" scope="v,record">
        <a-button @click="edit(record)">编辑详情</a-button>
      </template>
      <template slot="Delete" scope="v,record">
        <a-popconfirm title="确定要删除这个科普内容吗？（该操作不可逆）" @confirm="() => deleteEs(record)">
          <a-button>删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <a-drawer height="100%" placement="bottom" :closable="true" :visible="drawer" @close="drawer=false">
      <span class="text-muted">当前正在编辑:
        <span style="font-weight: bolder">中药材知识库</span>
        /
        <span style="font-weight: bolder"> {{ currentRecord.chinesename }} </span>
        /
        <a-select placeholder="请选择字段编辑" @change="(e) => this.editText = this.currentRecord[e]" style="min-width: 7rem" v-model="selectedField">
          <a-select-option v-for="(v,k) in diseaseData" :key="k">{{ v }}</a-select-option>
        </a-select>
      </span>
      <CKEditor v-model="editText"></CKEditor>
      <div class="text-center">
        <a-button class="m-3" type="primary"  @click="saveChange">保存</a-button>
        <a-button class="m-3">重置</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
const diseaseData = {
  chinesename: "中文名称", // 中文名
  chinesepinyin: "拼音", // 拼音
  latinname: "英文",
  intro: "介绍",
  // thumbnail: "thumbnail",
  // picturepath: "picturepath",
  aliasname: "别名",
  cmedicaltype: "cmedicaltype",
  origin: "来源",
  phylum: "phylum",
  classify: "classify",
  catalogue: "catalogue",
  family: "family",
  genus: "genus",
  species: 'species',
  remark: '性味归经',
  toxicity: 'toxicity',
  msgtypecontent: '种类',
  herbalpiecesname: 'herbalpiecesname',
  healthtype: '医保信息',
  statement: '相关论述',
  function: '功效作用',
  func: '功能',
  mainattend: '主治',
  dosage: '用法用量',
  adversereactions: '不良反应',
  taboo: '禁忌',
  notice: '注意事项',
  chemicalcomposition: '化学成分',
  pharmacology: '药理作用',
  toxicologicaleffects: '毒理作用',
  relateddiscussion: '相关论述',
  notes: '附注',
  clinicalapplication: '临床应用',
  configuration: '相关配伍',
  identifymedication: '鉴别用药',
  relateddrug: '相关药品',
  relatedprescription: '相关方剂',
  dietguidelines: '药膳食疗',
  process: '加工炮制',
  harvestprocess: '采收加工',
  processing: '炮制方法',
  storagemethod: '保存方法',
  medicineidentify: '药材鉴别',
  identify: '鉴别',
  medicinalproperty: '药材性状',
  decoctionpiecescharacter: '饮片性状',
  comcounterfeit: '常见伪品',
  plant: '植物学信息',
  plantgenus: '植物种属',
  plantfrature: '形态特征',
  plantcroparea: '分布区域',
  plantrealestate: '道地产区',
  plantgrowthenvironment: '生长环境',
  plantgrowthhabits: '生长见习',
  plantsiremethods: '繁殖方式',
  planttraintechniques: '栽培技术',
  plantpestcontrol: '病虫防治',
  plantmajorvariant: '主要变种',
}
import {getAllKnowledge, advancedSearch, updateEs, deleteEs} from "@/api/admin";
import CKEditor from "@/components/CKEditor";

export default {
  name: "HerbsInfo",
  components: {CKEditor},
  methods: {
    batchAdd(info) {
      if (info.file.status === 'done') {
        if (info.file.response.status === 200)
          this.$message.success(info.file.response.message);
      }
    },
    saveChange() {
      console.log(this.currentRecord.id, this.selectedField, this.editText);
      updateEs("herbs_info_v2", this.currentRecord.id, this.selectedField, this.editText).then(res => {
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
    deleteEs(record) {
      deleteEs("prescriptions", record.id).then(res => {
        this.$message.info(res.message);
        if (res.status===200) {
          this.handleSearch();
        }
      })
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
        getAllKnowledge("herbs_info_v2", page, size).then(res => {
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
        kef["treeValue"] = ["chinesename"];
        kef["enabled"] = 1;
        advancedSearch([kef], page-1, size, ["herbs_info_v2"]).then(res=>{
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
        {dataIndex: "dosage", title: "用法用量",},
        {dataIndex: "func", title: "功效",},
        {dataIndex: "mainattend", title: "功能主治",},
        {key:"编辑", dataIndex:'id', scopedSlots:{customRender:'Edit'}},
        {key:"删除", dataIndex:'id', scopedSlots:{customRender:'Delete'}}
      ],
      loading: false,
      drawer: false,
      currentRecord: {},
      pagination: {},
      searchText: "",
      diseaseData,
      editText: "",
      changed: false,
      modified: false,
      selectedField: 'intro',
    };
  },
  mounted() {
    this.getKnowledge(1, 10);
  }
}
</script>

<style scoped>

</style>