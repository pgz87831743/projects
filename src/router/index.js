import {createRouter, createWebHistory} from 'vue-router'


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
    }

]



const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})



export default router






