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
    doctorList() {
        return request.post('/sys/sysUser/doctorList')
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

    allUserByType(type) {
        return request.get('/sys/sysUser/allUserByType/' + type)
    }
}


//新闻管理管理
export const newsApi = {
    page(data) {
        return request.post('/news/page', data)
    },
    getById(id) {
        return request.get('/news/getById/' + id)
    },
    listAll() {
        return request.get('/news/listAll/')
    },
    add(data) {
        return request.post('/news/add', data)
    },
    deleteById(id) {
        return request.delete('/news/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/news/updateById', data)
    }
}




