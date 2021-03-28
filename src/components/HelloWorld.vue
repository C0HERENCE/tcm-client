<template>
  <a-layout>
    <b-navbar>
      <b-container>
        <b-navbar-brand href="#">
          中医药知识科普平台
        </b-navbar-brand>
        <b-navbar-toggle target="navbar-toggle-collapse">
          <template #default="{ expanded }">
            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
            <b-icon v-else icon="chevron-bar-down"></b-icon>
          </template>
        </b-navbar-toggle>

        <a-space>
          <a-dropdown isnav>
            <a class="small">
              <b-avatar variant="primary" text="BV" size="1.7rem"></b-avatar>
              749976734@qq.com
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;">个人中心</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">个人设置</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">退出登录</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-dropdown isnav>
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              <b-icon icon="globe" scale="1.2rem"></b-icon>
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;">English</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">中文简体</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-space>
      </b-container>
    </b-navbar>
    <a-layout-content>
      <img src="@/assets/banner-en.png" alt="12" />
      <b-container>
        123
      </b-container>
    </a-layout-content>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted() {
    this.$store.dispatch("Login", { username: "tom", password: "4576" });
  },
};
</script>

<style scoped></style>
