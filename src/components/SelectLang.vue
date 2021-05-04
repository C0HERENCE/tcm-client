<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
      <a-space>
        <b-icon icon="globe" scale="1.2rem" class="text-muted"></b-icon>
        <span class="text-muted">{{langName[$store.state.app.lang]}}</span>
      </a-space>
    </a>
    <a-menu slot="overlay">
      <a-menu-item>
        <a href="javascript:;" @click="$store.dispatch('setLang', 'en-US')">
          <span class="text-muted">
            English
          </span>
        </a>
      </a-menu-item>
      <a-menu-item>
        <a href="javascript:;" @click="$store.dispatch('setLang', 'zh-CN')" class="text-muted">
          <span class="text-muted">
            中文(简体)
          </span>
        </a>
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