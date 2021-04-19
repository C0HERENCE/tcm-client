<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
      <a-space>
        <b-icon icon="globe" scale="1.2rem"></b-icon>
        <span>{{langName[$store.state.app.lang]}}</span>
      </a-space>
    </a>
    <a-menu slot="overlay">
      <a-menu-item>
        <a href="javascript:;" @click="$store.dispatch('setLang', 'en-US')">English</a>
      </a-menu-item>
      <a-menu-item>
        <a href="javascript:;" @click="$store.dispatch('setLang', 'zh-CN')">中文(简体)</a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  name: "SelectLang",
  data() {
    return {
      langName: {
        "zh-CN": "中文(简体)",
        "en-US": "English"
      }
    }
  },
}
</script>

<style scoped>

</style>