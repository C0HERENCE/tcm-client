<template>
  <div>
    <a-modal v-model="visible" title="反馈意见处理" ok-text="确认" cancel-text="取消" @ok="hideModal">
      <a-textarea placeholder="可以在此输入备注" allow-clear v-model="note"/>
    </a-modal>
    <!--    {{ feedbacks }}-->
    <a-card title="留言反馈">
      <a-list :data-source="feedbacks" :pagination="pagination">
        <a-list-item slot="renderItem" slot-scope="i">
          <a-list-item-meta :description="i.message">
            <span slot="title">
              {{ i.title }}
              <a-tag :color="i.processed===0?'red':'green'">
                {{ i.processed === 0 ? '待处理' : '已处理' }}
              </a-tag>
              <br>
              <span class="text-muted">
               {{ i.createtime }}
              </span>
            </span>
          </a-list-item-meta>

          <span slot="actions">
            <a-button v-if="i.processed === 0" type="link" @click="() => {visible=true;current=i}">处理</a-button>
            <a-button v-if="i.processed === 1" type="link" @click="() => {visible=true;current=i;note = i.note}">详情</a-button>
          <a target="_blank" :href="'/knowledge/'+esindexToRoute[i.esindex]+'/'+i.esid+'#'+i.anchor">前往该页</a>
          </span>
        </a-list-item>

      </a-list>
    </a-card>
  </div>
</template>

<script>
import {getAllFeedback, processFeedback} from "@/api/admin";

export default {
  mounted() {
    getAllFeedback().then(res => {
      this.feedbacks = res.data
    })
  },
  methods: {
    hideModal() {
      processFeedback(this.current.id, this.note).then(res=>{
        this.$message.info(res.message);
        if (res.status ===200) {
          this.visible = false;
          this.note=""
          this.current.note=this.note;
          this.current.processed = 1
        }
      })
    }
  },
  data() {
    return {
      feedbacks: [],
      visible: false,
      note: "",
      pagination: {
        pageSize: 5,
      },
      current: {},
      esindexToRoute: {
        "herbs_info_v2": "herb",
        "disease": "symptom",
        "prescriptions": "prescription"
      }
    }
  },
  name: "Index"
}
</script>

<style scoped>

</style>