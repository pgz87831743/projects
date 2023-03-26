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
                path: "/endSearchResource",
                name: "/endSearchResource",
                component: () => import('../views/font-page/FacilityAndAppointment.vue'),
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
