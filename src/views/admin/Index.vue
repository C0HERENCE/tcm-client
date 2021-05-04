<template>
  <div>
    <a-modal v-model="visible" title="反馈意见处理" ok-text="确认" cancel-text="取消" @ok="hideModal">
      <a-textarea placeholder="输入处理结果" allow-clear/>
    </a-modal>
<!--    {{ feedbacks }}-->
    <a-card title="留言反馈">
      <a-list :data-source="feedbacks">
        <a-list-item slot="renderItem" slot-scope="i">
          <a-list-item-meta :description="i.message" >
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
            <a-button type="link" @click="visible=true">处理</a-button>
          <router-link to="/herbs">前往该页</router-link>
          </span>
        </a-list-item>

      </a-list>
    </a-card>
  </div>
</template>

<script>
import {getAllFeedback} from "@/api/admin";

export default {
  mounted() {
    getAllFeedback().then(res => {
      this.feedbacks = res.data
    })
  },
  methods: {
    hideModal() {
      this.visible = false;
    }
  },
  data() {
    return {
      feedbacks: [],
      visible: false
    }
  },
  name: "Index"
}
</script>

<style scoped>

</style>