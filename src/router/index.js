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
        path: "/ProductDetail",
        name: "ProductDetail",
        component: () => import('../views/font-page/ProductDetail'),
    }, {
        path: "/OrderDetail",
        name: "OrderDetail",
        component: () => import('../views/font-page/OrderDetail'),
    }, {
        path: "/PetDetail",
        name: "PetDetail",
        component: () => import('../views/font-page/PetDetail'),
    },
    {
        path: "/NewsInfo",
        name: "NewsInfo",
        component: () => import('../views/font-page/NewsInfo'),
    },


    {
        path: '/FontPage',
        component: () => import('../views/layout/FontPage'),
        children: [
            {
                path: "/IndexPage",
                name: "IndexPage",
                component: () => import('../views/font-page/IndexPage'),
            }, {
                path: "/MyAdeptList",
                name: "MyAdeptList",
                component: () => import('../views/font-page/MyAdeptList'),
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
                path: "/PersonalCenter",
                name: "PersonalCenter",
                component: () => import('../views/font-page/PersonalCenter'),
            },
            {
                path: "/ProductDetail",
                name: "ProductDetail",
                component: () => import('../views/font-page/ProductDetail'),
            },
            {
                path: "/Teaching",
                name: "Teaching",
                component: () => import('../views/font-page/Teaching'),
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
            }, {
                path: "/GoodsManagement",
                name: "GoodsManagement",
                component: () => import('../views/end-page/GoodsManagement'),
            }, {
                path: "/Pet",
                name: "Pet",
                component: () => import('../views/end-page/Pet'),
            }
            , {
                path: "/Adopt",
                name: "Adopt",
                component: () => import('../views/end-page/Adopt'),
            }
            , {
                path: "/News",
                name: "News",
                component: () => import('../views/end-page/News'),
            }
            , {
                path: "/AdoptExamine",
                name: "AdoptExamine",
                component: () => import('../views/end-page/AdoptExamine'),
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
