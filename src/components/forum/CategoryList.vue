<template>
  <a-menu mode="inline" :selected-keys="[current]" @click="handleClick">
    <a-menu-item v-for="c in categories" :key="c.id">
      {{ $store.state.app.lang === 'zh-CN'? c.title : c.english}}
    </a-menu-item>
  </a-menu>
</template>

<script>
import {getAllCategories} from "@/api/forum";

let first = true;
export default {
  name: "CategoryList",
  data() {
    return {
      categories: [],
      current: '',
    }
  },
  methods: {
    handleClick(e) {
      this.current = e.key;
    },
  },
  mounted() {
    getAllCategories().then(res => {
      this.categories = res.data;
      this.current = this.categories[0].id
    })
  },
  watch: {
    current(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (first && this.$route.params.q) {
          first = false;
          return;
        }
        this.$emit("menuChanged", newValue)
      }
    }
  },
}
</script>

<style scoped>

</style>