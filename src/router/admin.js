import router from './index'

const AdminPages =
    {
        'ROLE_userAdmin':
            {
                pages: [{
                    path: 'user',
                    name: 'UserManagement',
                    component: () => import('../views/admin/UserInfo')
                }],
                menus: []
            },
        'ROLE_forumAdmin':
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
                menus: []
            },
        'ROLE_knowledgeAdmin':
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
                menus: []
            }
    }

const adminRoutes = {
    path: '/admin',
    name: 'AdminLayout',
    component: () => import('../layouts/AdminLayout'),
    children: [
        {
            path: '',
            name: 'AdminIndex',
            component: () => import('../views/admin/Index')
        }
    ]
}

const navMenus = [
    {
        path: '/admin',
        text: '首页'
    }
]

export const NavMenus = navMenus

export function buildAdminRoutes(roles) {
    for (let rolesKey in roles) {
        if (AdminPages[roles[rolesKey]]) {
            adminRoutes.children.push(...AdminPages[roles[rolesKey]].pages)
            navMenus.push(...AdminPages[roles[rolesKey]].menus)
        }
    }
    router.addRoutes([adminRoutes])
}