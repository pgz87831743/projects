import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import './styles/element-variables.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as echarts from 'echarts'
import {authShow} from "@/utils/authutil";
import request from "@/utils/request";

const app=createApp(App);
app.use(ElementPlus, {
    locale: zhCn,
})
app.config.globalProperties.$auth =authShow;
app.config.globalProperties.$request =request;
app.config.globalProperties.$echarts = echarts;
app.use(store)
app.use(router)
app.mount('#app')

