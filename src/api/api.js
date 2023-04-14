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


//预约挂号管理
export const appointmentApi = {
    page(data) {
        return request.post('/appointment/page', data)
    },
    listAll() {
        return request.get('/appointment/listAll')
    },
    getById(id) {
        return request.get('/appointment/getById/' + id)
    },
    add(data) {
        return request.post('/appointment/add', data)
    },
    deleteById(id) {
        return request.delete('/appointment/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/appointment/updateById', data)
    }
}


//药店管理
export const drugstoreApi = {
    page(data) {
        return request.post('/drugstore/page', data)
    },
    listAll() {
        return request.get('/drugstore/listAll')
    },
    getById(id) {
        return request.get('/drugstore/getById/' + id)
    },
    add(data) {
        return request.post('/drugstore/add', data)
    },
    deleteById(id) {
        return request.delete('/drugstore/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/drugstore/updateById', data)
    }
}


//医疗机构管理
export const medicalApi = {
    page(data) {
        return request.post('/medical/page', data)
    },
    listAll() {
        return request.get('/medical/listAll')
    },
    getById(id) {
        return request.get('/medical/getById/' + id)
    },
    add(data) {
        return request.post('/medical/add', data)
    },
    deleteById(id) {
        return request.delete('/medical/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/medical/updateById', data)
    }
}


//科室管理
export const officesApi = {
    page(data) {
        return request.post('/offices/page', data)
    },
    listAll() {
        return request.get('/offices/listAll')
    },
    getById(id) {
        return request.get('/offices/getById/' + id)
    },
    add(data) {
        return request.post('/offices/add', data)
    },
    deleteById(id) {
        return request.delete('/offices/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/offices/updateById', data)
    }
}


//就诊管理
export const visitApi = {
    page(data) {
        return request.post('/visit/page', data)
    },
    listAll() {
        return request.get('/visit/listAll')
    },
    getById(id) {
        return request.get('/visit/getById/' + id)
    },
    add(data) {
        return request.post('/visit/add', data)
    },
    deleteById(id) {
        return request.delete('/visit/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/visit/updateById', data)
    }
}


//排班管理
export const workforceApi = {
    page(data) {
        return request.post('/workforce/page', data)
    },
    listAll() {
        return request.get('/workforce/listAll')
    },
    getById(id) {
        return request.get('/workforce/getById/' + id)
    },
    add(data) {
        return request.post('/workforce/add', data)
    },
    deleteById(id) {
        return request.delete('/workforce/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/workforce/updateById', data)
    }
}
