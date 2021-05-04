import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from "ant-design-vue";
import i18n from './locales'
import "ant-design-vue/dist/antd.css";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false
Vue.use(Antd);
import {Network} from 'vue-vis-network'
Vue.component('network', Network);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
