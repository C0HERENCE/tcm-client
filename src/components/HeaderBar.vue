<template>
  <b-navbar toggleable="lg" >
    <b-container>
      <b-navbar-brand to="/">中医药知识科普平台</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mr-auto" is-nav>
          <b-nav-item href="#">中医文化</b-nav-item>
          <b-nav-item to="/knowledge">知识百科</b-nav-item>
          <b-nav-item to="/forum/category">交流问答</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item v-if="!$store.getters.isLogin">
            <a-space>
              <a-button @click="$router.push({name: 'Login'})">登录</a-button>
              <a-button @click="$router.push({name: 'Register'})" type="primary">注册</a-button>
            </a-space>
          </b-nav-item>
          <b-nav-item v-else>
            <a-dropdown>
              <router-link :to="{name: 'Profile'}" class="small">
                <b-avatar variant="primary" :text="$store.state.user.username[0]" size="1.7rem"></b-avatar>
                {{$store.state.user.username}}
              </router-link>
              <a-menu slot="overlay">
                <a-menu-item>
                  <router-link :to="{name: 'Profile'}">个人中心</router-link>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" @click="logout">退出登录</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </b-nav-item>
          <b-nav-item>
              <select-lang></select-lang>
          </b-nav-item>

        </b-navbar-nav>

      </b-collapse>

    </b-container>
  </b-navbar>
</template>

<script>
import SelectLang from '@/components/SelectLang';
export default {
  name: "HeaderBar",
  components: {
    SelectLang
  },
  methods: {
    logout() {
      this.$store.dispatch('Logout').then(() => window.location.reload())
    }
  }
}
</script>

<style scoped>

</style>