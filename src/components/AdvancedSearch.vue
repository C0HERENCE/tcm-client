<template>
  <div>
    <a-form layout="horizontal" :labelCol="{ span: 2 }">
      <a-form-item :label="$t('views.components.kb-title')">
        <a-checkbox-group v-model="checkedDatabase" :options="DatabaseOptions" @change="dbChange"/>
      </a-form-item>
      <div v-for="k in form" :key="k.id" :required="true" class="my-1">
        <div v-if="k.enabled">
          <a-input :placeholder="$t('views.components.kb-keyword')" style="width: 30%; margin-right: 8px"
                   v-model="k.keyword"/>
          <span class="mx-1">{{ $t('views.components.at') }}</span>
          <a-tree-select v-model="k.treeValue" style="width:50%" :tree-data="treeData" tree-checkable
                         :search-placeholder="$t('views.components.kb-placeholder')"/>
          <a-icon v-if="form.length > 1" class="dynamic-delete-button mx-1" type="minus-circle-o"
                  :disabled="form === 1" @click="() => remove(k)"/>
        </div>
      </div>
      <a-form-item>
        <a-button type="dashed" style="width: 60%" @click="add">
          <a-icon type="plus"/>
          {{ $t('views.components.add')}}
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="handleSubmit">
          {{ $t('views.forum.search') }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "AdvancedSearch",
  data() {
    const treeData = [
      {title: '介绍', value: 'introduction', key: 'introduction',},
      {title: '名称', value: 'chineseName', key: 'chineseName',},
      {title: '发病部位', value: 'parts', key: 'parts',},
      {title: '病因', value: 'maincauses', key: 'mainCauses',},
      {title: '症状', value: 'commonsymptom', key: 'commonSymptom',},
      {title: '主治', value: 'mainattend', key: 'mainAttend',},
      {title: '方剂', value: 'relatedprescription', key: 'relatedPrescription',},
    ];
    return {
      DatabaseOptions: [
        {label: '中草药', value: 'herbs_info_v2'},
        {label: '中药方剂', value: 'prescriptions'},
        {label: '疾病诊疗', value: 'disease'},
      ],
      checkedDatabase: ['herbs_info_v2', 'prescriptions', 'disease'],
      treeData,
      enabled: 1,
      form: [{id: 1, keyword: '', treeValue: ['chineseName'], enabled: 1}]
    }
  },
  methods: {
    dbChange() {
    },
    handleSubmit() {
      this.$emit("onAdvancedSearch", this.checkedDatabase, this.form)
    },
    add() {
      if (this.enabled === 5) {
        this.$error({content: "最多5个条件"})
        return;
      }
      this.enabled++;
      this.form.push({
        id: this.form[this.form.length - 1].id + 1,
        keyword: '',
        enabled: 1,
        treeValue: []
      })
    },
    remove(k) {
      if (this.enabled === 1) {
        this.$error({content: "至少一个条件"})
        return;
      }
      this.enabled--;
      k.enabled = 0
    },
  },
}
</script>

<style scoped>

</style>