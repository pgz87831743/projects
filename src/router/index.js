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
        path: '/NewsInfo',
        component: () => import('../views/font-page/NewsInfo')
    },{
        path: '/OrderDetail',
        component: () => import('../views/font-page/OrderDetail')
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
                path: "/PersonalCenter",
                name: "PersonalCenter",
                component: () => import('../views/font-page/PersonalCenter'),
                children:[
                    {
                        path: "/UserIfoDetail",
                        name: "UserIfoDetail",
                        component: () => import('../views/person-info/UserIfoDetail'),
                    },{
                        path: "/MyHealthLog",
                        name: "MyHealthLog",
                        component: () => import('../views/person-info/MyHealthLog'),
                    },{
                        path: "/MyOrder",
                        name: "MyOrder",
                        component: () => import('../views/person-info/MyOrder'),
                    },
                ]
            },
            {
                path: "/HealthLogsFont",
                name: "HealthLogsFont",
                component: () => import('../views/font-page/HealthLogsFont'),
            },
            {
                path: "/TeacherFoods",
                name: "TeacherFoods",
                component: () => import('../views/font-page/TeacherFoods'),
            },
            {
                path: "/TeacherCheckup",
                name: "TeacherCheckup",
                component: () => import('../views/font-page/TeacherCheckup'),
            },
            {
                path: "/SearchShop",
                name: "SearchShop",
                component: () => import('../views/font-page/SearchShop.vue'),
            },
            {
                path: "/ShoppingCar",
                name: "ShoppingCar",
                component: () => import('../views/font-page/ShoppingCar'),
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
                path: "/TeacherManagement",
                name: "TeacherManagement",
                component: () => import('../views/end-page/TeacherManagement'),
            },
            {
                path: "/AdminManagement",
                name: "AdminManagement",
                component: () => import('../views/end-page/AdminManagement'),
            },
            {
                path: "/EndIndex",
                name: "EndIndex",
                component: () => import('../views/end-page/EndIndex'),
            },
            {
                path: "/News",
                name: "News",
                component: () => import('../views/end-page/News'),
            },
            {
                path: "/HealthCheckup",
                name: "HealthCheckup",
                component: () => import('../views/end-page/HealthCheckup'),
            },
            {
                path: "/HealthLogs",
                name: "HealthLogs",
                component: () => import('../views/end-page/HealthLogs'),
            },
            {
                path: "/Foods",
                name: "Foods",
                component: () => import('../views/end-page/Foods'),
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
