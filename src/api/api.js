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


//数据表管理
export const excelDataApi={
    page(data){
        return request.post('/excelData/page',data)
    },
    listAll(){
        return request.get('/excelData/listAll')
    },
    getById(id){
        return request.get('/excelData/getById/'+id)
    },
    add(data){
        return request.post('/excelData/add',data)
    },
    deleteById(id){
        return request.delete('/excelData/deleteById/'+id)
    },
    updateById(data){
        return request.put('/excelData/updateById',data)
    }
}
