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
        path: '/MeanPage',
        name: 'MeanPage',
        component: () => import('../views/mean/MeanPage'),
        children: [
            {
                path: 'ReportForms',
                name: 'ReportForms',
                component: () => import('../views/endpage/ReportForms')
            }
        ]
    },


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






