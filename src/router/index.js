import {createRouter, createWebHistory} from 'vue-router'
import store from "@/store/index"

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
    ,
    {
        path: '/PeiXunList',
        name: 'PeiXunList',
        component: () => import('../views/table/PeiXunList')
    }
    ,
    {
        path: '/PeiXunData',
        name: 'PeiXunData',
        component: () => import('../views/table/PeiXunData')
    }
    ,
    {
        path: '/TabsPage',
        name: 'TabsPage',
        component: () => import('../views/table/TabsPage')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


router.beforeEach((to, from, next) => {

    console.log(store.getters['isAuth'])
    if ( !store.getters['isAuth']) {
        if (to.fullPath==="/login" || to.fullPath==="/"||to.fullPath==="/register") {

            next()
        }else{
            next("/")
        }
    }else{
      next();
    }



    // if(to.meta.isAuth){     //判断是否需要鉴权
    //   if(localStorage.getItem('name') === '张三'){
    //     next();
    //   }else{
    //     alert('不好意思，姓名不对，没有权限');
    //   }
    // }else{
    //   next()
    // }
})

export default router
