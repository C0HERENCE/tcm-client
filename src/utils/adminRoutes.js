const AdminPages =
    {
        'ROLE_feedbackAdmin':{
            pages: [{
                path: 'feedback',
                name: 'FeedBackManagement',
                component: () => import('../views/admin/FeedbackInfo')
            }]
        },
        'ROLE_userAdmin':
            {
                pages: [{
                    path: 'user',
                    name: 'UserManagement',
                    component: () => import('../views/admin/UserInfo')
                }],
            },
        'ROLE_knowledgeAdmin':
            {
                pages: [
                    {
                        path: 'herbs',
                        name: 'HerbsManagement',
                        component: () => import('../views/admin/HerbsInfo')
                    },
                    {
                        path: 'prescriptions',
                        name: 'PrescriptionsManagement',
                        component: () => import('../views/admin/PrescriptionInfo')
                    },
                    {
                        path: 'disease',
                        name: 'DiseaseManagement',
                        component: () => import('../views/admin/DiseaseInfo')
                    },
                ],
            },
        'ROLE_forumAdmin':
            {
                pages: [
                    {
                        path: 'category',
                        name: 'CategoryInfo',
                        component: () => import('../views/admin/CategoryInfo')
                    },
                    {
                        path: 'thread',
                        name: 'ThreadInfo',
                        component: () => import('../views/admin/ThreadInfo')
                    },
                ],
            },
        'ROLE_superAdmin':
            {
                pages: [
                    {
                        path: 'admins',
                        name: 'AdminInfo',
                        component: () => import('../views/admin/AdminInfo')
                    },
                    {
                        path: 'statistics',
                        name: 'StatisticsInfo',
                        component: () => import('../views/admin/StatisticsInfo')
                    }
                ]
            }
    }

export default AdminPages;