<template>
<a-card>
  <a-card-meta :title="$t('views.forum.about-me')" v-if="my !== null">
    <a-avatar slot="avatar" :src="my.avatar"/>
    <span slot="description">
      <p>
      {{my.intro !== "" ? my.intro : '-'}}
      </p>
    <a-button size="large">
      <router-link :to="{name: 'PostThread'}"><a-icon type="plus"></a-icon>
      {{$t('views.forum.new')}}
      </router-link>
    </a-button>
    </span>
  </a-card-meta>
</a-card>
</template>

<script>
import {getMyInfo} from "@/api/forum";

export default {
  name: "AboutMe",
  data() {
    return {
      my: null
    }
  },
  mounted() {
    // if (this.$store.getters.user.isLogin)
    getMyInfo().then(res => {
      this.my = res.data
    })
  }
}
</script>

<style scoped>

</style>