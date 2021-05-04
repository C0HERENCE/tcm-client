export default [{
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
}]