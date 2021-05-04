export default [{
    path: '/',
    name: 'Home',
    component: () => import('../layouts/BasicLayout'),
    children: [
        {
            path: '',
            name: 'Home',
            component: () => import('../views/Home.vue')
        },
        // 知识库模块
        {
            path: '/knowledge',
            name: 'Knowledge',
            component: () => import('../views/knowledge/Index'),
            redirect: '/knowledge/herb',
            children: [
                {
                    path: 'herb',
                    name: 'Herb',
                    component: () => import('../views/knowledge/Herb'),
                    meta: {
                        cover: 'Herb'
                    }
                },
                {
                    path: 'prescription',
                    name: 'Prescription',
                    component: () => import('../views/knowledge/Prescription'),
                    meta: {
                        cover: 'Prescription'
                    }
                },
                {
                    path: 'symptom',
                    name: 'Symptom',
                    component: () => import('../views/knowledge/Symptom'),
                    meta: {
                        cover: 'Symptom'
                    }
                },
                {
                    path: 'herb/:id',
                    name: 'HerbDetail',
                    component: () => import('../views/knowledge/HerbDetail'),
                    meta: {
                        cover: 'Herb'
                    }
                },
                {
                    path: 'prescription/:id',
                    name: 'PrescriptionDetail',
                    component: () => import('../views/knowledge/PrescriptionDetail'),
                    meta: {
                        cover: 'Prescription'
                    }
                },
                {
                    path: 'symptom/:id',
                    name: 'SymptomDetail',
                    component: () => import('../views/knowledge/SymptomDetail'),
                    meta: {
                        cover: 'Symptom'
                    }
                }
            ]
        },
        // 搜索功能
        {
            path: "/search/result",
            name: "SearchResult",
            component: () => import('../views/search/SearchResult')
        }
    ]
}]