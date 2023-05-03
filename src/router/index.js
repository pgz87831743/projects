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
                path: "/Dept",
                name: "Dept",
                component: () => import('../views/end-page/admin-page/Dept.vue'),
            }, {
                path: "/PersonalCenter",
                name: "PersonalCenter",
                component: () => import('../views/end-page/PersonalCenter'),
            },
            {
                path: "/Performance",
                name: "Performance",
                component: () => import('../views/end-page/Performance'),
            },
            {
                path: "/SysUser",
                name: "SysUser",
                component: () => import('../views/end-page/SysUser'),
            },
            {
                path: "/Transaction",
                name: "Transaction",
                component: () => import('../views/end-page/Transaction'),
            },
            {
                path: "/RoleManage",
                name: "RoleManage",
                component: () => import('../views/end-page/admin-page/RoleManage'),
            },
            {
                path: "/CreateDept",
                name: "CreateDept",
                component: () => import('../views/end-page/admin-page/CreateDept'),
            },
            {
                path: "/OnboardingReview",
                name: "OnboardingReview",
                component: () => import('../views/end-page/administrative-page/OnboardingReview.vue'),
            },
            {
                path: "/PersonnelList",
                name: "PersonnelList",
                component: () => import('../views/end-page/administrative-page/PersonnelList'),
            },
            {
                path: "/BusinessList",
                name: "BusinessList",
                component: () => import('../views/end-page/salesman-page/BusinessList'),
            },
            {
                path: "/TransactionEntry",
                name: "TransactionEntry",
                component: () => import('../views/end-page/salesman-page/TransactionEntry'),
            },
            {
                path: "/PersonnelPerformance",
                name: "PersonnelPerformance",
                component: () => import('../views/end-page/treasurer-page/PersonnelPerformance'),
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
