<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height: 100vh">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" v-text="collapsed?'':'中医药科普平台管理'"></div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1" @click="()=>{if(this.$route.name!=='UserManagement') this.$router.push({name: 'UserManagement'})}">
            <a-icon type="user" />
            <span>用户管理</span>
        </a-menu-item>
        <a-sub-menu key="2">
          <span slot="title"><a-icon type="laptop" /><span>知识库管理 </span></span>
          <a-menu-item key="20" @click="()=>{if(this.$route.name!=='HerbsManagement') this.$router.push({name: 'HerbsManagement'})}">
            <a-icon type="video-camera" />
            <span>中草药</span>
          </a-menu-item>
          <a-menu-item key="21" @click="()=>{if(this.$route.name!=='PrescriptionsManagement') this.$router.push({name: 'PrescriptionsManagement'})}">
            <a-icon type="video-camera" />
            <span>中药方剂</span>
          </a-menu-item>
          <a-menu-item key="22" @click="()=>{if(this.$route.name!=='DiseasesManagement') this.$router.push({name: 'DiseaseManagement'})}">
            <a-icon type="video-camera" />
            <span>疾病诊疗</span>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="3">
          <span slot="title"><a-icon type="laptop" /><span>讨论区管理</span> </span>
          <a-menu-item key="30" @click="()=>{if(this.$route.name!=='CategoryInfo') this.$router.push({name: 'CategoryInfo'})}">
            <a-icon type="video-camera" />
            <span>版块</span>
          </a-menu-item>
          <a-menu-item key="31" @click="()=>{if(this.$route.name!=='ThreadInfo') this.$router.push({name: 'ThreadInfo'})}">
            <a-icon type="video-camera" />
            <span>帖子和评论</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
        />
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
import {NavMenus} from '../router/admin'
export default {
  mounted() {
    console.log(NavMenus)
  },
  data() {
    return {
      collapsed: false,
    };
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