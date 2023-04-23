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
                path: "/Now",
                name: "Now",
                component: () => import('../views/font-page/IndexPage'),
            },
            {
                path: "/TimetableF",
                name: "TimetableF",
                component: () => import('../views/font-page/Timetable'),
            },
            {
                path: "/FacilityAndAppointment",
                name: "FacilityAndAppointment",
                component: () => import('../views/font-page/FacilityAndAppointment'),
            },
            {
                path: "/Contactus",
                name: "Contactus",
                component: () => import('../views/font-page/Contactus'),
            }, {
                path: "/StadiumBooking",
                name: "StadiumBooking",
                component: () => import('../views/font-page/StadiumBooking'),
            }, {
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
                    }, {
                        path: "/MyHomeEdit",
                        name: "MyHomeEdit",
                        component: () => import('../views/font-page/Home/MyHomeEdit'),
                    },
                    {
                        path: "/MemberShip",
                        name: "MemberShip",
                        component: () => import('../views/font-page/MemberShip'),
                    },
                    {
                        path: "/MyOrder",
                        name: "MyOrder",
                        component: () => import('../views/font-page/Home/MyOrder'),
                    }, {
                        path: "/Appointment",
                        name: "Appointment",
                        component: () => import('../views/font-page/Home/Appointment'),
                    },
                    {
                        path: "/Stadium",
                        name: "Stadium",
                        component: () => import('../views/font-page/Home/Stadium'),
                    }, {
                        path: "/Activity",
                        name: "Activity",
                        component: () => import('../views/font-page/Home/Activity'),
                    },
                    {
                        path: "/Timetable",
                        name: "Timetable",
                        component: () => import('../views/font-page/Home/Timetable'),
                    },{
                        path: "/PayChose",
                        name: "PayChose",
                        component: () => import('../views/font-page/Home/PayChose'),
                    },{
                        path: "/Pay",
                        name: "Pay",
                        component: () => import('../views/font-page/Home/Pay'),
                    },{
                        path: "/MembershipInfo",
                        name: "MembershipInfo",
                        component: () => import('../views/font-page/Home/MembershipInfo'),
                    },
                ]
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
