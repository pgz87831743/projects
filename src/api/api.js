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



//检查项目表管理
export const inspectionApi={
    page(data){
        return request.post('/inspection/page',data)
    },
    listAll(){
        return request.get('/inspection/listAll')
    },
    getById(id){
        return request.get('/inspection/getById/'+id)
    },
    add(data){
        return request.post('/inspection/add',data)
    },
    deleteById(id){
        return request.delete('/inspection/deleteById/'+id)
    },
    updateById(data){
        return request.put('/inspection/updateById',data)
    }
}


//预约表管理
export const reservationApi={
    page(data){
        return request.post('/reservation/page',data)
    },
    listAll(){
        return request.get('/reservation/listAll')
    },
    getById(id){
        return request.get('/reservation/getById/'+id)
    },
    add(data){
        return request.post('/reservation/add',data)
    },
    deleteById(id){
        return request.delete('/reservation/deleteById/'+id)
    },
    updateById(data){
        return request.put('/reservation/updateById',data)
    }
}