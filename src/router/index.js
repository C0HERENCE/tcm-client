import account from "@/router/account";
import forum from "@/router/forum";
import user from "@/router/user";
import knowledge from "@/router/knowledge";
import AdminPages from "@/utils/adminRoutes";

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...knowledge,
        ...user,
        ...forum,
        ...account,
    ]
})

const adminRoutes = {
    path: '/admin',
    name: 'AdminLayout',
    meta: {
        requireAdmin: true
    },
    component: () => import('../layouts/AdminLayout'),
    children: [
        {
            path: '',
            name: 'AdminIndex',
            component: () => import('../views/admin/Index')
        }
    ]
}

if (store.state.user.roles)
{
    store.state.user.roles.forEach(roleName => {
        if (!AdminPages[roleName]) return;
        console.log(roleName)
        adminRoutes.children.push(...AdminPages[roleName].pages)
    })
    router.addRoute(adminRoutes);
}

router.beforeEach((to, from, next) => {
    if (to.meta.requireAdmin === true) {
        if (store.state.user.isAdmin === true) {
            next()
        }
        else {
            next({
                path: '/'
            })
        }
    }
    else
        next()
})

export default router;