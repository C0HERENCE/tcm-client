<template>
  <b-navbar toggleable="lg">
    <b-container>
      <b-navbar-brand to="/">{{ $t('views.components.header-bar-title') }}</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mr-auto" is-nav>
          <b-nav-item to="/search/result">{{ $t('views.components.is') }}</b-nav-item>
          <b-nav-item to="/knowledge">{{ $t('views.components.kb') }}</b-nav-item>
          <b-nav-item to="/forum/category">{{ $t('views.components.category') }}</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item v-if="!$store.getters.isLogin">
            <a-space>
              <a-button @click="$router.push({name: 'Login'})">
                {{ $t('views.components.login')}}
              </a-button>
              <a-button @click="$router.push({name: 'Register'})" type="primary">
                {{ $t('views.components.register')}}
              </a-button>
            </a-space>
          </b-nav-item>
          <b-nav-item v-else>
            <a-dropdown>
              <router-link :to="{name: 'Profile'}" class="small">
                <b-avatar variant="dark" :text="$store.state.user.username[0]" size="1.7rem" :src="avatar"></b-avatar>
                <span class="text-muted">{{ $store.state.user.username }}</span>
              </router-link>
              <a-menu slot="overlay">
                <a-menu-item>
                  <router-link :to="{name: 'Profile'}">{{ $t('views.components.uc') }}</router-link>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" @click="logout">{{ $t('views.components.q') }}</a>
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
import {getAvatar} from "@/api/account";

export default {
  name: "HeaderBar",
  data() {
    return {
      avatar: ""
    }
  },
  mounted() {
    getAvatar().then(res => {
      if (res.status === 200) {
        this.avatar = res.data
      }
    })
  },
  components: {
    SelectLang
  },
  methods: {
    logout() {
      this.$store.dispatch('Logout').then(() => {
        this.$router.push("/user/login")
        // window.location.reload()
      })
    }
  }
}
</script>

<style scoped>

</style>