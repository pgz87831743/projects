import request from "@/utils/request";

//系统相关
export const login = (data) => {
    return request.post('/system/login', data)
}
export const logout = () => {
    return request.get('/system/logout')
}

// export const roles = () => {
//     return request.post('/system/roles')
// }
//
// export const register = (data) => {
//     return request.post('/system/register', data)
// }
// export const systemCaptcha = () => {
//     return request.post('/system/captcha')
// }

export const systemCurrentUser = () => {
    return request.get('/system/currentUser')
}

// //文件相关
// export const systemUploadSecurity = (data) => {
//     return request.post('/file/uploadSecurity', data)
// }


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
    },
}




//按键记录表管理
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

//按键记录表管理
export const deptApi={
    page(data){
        return request.post('/dept/page',data)
    },
    listAll(){
        return request.get('/dept/listAll')
    },
    getById(id){
        return request.get('/dept/getById/'+id)
    },
    add(data){
        return request.post('/dept/add',data)
    },
    deleteById(id){
        return request.delete('/dept/deleteById/'+id)
    },
    updateById(data){
        return request.put('/dept/updateById',data)
    }
}