import request from "@/utils/request";

//系统相关
export const login = (data) => {
    return request.post('/system/login', data)
}
export const logout = () => {
    return request.get('/system/logout')
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

//记录表管理
export const recordApi={
    page(data){
        return request.post('/record/page',data)
    },
    listAll(){
        return request.get('/record/listAll')
    },
    getById(id){
        return request.get('/record/getById/'+id)
    },
    add(data){
        return request.post('/record/add',data)
    },
    deleteById(id){
        return request.delete('/record/deleteById/'+id)
    },
    updateById(data){
        return request.put('/record/updateById',data)
    }
}




