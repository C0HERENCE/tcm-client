export default [{
    path: '/account',
    name: 'AccountLayout',
    component: () => import('../layouts/AccountLayout'),
    redirect: '/account/profile',
    children: [
        {
            path: 'setting',
            name: 'Setting',
            component: () => import('../views/account/Settings')
        },
        {
            path: 'profile',
            name: 'Profile',
            component: () => import('../views/account/Profile')
        },
        {
            path: 'history',
            name: 'History',
            component: () => import('../views/account/History')
        },
        {
            path: 'favourite',
            name: 'Favourite',
            component: () => import('../views/account/Favourite')
        },
        {
            path: 'published',
            name: 'Published',
            component: () => import('../views/account/Published')
        },
    ]
}]