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





//药品求助管理
export const drugHelpApi={
    page(data){
        return request.post('/drugHelp/page',data)
    },
    getById(id){
        return request.get('/drugHelp/getById/'+id)
    },
    add(data){
        return request.post('/drugHelp/add',data)
    },
    deleteById(id){
        return request.delete('/drugHelp/deleteById/'+id)
    },
    updateById(data){
        return request.put('/drugHelp/updateById',data)
    }
}

//交流论坛管理
export const exchangeApi={
    page(data){
        return request.post('/exchange/page',data)
    },
    getById(id){
        return request.get('/exchange/getById/'+id)
    },
    add(data){
        return request.post('/exchange/add',data)
    },
    deleteById(id){
        return request.delete('/exchange/deleteById/'+id)
    },
    updateById(data){
        return request.put('/exchange/updateById',data)
    }
}


//物资管理
export const goodsApi={
    page(data){
        return request.post('/goods/page',data)
    },
    getById(id){
        return request.get('/goods/getById/'+id)
    },
    add(data){
        return request.post('/goods/add',data)
    },
    deleteById(id){
        return request.delete('/goods/deleteById/'+id)
    },
    updateById(data){
        return request.put('/goods/updateById',data)
    }
}



//有偿求助管理
export const paidHelpApi={
    page(data){
        return request.post('/paidHelp/page',data)
    },
    getById(id){
        return request.get('/paidHelp/getById/'+id)
    },
    add(data){
        return request.post('/paidHelp/add',data)
    },
    deleteById(id){
        return request.delete('/paidHelp/deleteById/'+id)
    },
    updateById(data){
        return request.put('/paidHelp/updateById',data)
    }
}