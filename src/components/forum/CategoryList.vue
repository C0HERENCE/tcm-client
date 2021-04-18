<template>
  <a-menu mode="inline" :selected-keys="[current]" @click="handleClick">
    <a-menu-item v-for="c in categories" :key="c.id">
      {{ c.title }}
    </a-menu-item>
  </a-menu>
</template>

<script>
import {getAllCategories} from "@/api/forum";

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
      if (newValue !== oldValue)
        this.$emit("menuChanged", newValue)
    }
  },
}
</script>

<style scoped>

</style>