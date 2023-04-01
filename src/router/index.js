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
        path: "/FileDetail",
        name: "FileDetail",
        component: () => import('../views/font-page/ProductDetail.vue'),
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
                path: "/SearchShop",
                name: "SearchShop",
                component: () => import('../views/font-page/SearchShop.vue'),
            },
            {
                path: "/ShoppingCart",
                name: "ShoppingCart",
                component: () => import('../views/font-page/ShoppingCart'),
            },
            {
                path: "/PersonalCenter",
                name: "PersonalCenter",
                component: () => import('../views/font-page/PersonalCenter'),
            },
            {
                path: "/ProductDetail",
                name: "ProductDetail",
                component: () => import('../views/font-page/ProductDetail.vue'),
            },
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
            },{
                path: "/LogPage",
                name: "LogPage",
                component: () => import('../views/end-page/LogPage'),
            }
            , {
                path: "/ResourcesManagement",
                name: "ResourcesManagement",
                component: () => import('../views/end-page/ResourcesManagement'),
            }
            , {
                path: "/ReportingManagement",
                name: "ReportingManagement",
                component: () => import('../views/end-page/ReportingManagement'),
            }
            , {
                path: "/AuditManagement",
                name: "AuditManagement",
                component: () => import('../views/end-page/AuditManagement'),
            },
            {
                path: "/SensitiveWords",
                name: "SensitiveWords",
                component: () => import('../views/end-page/SensitiveWords'),
            }

        ]
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {


    if (to.href==='/login'||to.href==='/register'){
        next()
    } else{
        if (to.href !== '/login' && getItem("TOKEN_INFO_KEY") === null) {
            next('/login')
        } else {
            next()
        }
    }
})


export default router
