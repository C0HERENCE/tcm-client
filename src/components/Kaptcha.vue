<template>
  <a-row>
    <a-col>
      <img height="40" width="130" class="mx-2" style="display: inline;overflow:hidden" ref="img" src="/api/kaptcha/render"
           onclick="this.src=this.src+'?'+Math.random()" alt="kaptcha">
      <a-input @blur="valid" class="mx-2"  v-model="code" style="width: 220px" :placeholer="$t('views.components.kaptcha')"></a-input>
      <span class="mx-2 text-success" v-if="status===1"><a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a"/>{{$t("views.components.correct")}}</span>
      <span class="mx-2 text-danger"  v-if="status===2"><a-icon type="close-circle" theme="twoTone" two-tone-color="red"/>{{$t("views.components.wrong")}}</span>
    </a-col>
  </a-row>
</template>

<script>
import {validKaptcha} from "@/api/kaptcha";

export default {
  name: "Kaptcha",
  data() {
    return {
      kaptcahData: null,
      code: '',
      status: true,
    }
  },
  methods: {
    valid() {
      if (this.code.length === 4) {
        validKaptcha(this.code).then(res => {
          if (res.status === 200) {
            this.$emit('valid', true);
            this.status = 1;
          } else {
            this.$emit('valid', false)
            this.status = 2;
            this.$refs.img.src = '/api/kaptcha/render' + '?' + Math.random()
          }
        })
      }else {
        this.status = 2;
      }
    }
  }
}
</script>

<style scoped>

</style>