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
            ,
            {
                path: "/CityFont",
                name: "CityFont",
                component: () => import('../views/font-page/CityFont'),
            }
            ,
            {
                path: "/PopulationFont",
                name: "PopulationFont",
                component: () => import('../views/font-page/PopulationFont'),
            }
            ,
            {
                path: "/EconomyFont",
                name: "EconomyFont",
                component: () => import('../views/font-page/EconomyFont'),
            }
            ,
            {
                path: "/EnvironmentFont",
                name: "EnvironmentFont",
                component: () => import('../views/font-page/EnvironmentFont'),
            },
            {
                path: "/FacilityFont",
                name: "FacilityFont",
                component: () => import('../views/font-page/FacilityFont'),
            },
            {
                path: "/GeographyFont",
                name: "GeographyFont",
                component: () => import('../views/font-page/GeographyFont'),
            },
            {
                path: "/PopulationFont",
                name: "PopulationFont",
                component: () => import('../views/font-page/PopulationFont'),
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
                path: "/City",
                name: "City",
                component: () => import('../views/end-page/City'),
            }
            ,
            {
                path: "/CityEvent",
                name: "CityEvent",
                component: () => import('../views/end-page/CityEvent'),
            },
            {
                path: "/Economy",
                name: "Economy",
                component: () => import('../views/end-page/Economy'),
            },
            {
                path: "/Environment",
                name: "Environment",
                component: () => import('../views/end-page/Environment'),
            }
            ,
            {
                path: "/Facility",
                name: "Facility",
                component: () => import('../views/end-page/Facility'),
            }
            ,
            {
                path: "/Geography",
                name: "Geography",
                component: () => import('../views/end-page/Geography'),
            }
            ,
            {
                path: "/Population",
                name: "Population",
                component: () => import('../views/end-page/Population'),
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
