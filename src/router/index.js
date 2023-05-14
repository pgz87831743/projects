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
                path: "/SysUser",
                name: "SysUser",
                component: () => import('../views/end-page/SysUser'),
            },
            {
                path: "/Car",
                name: "Car",
                component: () => import('../views/end-page/Car'),
            },
            {
                path: "/CarFlowPath",
                name: "CarFlowPath",
                component: () => import('../views/end-page/CarFlowPath'),
            },
            {
                path: "/CarMaintenance",
                name: "CarMaintenance",
                component: () => import('../views/end-page/CarMaintenance'),
            },
            {
                path: "/CarRecord",
                name: "CarRecord",
                component: () => import('../views/end-page/CarRecord'),
            },
            {
                path: "/Insure",
                name: "Insure",
                component: () => import('../views/end-page/Insure'),
            },
            {
                path: "/InsureType",
                name: "InsureType",
                component: () => import('../views/end-page/InsureType'),
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
