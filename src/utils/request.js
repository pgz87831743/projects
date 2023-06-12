import axios from "axios";
import { ElNotification } from 'element-plus'
import {getItem} from "@/utils/storage";
import router from "@/router";
// import CryptoJS from "crypto-js";
// import {getItem} from './storage'

const request = axios.create({
    baseURL: '/api',
})





// const encryptedData = "8KF+NrcRSoWChM97Z92fByTRtTyKkrT1maS+5/welVvs8pc0eAJCsraPUO4VoqFJiKSkpfuHU82UPNunpPxuTy4daKPrAVqcUbEZv1FTO80sa+QRxyGj6vzyD5Gc5L0781ONdgesZ/Z9PA77g2XcYhFBnqKpGjrfjQCKcpglwqY6KKdNyTb/LhOe6dxMqIFo8LyBuwu8ccKLGyG945W4X2Y0PI53UyZP4lg9r4rAINpYbzii/dIWqRTaiZy7nZYM7iJ+mEurdDtiBLHB9735pnB/q0varjUESDwcCvlE4RIehbK/F5BJ1GNk0vBH1QhMQgiD0FCE67Mj6Q9DkKi8hAj37D/BE5ZmGkIlIL1EFtH7hyQtpXDxvgEgTYSMbnXllVCiPkhX3gll82eK5Yd+h8Iej0l6pReMKIzAW6XGHLNhWM+WITLmZF1lIIiNx19DlULmQ4R4IdvxqNc0xwEVlU31JhjFI0/BfUcvva0lOJs=";
// const key = "Et7ssWyHIHxy7Yby";
//
//
// const decryptedData = CryptoJS.AES.decrypt(encryptedData, key, { mode: CryptoJS.mode.ECB }).toString(CryptoJS.enc.Utf8);
// const jsonData = JSON.parse(decryptedData);
// console.log(jsonData);



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
                duration:800
            })
        }else if(code>200){
            ElNotification({
                title: 'Error',
                message: response.data.msg,
                type: 'error',
                duration:800
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
