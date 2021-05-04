import account from "@/router/account";
import forum from "@/router/forum";
import user from "@/router/user";
import knowledge from "@/router/knowledge";

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...knowledge,
        ...user,
        ...forum,
        ...account,
    ]
})
