<template>
  <div>
    <a-form layout="inline">
      <a-form-item label="关键词">
        <a-input placeholder="请输入名称" v-model="searchText"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button @click="handleSearch">
          <a-icon type="search"></a-icon>
          筛查
        </a-button>
      </a-form-item>
    </a-form>
    <a-table :loading="loading" @change="handleTableChange" :columns="columns" :data-source="data"
             :pagination="pagination" rowKey="id">
      <template slot="linkTo" scope="v, record">
        <a :href="'/knowledge/symptom/' + v" target="_blank">{{ record.chineseName }}</a>
      </template>
      <template slot="Edit" scope="v,record">
        <a-button @click="edit(record)">编辑详情</a-button>
      </template>
    </a-table>

    <a-drawer height="100%" placement="bottom" :closable="true" :visible="drawer" @close="drawer=false">
      <span class="text-muted">当前正在编辑:
        <span style="font-weight: bolder">疾病诊疗知识库</span>
        /
        <span style="font-weight: bolder"> {{ currentRecord.chineseName }} </span>
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
  // id: '编号',
  introduction: '介绍',
  chineseName: '中文名称',
  englishName: '英文名称',
  otherName: '其他名称',
  inheritance: '遗传性',
  latinName: '拉丁名称',
  parts: '发病部位',
  medicalInsurance: '医疗保险',
  mainCauses: '主要病因',
  importantReminder: '重要提醒',
  inspectionItem: '检查项目',
  commonSymptom: '常见症状',
  infectivityText: '传染性',
  morbidity: '发病率',
  multiplePopulation: '发病人群',
  pathogenesisIntro: '病因综述',
  etiologyPathogenesis: '病因',
  symptomIntro: '症状综述',
  symptom: '症状',
  accompanySymptom: '伴随症状',
  preventionTreatment: '并发症状',
  expectedInspection: '问诊',
  physicalExamination: '身体检查',
  laboratoryExamination: '实验室检查',
  imagingExamination: '影像学检查',
  otherCheck: '其他检查',
  diagnosisBasis: '诊断综述',
  differentialDiagnosis: '诊断鉴别',
  treatmentPrognosis: '治疗综述',
  generalTreatment: '常规治疗',
  drugTherapy: '药物治疗',
  relatedDrug: '相关药品',
  otherTreatment: '其他治疗',
  treatmentCycle: '治疗周期',
  treatmentCost: '治疗花费',
  generalNursing: '通用护理',
  harm: '危害性',
  selfHealing: '自愈性',
  cure: '治愈性',
  cureRate: '治愈率',
  radical: '传染性',
  recidivity: '复发性',
  lifeCycle: '疾病周期',
  everydayIntro: '日常护理',
  mentalNursing: '心理护理',
  medicationCare: '药物护理',
  lifeManagement: '终身护理',
  illnessMonitoring: '疾病监测',
  subsequentVisit: '访问护理',
  dietaryConditioning: '饮食条件',
  dietSuggestion: '饮食建议',
  foodProhibition: '食物禁忌',
  preventionMeasures: '预防手段',
}
import {getAllKnowledge, advancedSearch, updateEs} from "@/api/admin";
import CKEditor from "@/components/CKEditor";

export default {
  name: "",
  components: {CKEditor},
  methods: {
    saveChange() {
      console.log(this.currentRecord.id, this.selectedField, this.editText);
      updateEs("disease", this.currentRecord.id, this.selectedField, this.editText).then(res => {
        this.$message.info(res.data)
      })
    },
    edit(record) {
      this.drawer = true;
      this.currentRecord = record;
      console.log(record)
      this.selectedField = 'introduction'
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
        getAllKnowledge("disease", page, size).then(res => {
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
        advancedSearch([kef], page - 1, size, ["disease"]).then(res => {
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
        {dataIndex: "id", title: "中文名称", scopedSlots: {customRender: 'linkTo'}},
        {dataIndex: "parts", title: "发病部位",},
        {dataIndex: "mainCauses", title: "主要病因",},
        {dataIndex: "inheritance", title: "遗传性",},
        {key: "编辑", dataIndex: 'id', scopedSlots: {customRender: 'Edit'}}
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
  },
}
</script>

<style scoped>

</style>