<template>
  <div class="container">
    <HeaderBar></HeaderBar>
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card class="avatar-holder">
          <div class="avatar">
            <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="avatar">
          </div>
          <div class="username">天野远子</div>
          <div class="bio">海纳百川，有容乃大</div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <a-card style="width:100%"
                :tabList="tabListNoTitle"
                :activeTabKey="noTitleKey"
                @tabChange="key => handleTabChange(key)">
          <router-view></router-view>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar";

export default {
  name: "AccountLayout",
  components: {HeaderBar},
  data() {
    return {
      tabListNoTitle: [
        {
          key: 'Profile',
          tab: '个人资料'
        },
        {
          key: 'Setting',
          tab: '个人设置'
        },
      ],
      noTitleKey: this.$route.name
    }
  },
  methods: {
    handleTabChange (key) {
      this.$router.push({name: key});
      this.noTitleKey = key
    },
  },
}
</script>

<style scoped>
.avatar-holder {
  text-align: center;
}
.avatar {
  width: 104px;
  height: 104px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
}
.avatar > img {
  height: 100%;
  width: 100%;
}
.username {
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  margin-bottom: 4px;
}
</style>