<template>
  <a-menu slot="title" mode="horizontal" :selected-keys="[current]" @click="handleClick">
    <a-menu-item key="0"> {{$t('views.forum.all')}}</a-menu-item>
    <a-menu-item v-for="t in typeData" :key="t.id">
      {{ t.name }}
    </a-menu-item>
  </a-menu>
</template>

<script>
import {getAllTypes} from "@/api/forum";

export default {
  name: "TypeList",
  data() {
    return {
      typeData: [],
      current: '',
    }
  },
  methods: {
    handleClick(e) {
      this.current = e.key;
    }
  },
  mounted() {
    getAllTypes().then(res => {
      this.typeData = res.data;
      this.current = "0";
    })
  },
  watch: {
    current(newValue, oldValue) {
      if (newValue !== oldValue)
        this.$emit("typeChanged", newValue)
    }
  },
}
</script>

<style scoped>

</style>