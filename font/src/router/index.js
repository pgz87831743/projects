import {createRouter, createWebHistory} from 'vue-router'
import {userOption} from "@/store/storage";

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/user/LoginPage')
    },
    {
        path: '/',
        name: 'login',
        component: () => import('../views/user/LoginPage')
    },
    {
        path: '/FontPage',
        name: 'FontPage',
        component: () => import('../views/mean/FontPage'),
        children: [
            {
                path: 'liaotTian',
                name: 'liaotTian',
                component: () => import('../views/fontpage/liaotTian')
            },
            {
                path: 'ShouYe',
                name: 'ShouYe',
                component: () => import('../views/fontpage/ShouYe')
            }
            ]
    }
    ,
    {
        path: '/MeanPage',
        name: 'MeanPage',
        component: () => import('../views/mean/MeanPage'),
        children: [
            {
                path: 'ConcomitantMotion',
                name: 'ConcomitantMotion',
                component: () => import('../views/endpage/ConcomitantMotion')
            },{
                path: 'MessageManagement',
                name: 'MessageManagement',
                component: () => import('../views/endpage/MessageManagement')
            },{
                path: 'NewsManagement',
                name: 'NewsManagement',
                component: () => import('../views/endpage/NewsManagement')
            },{
                path: 'SportsClocking',
                name: 'SportsClocking',
                component: () => import('../views/endpage/SportsClocking')
            },
            {
                path: 'Zhgl',
                name: 'Zhgl',
                component: () => import('../views/endpage/Zhgl')
            }
        ]
    },
    {
        path: '/NewsInfo',
        name: '/NewsInfo',
        component: () => import('../views/fontpage/NewsInfo')
    }

]



const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


router.beforeEach((to, from, next) => {
    if (!userOption().isAuth()) {
        if (to.fullPath === "/login" || to.fullPath === "/" || to.fullPath === "/register") {
            next()
        } else {
            next("/")
        }
    } else {
        next();
    }

})

export default router






