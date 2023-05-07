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


//导航菜单管理
export const meansApi={
    page(data){
        return request.post('/means/page',data)
    },
    listAll(){
        return request.get('/means/listAll')
    },
    listAllByPid(pid){
        return request.get('/means/listAllByPid/'+pid)
    },
    getById(id){
        return request.get('/means/getById/'+id)
    },
    add(data){
        return request.post('/means/add',data)
    },
    deleteById(id){
        return request.delete('/means/deleteById/'+id)
    },
    updateById(data){
        return request.put('/means/updateById',data)
    }
}


//医生信息管理管理
export const doctorInfoApi={
    page(data){
        return request.post('/doctorInfo/page',data)
    },
    listAll(){
        return request.get('/doctorInfo/listAll')
    },
    listAllByMeansId(meanId){
        return request.get('/doctorInfo/listAllByMeansId/'+meanId)
    },
    getById(id){
        return request.get('/doctorInfo/getById/'+id)
    },
    add(data){
        return request.post('/doctorInfo/add',data)
    },
    deleteById(id){
        return request.delete('/doctorInfo/deleteById/'+id)
    },
    updateById(data){
        return request.put('/doctorInfo/updateById',data)
    }
}
