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

//教师体检记录管理
export const healthCheckupApi = {
    page(data) {
        return request.post('/healthCheckup/page', data)
    },

    listAll() {
        return request.get('/healthCheckup/listAll')
    },
    getById(id) {
        return request.get('/healthCheckup/getById/' + id)
    },
    add(data) {
        return request.post('/healthCheckup/add', data)
    },
    deleteById(id) {
        return request.delete('/healthCheckup/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/healthCheckup/updateById', data)
    }
}


//教师健康日志管理
export const healthLogsApi = {
    page(data) {
        return request.post('/healthLogs/page', data)
    },
    getById(id) {
        return request.get('/healthLogs/getById/' + id)
    },
    listAll() {
        return request.get('/healthLogs/listAll')
    }
    , listAllUser() {
        return request.get('/healthLogs/listAllUser')
    },
    searchOne(localDate) {
        return request.get('/healthLogs/searchOne/?localDate=' + localDate)
    },
    add(data) {
        return request.post('/healthLogs/add', data)
    },
    deleteById(id) {
        return request.delete('/healthLogs/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/healthLogs/updateById', data)
    }
}


//食物管理管理
export const foodsApi = {
    page(data) {
        return request.post('/foods/page', data)
    },
    listAll() {
        return request.get('/foods/listAll')
    },
    getById(id) {
        return request.get('/foods/getById/' + id)
    },
    add(data) {
        return request.post('/foods/add', data)
    },
    power(data) {
        return request.post('/foods/power', data)
    },
    deleteById(id) {
        return request.delete('/foods/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/foods/updateById', data)
    }
}

export const statics = () => {
    return request.get('/healthCheckup/statics')
}