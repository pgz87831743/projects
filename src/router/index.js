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
            {
                path: "/IndexPage",
                name: "IndexPage",
                component: () => import('../views/font-page/IndexPage'),
            },
            {
                path: "/DrugHelpFont",
                name: "DrugHelpFont",
                component: () => import('../views/font-page/DrugHelpFont'),
            },
            {
                path: "/ExchangeFont",
                name: "ExchangeFont",
                component: () => import('../views/font-page/ExchangeFont'),
            },{
                path: "/GoodsFont",
                name: "GoodsFont",
                component: () => import('../views/font-page/GoodsFont'),
            },{
                path: "/PaidHelpFont",
                name: "PaidHelpFont",
                component: () => import('../views/font-page/PaidHelpFont'),
            },
            {
                path: "/PersonalCenter",
                name: "PersonalCenter",
                component: () => import('../views/font-page/PersonalCenter'),
            },{
                path: "/GoodsBuyFont",
                name: "GoodsBuyFont",
                component: () => import('../views/font-page/GoodsBuyFont'),
            },{
                path: "/PaidHelpNeedFont",
                name: "PaidHelpNeedFont",
                component: () => import('../views/font-page/PaidHelpNeedFont'),
            },{
                path: "/DrugHelpProvideFont",
                name: "DrugHelpProvideFont",
                component: () => import('../views/font-page/DrugHelpProvideFont'),
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
                path: "/GoodsManagement",
                name: "GoodsManagement",
                component: () => import('../views/end-page/GoodsManagement'),
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
