<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height: 100vh">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" v-text="collapsed?'':'中医药科普平台管理'"></div>
<!--      {{ $store.state.user.roles }}-->
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">

        <a-sub-menu key="1">
          <span slot="title"><a-icon type="laptop"/><span>用户管理 </span></span>
          <a-menu-item key="10"
                       @click="()=>{if(this.$route.name!=='UserManagement') this.$router.push({name: 'UserManagement'})}"
                       v-if="$store.state.user.roles.indexOf('ROLE_userAdmin') > 0">
            <a-icon type="user"/>
            <span>用户管理</span>
          </a-menu-item>
          <a-menu-item key="11"
                       @click="()=>{if(this.$route.name!=='FeedBackManagement') this.$router.push({name: 'FeedBackManagement'})}"
                       v-if="$store.state.user.roles.indexOf('ROLE_feedbackAdmin') > 0">
            <a-icon type="user"/>
            <span>反馈意见</span>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="2" v-if="$store.state.user.roles.indexOf('ROLE_knowledgeAdmin') > 0">
          <span slot="title"><a-icon type="laptop"/><span>知识库管理 </span></span>
          <a-menu-item key="20"
                       @click="()=>{if(this.$route.name!=='HerbsManagement') this.$router.push({name: 'HerbsManagement'})}">
            <a-icon type="video-camera"/>
            <span>中草药</span>
          </a-menu-item>
          <a-menu-item key="21"
                       @click="()=>{if(this.$route.name!=='PrescriptionsManagement') this.$router.push({name: 'PrescriptionsManagement'})}">
            <a-icon type="video-camera"/>
            <span>中药方剂</span>
          </a-menu-item>
          <a-menu-item key="22"
                       @click="()=>{if(this.$route.name!=='DiseasesManagement') this.$router.push({name: 'DiseaseManagement'})}">
            <a-icon type="video-camera"/>
            <span>疾病诊疗</span>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="3" v-if="$store.state.user.roles.indexOf('ROLE_forumAdmin') > 0">
          <span slot="title"><a-icon type="laptop"/><span>讨论区管理</span> </span>
          <a-menu-item key="30"
                       @click="()=>{if(this.$route.name!=='CategoryInfo') this.$router.push({name: 'CategoryInfo'})}">
            <a-icon type="video-camera"/>
            <span>版块</span>
          </a-menu-item>
          <a-menu-item key="31"
                       @click="()=>{if(this.$route.name!=='ThreadInfo') this.$router.push({name: 'ThreadInfo'})}">
            <a-icon type="video-camera"/>
            <span>帖子和评论</span>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="4" v-if="$store.state.user.roles.indexOf('ROLE_superAdmin') > 0"
                     @click="()=>{if(this.$route.name!=='AdminInfo') this.$router.push({name: 'AdminInfo'})}">
          <a-icon type="video-camera"/>
          <span>权限分配</span>
        </a-menu-item>
        <a-menu-item key="5" v-if="$store.state.user.roles.indexOf('ROLE_superAdmin') > 0"
                     @click="()=>{if(this.$route.name!=='StatisticsInfo') this.$router.push({name: 'StatisticsInfo'})}">
          <a-icon type="video-camera"/>
          <span>日志统计</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
        />
        <p class="float-right mx-3">
          欢迎您， {{$store.state.user.username}}
          <a-button type="link" @click="$router.push('/')">前往首页</a-button>
          <a-button type="link" @click="logout">退出系统</a-button>
        </p>
      </a-layout-header>
      <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>

export default {
  mounted() {
    if (this.$store.state.user.isAdmin !== true) {
      this.$router.push("/")
    }
  },
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    logout() {
      const store = this.$store;
      this.$confirm({
        title: '提示',
        content: '确定要退出本系统吗',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          store.dispatch('Logout').then(() => {
            window.location = '/user/login'
          })
        }
      })
    }
  },
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  color: whitesmoke;
}
</style>