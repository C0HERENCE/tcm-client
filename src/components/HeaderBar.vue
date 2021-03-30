<template>
  <b-navbar toggleable="lg" >
    <b-container>
      <b-navbar-brand href="#">中医药知识科普平台</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mr-auto" is-nav>
          <b-nav-item href="#">中医文化</b-nav-item>
          <b-nav-item href="#">知识百科</b-nav-item>
          <b-nav-item href="#">交流问答</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item>
            <a-dropdown>
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
          </b-nav-item>
          <b-nav-item>
            <a-dropdown>
              <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                <b-icon icon="globe" scale="1.2rem"></b-icon>
                CN
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
          </b-nav-item>

        </b-navbar-nav>

      </b-collapse>

    </b-container>
  </b-navbar>
</template>

<script>
export default {
name: "HeaderBar"
}
</script>

<style scoped>

</style>