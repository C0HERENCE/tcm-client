<template>
<div>
  <a-row :gutter="16">
    <a-col>
      <a-form layout="vertical">
        <a-form-item :label="$t('views.account.old-pwd')">
          <a-input type="password" v-model="form.oldPwd"></a-input>
        </a-form-item>
        <a-form-item :label="$t('views.account.new-pwd')">
          <a-input type="password" v-model="form.newPwd"></a-input>
        </a-form-item>
        <a-form-item :label="$t('views.account.re-pwd')">
          <a-input type="password" v-model="form.newPwd2"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="submit" @click="setNewPwd">{{$t('views.account.set-pwd')}}</a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</div>
</template>

<script>
import {updatePassword, getSecurity} from "@/api/account";

export default {
  name: "Settings",
  data() {
    return {
      form: {},
      state: 1,
    }
  },
  methods: {
    setNewPwd() {
      updatePassword(this.form).then(res=>{
        this.$info({content: res.message})
      }).finally(() => {
        this.form = {}
      })
    }
  },
  mounted() {
    getSecurity().then(res => this.state = res.data)
  }
}
</script>

<style scoped>

</style>