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
    return request.post('/file/uploadSecurity',data)
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


//文件发布相关
export const resourcesApi = {
    page(data) {
        return request.post('/resources/page', data)
    },
    getById(id) {
        return request.get('/resources/getById/' + id)
    },
    listAll() {
        return request.get('/resources/listAll')
    },
    add(data) {
        return request.post('/resources/add', data)
    },
    hotResource() {
        return request.get('/resources/hotResource')
    },
    deleteById(id) {
        return request.delete('/resources/deleteById/' + id)
    },
    approved(data) {
        return request.post('/resources/approved', data)
    },
    searchResource(data){
        return request.post('/resources/searchResource', data)
    }
}


//评论
export const commentAdd = (data) => {
    return request.post('/comment/add', data)
}



//举报相关接口
export const reportApi = {
    page(data) {
        return request.post('/report/page', data)
    },

    add(data) {
        return request.post('/report/add', data)
    },

    deleteResource(data) {
        return request.delete('/report/deleteResource', {
            data:data
        })
    },


}

//敏感词
export const sensitiveWordsApi = {
    page(data) {
        return request.post('/sensitiveWords/page', data)
    },
    getById(id) {
        return request.get('/sensitiveWords/getById/' + id)
    },
    add(data) {
        return request.post('/sensitiveWords/add', data)
    },
    deleteById(id) {
        return request.delete('/sensitiveWords/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/sensitiveWords/updateById', data)
    }
}


//日志管理
export const logApi = {
    page(data) {
        return request.post('/log/page', data)
    },
    getById(id) {
        return request.get('/log/getById/' + id)
    },
    deleteById(id) {
        return request.delete('/log/deleteById/' + id)
    }
}





