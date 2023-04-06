import {createRouter, createWebHistory} from 'vue-router'
import {getItem} from "@/utils/storage";


const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/user/LoginPage')
    }, {
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
        component: () => import('../views/font-page/FileDetail'),
    },

    {
        path: '/FontPage',
        name: 'FontPage',
        component: () => import('../views/layout/FontPage'),
        children: [
            {
                path: "/IndexPage",
                name: "IndexPage",
                component: () => import('../views/font-page/IndexPage'),
            },
            {
                path: "/Timetable",
                name: "Timetable",
                component: () => import('../views/font-page/Timetable'),
            },
            {
                path: "/FacilityAndAppointment",
                name: "FacilityAndAppointment",
                component: () => import('../views/font-page/FacilityAndAppointment'),
            },
            {
                path: "/MemberShip",
                name: "MemberShip",
                component: () => import('../views/font-page/MemberShip'),
            },
            {
                path: "/Contactus",
                name: "Contactus",
                component: () => import('../views/font-page/Contactus'),
            },{
                path: "/StadiumBooking",
                name: "StadiumBooking",
                component: () => import('../views/font-page/StadiumBooking'),
            },{
                path: "/StadiumDetail",
                name: "StadiumDetail",
                component: () => import('../views/font-page/StadiumDetail'),
            },
            {
                path: "/PersonalCenter",
                name: "PersonalCenter",
                component: () => import('../views/font-page/PersonalCenter'),
                children: [
                    {
                        path: "/MyHomePage",
                        name: "MyHomePage",
                        component: () => import('../views/font-page/Home/MyHomePage'),
                    },
                    {
                        path: "/MyOrder",
                        name: "MyOrder",
                        component: () => import('../views/font-page/Home/MyOrder'),
                    }
                ]
            },
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
