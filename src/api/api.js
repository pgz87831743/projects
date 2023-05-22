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


//用户管理
export const sysUserApi = {

    getById(id) {
        return request.get('/sys/sysUser/getById/' + id)
    },
    add(data) {
        return request.post('/sys/sysUser/add', data)
    },
    updateById(data) {
        return request.put('/sys/sysUser/updateById', data)
    },
}


//人口管理
export const populaApi={
    page(data){
        return request.post('/popula/page',data)
    },
    getById(id){
        return request.get('/popula/getById/'+id)
    },
    add(data){
        return request.post('/popula/add',data)
    },
    deleteById(id){
        return request.delete('/popula/deleteById/'+id)
    },
    updateById(data){
        return request.put('/popula/updateById',data)
    },
    prediction(data){
        //人口预测
        return request.post('/popula/prediction',data)
    },
    visualization(data){
        //可视化
        return request.post('/popula/visualization',data)
    },
    hotMap(year){
        //热力图
        return request.get('/popula/hotMap/'+year)
    },
}