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
                path: 'Mrjl',
                name: 'Mrjl',
                component: () => import('../views/page/Mrjl')
            },
            {
                path: 'Cwda',
                name: 'Cwda',
                component: () => import('../views/page/Cwda')
            }
            ,
            {
                path: 'Zhgl',
                name: 'Zhgl',
                component: () => import('../views/page/Zhgl')
            }
            ,
            {
                path: 'Syjq',
                name: 'Syjq',
                component: () => import('../views/page/Syjq')
            }
            ,
            {
                path: 'Jkjc',
                name: 'Jkjc',
                component: () => import('../views/page/Jkjc')
            },
            {
                path: 'UserManage',
                name: 'UserManage',
                component: () => import('../views/user/UserManage')
            },
            {
                path: 'RoleManage',
                name: 'RoleManage',
                component: () => import('../views/user/RoleManage')
            },
            {
                path: 'AuthorityManage',
                name: 'AuthorityManage',
                component: () => import('../views/user/AuthorityManage')
            }
        ]
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






