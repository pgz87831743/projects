import {createRouter, createWebHistory} from 'vue-router'
import {getItem} from "@/utils/storage";


const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/user/LoginPageNew')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/user/RegisterPage')
    },
    {
        path: '/',
        component: () => import('../views/user/LoginPageNew')
    },


    {
        path: '/EndPage',
        name: 'EndPage',
        component: () => import('../views/layout/EndPage'),
        children: [
            {
                path: "/IndexPage",
                name: "IndexPage",
                component: () => import('../views/end-page/IndexPage'),
            },
            {
                path: "/DataQuery",
                name: "DataQuery",
                component: () => import('../views/end-page/DataQuery'),
            },
            {
                path: "/Visualization",
                name: "Visualization",
                component: () => import('../views/end-page/Visualization'),
            },
            {
                path: "/UserManage",
                name: "UserManage",
                component: () => import('../views/end-page/UserManage'),
            },
            {
                path: "/DeptManage",
                name: "DeptManage",
                component: () => import('../views/end-page/DeptManage'),
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
