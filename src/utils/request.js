import axios from "axios";
import { ElNotification } from 'element-plus'
import {getItem} from "@/utils/storage";
import router from "@/router";

const request = axios.create({
    baseURL: '/api',
})



// 添加响应拦截器
request.interceptors.response.use(
    function (response) {
        // 对响应数据进行操作
        let code=response.data.code
        let showMsg=response.data.showMsg
        if (code===200&&showMsg){
            ElNotification({
                title: 'Success',
                message: response.data.msg,
                type: 'success',
                duration:1000
            })
        }else if(code>200){
            ElNotification({
                title: 'Error',
                message: response.data.msg,
                type: 'error',
                duration:1000
            })
        }
        if (response.request.responseURL.endsWith('/system/login')){
            router.push({path:'/login'})
        }

        return response
    },
    function (error) {
        // 对响应错误进行操作
        return Promise.reject(error);
    }
);
request.interceptors.request.use((config)=>{
    if (getItem('TOKEN_INFO_KEY')!=null){
        config.headers.Authorization=getItem('TOKEN_INFO_KEY').token
    }
    return config
},(error)=>{

    return Promise.reject(error)
})



export default request;
