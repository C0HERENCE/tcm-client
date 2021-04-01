import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '/user/login',
        name: 'Login',
        component: () => import('../views/user/Login')
    },
    {
        path: '/forum/category',
        name: 'ForumCategory',
        component: () => import('../views/forum/Category')
    },
    {
        path: '/knowledge',
        name: 'Knowledge',
        component: () => import('../views/knowledge/Index'),
        redirect: '/knowledge/herb',
        children: [
            {
                path: 'herb',
                name: 'herb',
                component: () => import('../views/knowledge/Herb'),
            },
            {
                path: 'prescription',
                name: 'prescription',
                component: () => import('../views/knowledge/Prescription'),
            },
            {
                path: 'symptom',
                name: 'symptom',
                component: () => import('../views/knowledge/Symptom'),
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
