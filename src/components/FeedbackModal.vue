<template>
  <div>
    <a-modal :title="$t('views.kb.feedback')" :visible="visible" :confirm-loading="confirmLoading"
             @ok="handleOk" @cancel="handleCancel">
      <p>
        <a-form>
          <a-form-item :label="$t('views.kb.title')">
            <a-input v-model="title" :placeholder="$t('views.kb.phd')"></a-input>
          </a-form-item>
          <a-form-item :label="$t('views.kb.content')">
            <a-textarea
                v-model="message"
                :placeholder="$t('views.kb.phdd')"
                :auto-size="{ minRows: 3, maxRows: 5 }">

            </a-textarea>
          </a-form-item>
        </a-form>
      </p>
    </a-modal>
  </div>
</template>
<script>
import {feedback} from "@/api/knowledge";

export default {
  name: 'FeedbackModal',
  data() {
    return {
      confirmLoading: false,
      message: "",
      title: ""
    };
  },
  props: {
    visible: {
      default: false
    },
    index: {
      default: '',
    },
    anchor: {
      default: ''
    },
    esId: {
      default: 0
    }
  },
  methods: {
    handleOk() {
      this.ModalText = '正在上传';
      this.confirmLoading = true;
      feedback({
        esId: this.esId,
        title: this.title,
        message: this.message,
        index: this.index,
        anchor: this.anchor
      }).then( res=> {
        this.$message.info(res.message);
      })
      .finally(() =>
      {
        this.$emit("onCloseModal")
        this.confirmLoading = false;
        this.message = "";
        this.title = ""
      })
    },
    handleCancel() {
      this.$emit("onCloseModal")
    },
  },
};
</script>