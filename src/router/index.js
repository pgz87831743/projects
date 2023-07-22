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
        path: '/',
        component: () => import('../views/user/LoginPage')
    },


    {
        path: '/FontPage',
        component: () => import('../views/layout/FontPage'),
        children: [


        ]
    }
    , {
        path: '/EndPage',
        name: 'EndPage',
        component: () => import('../views/layout/EndPage'),
        children: [
            {
                path: '/admin/Inspection',
                component: () => import('../views/end-page/admin/AdminInspection.vue')
            },
            {
                path: '/admin/Reservation',
                component: () => import('../views/end-page/admin/AdminReservation.vue')
            },
            {
                path: '/user/Inspection',
                component: () => import('../views/end-page/user/UserInspection.vue')
            },
            {
                path: '/user/Reservation',
                component: () => import('../views/end-page/user/UserReservation.vue')
            },
            {
                path: '/user/UserInfo',
                component: () => import('../views/end-page/user/UserInfo.vue')
            }
        ]
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {


    if (to.href === '/login' || to.href === '/register') {
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
