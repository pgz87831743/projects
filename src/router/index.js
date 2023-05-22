import {createRouter, createWebHistory} from 'vue-router'
import {getItem} from "@/utils/storage";


const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/user/LoginPage')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/user/RegisterPage')
    },
    {
        path: '/ForgotPassword',
        name: 'ForgotPassword',
        component: () => import('../views/user/ForgotPassword')
    },
    {
        path: '/',
        component: () => import('../views/user/LoginPage')
    },


    {
        path: '/EndPage',
        name: 'EndPage',
        component: () => import('../views/layout/EndPage'),
        children: [
             {
                path: "/PersonalCenter",
                name: "PersonalCenter",
                component: () => import('../views/end-page/PersonalCenter'),
            },
            {
                path: "/Popula",
                name: "Popula",
                component: () => import('../views/end-page/Popula'),
            },


        ]
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {


    if (to.href === '/login' || to.href === '/register'||to.href === '/ForgotPassword') {
        next()
    } else {
        if (to.href !== '/login' && getItem("TOKEN_INFO_KEY") === null) {
            next('/login')
        } else {
            next()
        }
    }
})


export default router
