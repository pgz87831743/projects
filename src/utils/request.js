import axios from "axios";
import {ElNotification} from 'element-plus'
import {getItem} from "@/utils/storage";
import router from "@/router";
import CryptoJS from "crypto-js";
// import {getItem} from './storage'

const request = axios.create({
    baseURL: '/api',
})


const pwd = 'Et7ssWyHIHxy7Yby'

//加密
export function encrypt(text) {
    return CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(pwd), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString()
}


//解密
export function decrypt(text) {
    return  CryptoJS.AES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(text)
    }, CryptoJS.enc.Utf8.parse(pwd), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8)
}





// 添加响应拦截器
request.interceptors.response.use(
    function (response) {
        // 对响应数据进行操作
        let code = response.data.code
        let showMsg = response.data.showMsg


        if (response.data.encryption){
            response.data.data=JSON.parse( decrypt(response.data.data))
            console.log( response.data.data);
        }

        if (code === 200 && showMsg) {
            ElNotification({
                title: 'Success',
                message: response.data.msg,
                type: 'success',
                duration: 800
            })
        } else if (code > 200) {
            ElNotification({
                title: 'Error',
                message: response.data.msg,
                type: 'error',
                duration: 800
            })
        }
        if (response.request.responseURL.endsWith('/system/login')) {
            router.push({path: '/login'})
        }

        return response
    },
    function (error) {
        // 对响应错误进行操作
        return Promise.reject(error);
    }
);
request.interceptors.request.use((config) => {
    if (getItem('TOKEN_INFO_KEY') != null) {
        config.headers.Authorization = getItem('TOKEN_INFO_KEY').token
    }
    return config
}, (error) => {

    return Promise.reject(error)
})


export default request;
