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
            }

        ]
    }
    , {
        path: '/EndPage',
        name: 'EndPage',
        component: () => import('../views/layout/EndPage'),
        children: [
            {
                path: "/News",
                name: "News",
                component: () => import('../views/end-page/News'),
            },
            {
                path: "/Appointment",
                name: "Appointment",
                component: () => import('../views/end-page/Appointment'),
            },{
                path: "/Drug",
                name: "Drug",
                component: () => import('../views/end-page/Drug'),
            },
            {
                path: "/Drugstore",
                name: "Drugstore",
                component: () => import('../views/end-page/Drugstore'),
            },
            {
                path: "/Medical",
                name: "Medical",
                component: () => import('../views/end-page/Medical'),
            },
            {
                path: "/Offices",
                name: "Offices",
                component: () => import('../views/end-page/Offices'),
            },
            {
                path: "/Visit",
                name: "Visit",
                component: () => import('../views/end-page/Visit'),
            },
            {
                path: "/Workforce",
                name: "Workforce",
                component: () => import('../views/end-page/Workforce'),
            },
            {
                path: "/Doctor",
                name: "Doctor",
                component: () => import('../views/end-page/Doctor'),
            },
            {
                path: "/Patient",
                name: "Patient",
                component: () => import('../views/end-page/Patient'),
            },
            {
                path: "/Prescription",
                name: "Prescription",
                component: () => import('../views/end-page/Prescription'),
            },


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
