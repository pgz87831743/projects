import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import {ElMessage} from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import {userOption} from "@/store/storage";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

axios.defaults.baseURL = "http://localhost:9001/"

axios.interceptors.response.use(response => {
    if (response.data.showMsg){
        ElMessage({
            message: response.data.msg,
            showClose: true,
            type: 'info'
        });
    }


    // console.log(response.data.expirationTime);
    // console.log(response.data.expirationTime-Date.now());
    // if (response.data.expirationTime-Date.now()<1800000){
    //     axios.post("/user/refreshToken")
    //         .then(response=>{
    //             console.log(response.data)
    //
    //             return response;
    //         })
    // }



    return response;
})

axios.interceptors.request.use(request => {

    if (userOption().getUser()!=null){
        request.headers.token=userOption().getUser().data?userOption().getUser().data.token:'';
    }



    return request;
})




const app = createApp(App)
app.config.globalProperties.$http = axios
app.use(store)
app.use(store)
app.use(router)
app.use(ElementPlus,{
    locale: zhCn,
})
app.mount('#app')



