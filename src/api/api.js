import request from "@/utils/request";

//系统相关
export const login = (data) => {
    return request.post('/system/login', data)
}
export const logout = () => {
    return request.get('/system/logout')
}

export const roles = () => {
    return request.post('/system/roles')
}

export const register = (data) => {
    return request.post('/system/register', data)
}
export const systemCaptcha = () => {
    return request.post('/system/captcha')
}

export const systemCurrentUser = () => {
    return request.get('/system/currentUser')
}

//文件相关
export const systemUploadSecurity = (data) => {
    return request.post('/file/uploadSecurity', data)
}


//用户管理
export const sysUserApi = {
    page(data) {
        return request.post('/sys/sysUser/page', data)
    },
    getById(id) {
        return request.get('/sys/sysUser/getById/' + id)
    },
    add(data) {
        return request.post('/sys/sysUser/add', data)
    },
    deleteById(id) {
        return request.delete('/sys/sysUser/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/sys/sysUser/updateById', data)
    }
}






//商品管理相关
export const goodsApi = {
    page(data) {
        return request.post('/goods/page', data)
    },
    getById(id) {
        return request.get('/goods/getById/' + id)
    },
    updateById(data) {
        return request.put('/goods/updateById', data)
    },
    add(data) {
        return request.post('/goods/add', data)
    },
    hotGoods() {
        return request.get('/goods/hotGoods')
    },
    deleteById(id) {
        return request.delete('/goods/deleteById/' + id)
    },

    searchGoods(data) {
        return request.post('/goods/searchGoods', data)
    }
}


//评论
export const commentAdd = (data) => {
    return request.post('/comment/add', data)
}


//购物车管理
export const goodsCarApi = {
    page(data) {
        return request.post('/goodsCar/page', data)
    },
    getById(id) {
        return request.get('/goodsCar/getById/' + id)
    },
    add(data) {
        return request.post('/goodsCar/add', data)
    },
    deleteById(id) {
        return request.delete('/goodsCar/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/goodsCar/updateById', data)
    },

    //前台
    pageUser(data) {
        return request.post('/goodsCar/pageUser', data)
    },
    submitBefore(data) {
        return request.post('/goodsCar/submitBefore', data)
    },
    submitOrder(data) {
        return request.post('/goodsCar/submitOrder', data)
    },
}



//用户浏览管理
export const browsingHistoryApi={
    page(data){
        return request.post('/browsingHistory/page',data)
    },
    listAll(){
        return request.get('/browsingHistory/listAll')
    },
    getById(id){
        return request.get('/browsingHistory/getById/'+id)
    },
    add(data){
        return request.post('/browsingHistory/add',data)
    },
    deleteById(id){
        return request.delete('/browsingHistory/deleteById/'+id)
    },
    updateById(data){
        return request.put('/browsingHistory/updateById',data)
    }
}


//房源表管理
export const hoursApi={
    page(data){
        return request.post('/hours/page',data)
    },
    listAll(){
        return request.get('/hours/listAll')
    },
    hotGoods(){
        return request.get('/hours/hotGoods')
    },
    getById(id){
        return request.get('/hours/getById/'+id)
    },
    add(data){
        return request.post('/hours/add',data)
    },
    deleteById(id){
        return request.delete('/hours/deleteById/'+id)
    },
    updateById(data){
        return request.put('/hours/updateById',data)
    }
}



//聊天消息管理
export const messageApi={
    page(data){
        return request.post('/message/page',data)
    },
    listAll(){
        return request.get('/message/listAll')
    },
    getById(id){
        return request.get('/message/getById/'+id)
    },
    add(data){
        return request.post('/message/add',data)
    },
    deleteById(id){
        return request.delete('/message/deleteById/'+id)
    },
    updateById(data){
        return request.put('/message/updateById',data)
    }
}


//聊天会话管理
export const onlineInfoApi={
    page(data){
        return request.post('/onlineInfo/page',data)
    },
    listAll(){
        return request.get('/onlineInfo/listAll')
    },
    getById(id){
        return request.get('/onlineInfo/getById/'+id)
    },
    add(data){
        return request.post('/onlineInfo/add',data)
    },
    deleteById(id){
        return request.delete('/onlineInfo/deleteById/'+id)
    },
    updateById(data){
        return request.put('/onlineInfo/updateById',data)
    }
}