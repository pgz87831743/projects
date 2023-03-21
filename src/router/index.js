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
        path: "/FileDetail",
        name: "FileDetail",
        component: () => import('../views/font-page/FileDetail'),
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
                path: "/SearchResource",
                name: "SearchResource",
                component: () => import('../views/font-page/SearchResource'),
            },
            {
                path: "/PublishResource",
                name: "PublishResource",
                component: () => import('../views/font-page/PublishResource'),
            },
            {
                path: "/PersonalCenter",
                name: "PersonalCenter",
                component: () => import('../views/font-page/PersonalCenter'),
            }
        ]
    }
    , {
        path: '/EndPage',
        name: 'EndPage',
        component: () => import('../views/layout/EndPage'),
        children: [
            {
                path: "/UserPage",
                name: "UserPage",
                component: () => import('../views/end-page/UserPage'),
            },

            {
                path: "/UserManagement",
                name: "UserManagement",
                component: () => import('../views/end-page/UserManagement'),
            }, {
                path: "/RoleManagement",
                name: "RoleManagement",
                component: () => import('../views/end-page/RoleManagement'),
            }, {
                path: "/AuthorityManagement",
                name: "AuthorityManagement",
                component: () => import('../views/end-page/AuthorityManagement'),
            }
            , {
                path: "/XiTongCanShu",
                name: "XiTongCanShu",
                component: () => import('../views/end-page/XiTongCanShu'),
            },

        ]
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    //第一个参数to，包含的内容是切换后的路由对象，也就是跳转后的路由对象
    if (to.href !== '/login' && getItem("TOKEN_INFO_KEY") === null) {
        next('/login')
    } else {
        next()
    }
    //第二个参数from，包含的内容的是切换前的路由对象，也就是跳转前的路由对象
    //第三个参数next()，是否往下执行，执行的话，如果不写的话路由就不会跳转，操作将会终止
})


export default router
