import {createRouter, createWebHistory} from 'vue-router'
import {getItem} from "@/utils/storage";


const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/user/LoginPage')
    }, {
        path: '/EndPage',
        name: 'EndPage',
        component: () => import('../views/layout/EndPage'),
        children: [
            {
                path: "/UserPage",
                name: "UserPage",
                component: () => import('../views/endPage/UserPage'),
            },

            {
                path: "/UserManagement",
                name: "UserManagement",
                component: () => import('../views/endPage/UserManagement'),
            }, {
                path: "/RoleManagement",
                name: "RoleManagement",
                component: () => import('../views/endPage/RoleManagement'),
            }, {
                path: "/AuthorityManagement",
                name: "AuthorityManagement",
                component: () => import('../views/endPage/AuthorityManagement'),
            }
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
    }else{
      next()
    }
    //第二个参数from，包含的内容的是切换前的路由对象，也就是跳转前的路由对象
    //第三个参数next()，是否往下执行，执行的话，如果不写的话路由就不会跳转，操作将会终止
})


export default router
