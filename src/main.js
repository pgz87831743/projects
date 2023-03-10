import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import './styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import {authShow} from "@/utils/authutil";
import request from "@/utils/request";

const app=createApp(App);
app.config.globalProperties['$auth'] =authShow;
app.config.globalProperties['$request'] =request;
app.use(store)
app.use(ElementPlus)
app.use(Vant)
app.use(router)
app.mount('#app')

