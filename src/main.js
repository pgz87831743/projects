import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import {ElMessage} from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:9001/"

axios.interceptors.response.use(response => {
    if (response.data.showMsg){
        ElMessage({
            message: response.data.msg,
            showClose: true,
            type: 'info'
        });
    }
    return response;
})

axios.interceptors.request.use(request => {
    request.headers.token=store.getters.token;
    return request;
})




const app = createApp(App)
app.config.globalProperties.$http = axios
app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')



