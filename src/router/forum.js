export default  [{
    path: '/forum',
    name: 'ForumLayout',
    component: () => import('../layouts/ForumLayout'),
    redirect: '/forum/category',
    children: [
        {
            path: 'category',
            name: 'ForumCategory',
            components: {
                default: () => import('../views/forum/Category'),
                side: () => import('../components/forum/AboutMe')
            }
        },
        {
            path: 'post',
            name: 'PostThread',
            components: {
                default: () => import('../views/forum/PostThread'),
                side: () => import('../components/forum/AboutMe')
            }
        },
        {
            path: 'thread/:id',
            name: 'Thread',
            components: {
                default: () => import('../views/forum/Thread'),
                side: () => import('../components/forum/AboutAuthor')
            }
        }
    ]
}]