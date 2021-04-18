<template>
  <div>
    <h3>发布新帖</h3>
    <a-row :gutter="6">
      <a-col :lg="18" :sm="24">
        <a-input placeholder="请填写标题"></a-input>
      </a-col>
      <a-col :lg="6" :sm="24">
        <a-select default-value="lucy" style="width: 100%">
          <a-select-option value="2"> Jack </a-select-option>
          <a-select-option value="3"> Jack </a-select-option>
          <a-select-option value="4"> Jack </a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <CKEditor @input="ll" class="my-3"></CKEditor>
    <div class="text-center mb-5">
      <a-button type="primary" style="min-width: 6rem">发布</a-button>
    </div>
  </div>
</template>

<script>
import CKEditor from "@/components/CKEditor";

export default {
  name: "PostThreadView",
  components: {CKEditor},
  data() {
    return {

    }
  },
  methods: {
    ll() {
      console.log("xx")
    }
  },
}
</script>

<style scoped>

</style>