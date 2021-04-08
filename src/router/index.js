import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'BasicLayout',
        component: () => import('../layouts/BasicLayout'),
        children: [
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
    },
    {
        path: '/user',
        name: 'UserLayout',
        component: () => import('../layouts/UserLayout'),
        children: [
            {
                path: 'login',
                name: 'Login',
                component: () => import('../views/user/Login')
            },
            {
                path: 'register',
                name: 'Register',
                component: () => import('../views/user/Register')
            },
            {
                path: 'recover',
                name: 'Recover',
                component: () => import('../views/user/Recover')
            }
        ]
    },
    {
        path: '/forum',
        name: 'ForumLayout',
        component: () => import('../layouts/ForumLayout'),
        redirect: '/forum/category',
        children: [
            {
                path: 'category',
                name: 'ForumCategory',
                component: () => import('../views/forum/Category')
            },
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
