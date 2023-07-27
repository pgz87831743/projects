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



//反馈表管理
export const feedbackApi={
    page(data){
        return request.post('/feedback/page',data)
    },
    listAll(){
        return request.get('/feedback/listAll')
    },
    getById(id){
        return request.get('/feedback/getById/'+id)
    },
    add(data){
        return request.post('/feedback/add',data)
    },
    deleteById(id){
        return request.delete('/feedback/deleteById/'+id)
    },
    updateById(data){
        return request.put('/feedback/updateById',data)
    }
}



//历史车位租赁记录表管理
export const historyApi={
    page(data){
        return request.post('/history/page',data)
    },
    listAll(){
        return request.get('/history/listAll')
    },
    getById(id){
        return request.get('/history/getById/'+id)
    },
    zuche(id){
        return request.get('/history/zuche/'+id)
    },
    add(data){
        return request.post('/history/add',data)
    },
    deleteById(id){
        return request.delete('/history/deleteById/'+id)
    },
    updateById(data){
        return request.put('/history/updateById',data)
    }
}

//车位表管理
export const parkingPlaceApi={
    page(data){
        return request.post('/parkingPlace/page',data)
    },
    listAll(){
        return request.get('/parkingPlace/listAll')
    },
    getById(id){
        return request.get('/parkingPlace/getById/'+id)
    },
    add(data){
        return request.post('/parkingPlace/add',data)
    },
    deleteById(id){
        return request.delete('/parkingPlace/deleteById/'+id)
    },

    tuizu(id){
        return request.delete('/parkingPlace/tuizu/'+id)
    },

    updateById(data){
        return request.put('/parkingPlace/updateById',data)
    }
}