import {createRouter, createWebHistory} from 'vue-router'
import {getItem} from "@/utils/storage";


const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/user/LoginPage')
    },
    {
        path: '/',
        component: () => import('../views/user/LoginPage')
    },

    {
        path: '/FontPage',
        component: () => import('../views/layout/FontPage'),
        children: [
            {
                path: "/IndexPage",
                name: "IndexPage",
                component: () => import('../views/font-page/IndexPage'),
            },
            {
                path: "/DoctorInfoDetail",
                name: "DoctorInfoDetail",
                component: () => import('../views/font-page/DoctorInfoDetail'),
            },
            {
                path: "/DoctorInfoDesc",
                name: "DoctorInfoDesc",
                component: () => import('../views/font-page/DoctorInfoDesc'),
            },
            {
                path: "/SearchPage",
                name: "SearchPage",
                component: () => import('../views/font-page/SearchPage'),
            }
        ]
    }
    , {
        path: '/EndPage',
        name: 'EndPage',
        component: () => import('../views/layout/EndPage'),
        children: [
            {
                path: "/UserManagement",
                name: "UserManagement",
                component: () => import('../views/end-page/UserManagement'),
            },
            {
                path: "/DoctorInfo",
                name: "DoctorInfo",
                component: () => import('../views/end-page/DoctorInfo'),
            },
            {
                path: "/Means",
                name: "Means",
                component: () => import('../views/end-page/Means'),
            },

        ]
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {

    let ig = ['/login'
        ,'/register'
        ,'/IndexPage'
        ,'/DoctorInfoDesc'
        ,'/DoctorInfoDetail'
        ,'/SearchPage'
    ]

    if (ig.concat(to.href)) {
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
