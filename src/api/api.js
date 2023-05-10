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






//科普内容管理
export const scienceApi={
    page(data){
        return request.post('/science/page',data)
    },
    listAll(){
        return request.get('/science/listAll')
    },
    getById(id){
        return request.get('/science/getById/'+id)
    },
    add(data){
        return request.post('/science/add',data)
    },
    deleteById(id){
        return request.delete('/science/deleteById/'+id)
    },
    updateById(data){
        return request.put('/science/updateById',data)
    }
}




//舌诊记录表管理
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
    onDiagnosis(url){
        return request.get('/record/onDiagnosis?url='+url)
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


//中药表管理
export const medicineApi={
    page(data){
        return request.post('/medicine/page',data)
    },
    listAll(searchValue){
        return request.get('/medicine/listAll?searchValue='+searchValue)
    },
    getById(id){
        return request.get('/medicine/getById/'+id)
    },
    add(data){
        return request.post('/medicine/add',data)
    },
    deleteById(id){
        return request.delete('/medicine/deleteById/'+id)
    },
    updateById(data){
        return request.put('/medicine/updateById',data)
    }
}