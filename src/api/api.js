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
    administrativePage(data) {
        return request.post('/sys/sysUser/administrative-page', data)
    }
    , auditListPage(data) {
        return request.post('/sys/sysUser/audit-list-page', data)
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
    administrativeUpdateById(data) {
        return request.put('/sys/sysUser/administrativeUpdateById', data)
    },

    allUserByType(type) {
        return request.get('/sys/sysUser/allUserByType/' + type)
    },
    exportInfo(type) {
        return request.get('/sys/sysUser/exportInfo?type=' + type)
    }
}


//机构表管理
export const deptApi = {
    page(data) {
        return request.post('/dept/page', data)
    },
    listAll() {
        return request.get('/dept/listAll')
    },
    getById(id) {
        return request.get('/dept/getById/' + id)
    },
    deptTree() {
        return request.get('/dept/deptTree')
    },
    getCurryDeptUser() {
        return request.get('/dept/getCurryDeptUser')
    },
    add(data) {
        return request.post('/dept/add', data)
    },
    deleteById(id) {
        return request.delete('/dept/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/dept/updateById', data)
    }
}


//绩效表管理
export const performanceApi = {
    page(data) {
        return request.post('/performance/page', data)
    },
    listAll() {
        return request.get('/performance/listAll')
    }, autoPerformance() {
        return request.get('/performance/autoPerformance')
    },
    getById(id) {
        return request.get('/performance/getById/' + id)
    },
    add(data) {
        return request.post('/performance/add', data)
    },
    deleteById(id) {
        return request.delete('/performance/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/performance/updateById', data)
    }
}


//交易记录表管理
export const transactionApi = {
    page(data) {
        return request.post('/transaction/page', data)
    }
    , treasurerPage(data) {
        return request.post('/transaction/treasurerPage', data)
    },
    listAll() {
        return request.get('/transaction/listAll')
    },
    getById(id) {
        return request.get('/transaction/getById/' + id)
    },
    add(data) {
        return request.post('/transaction/add', data)
    },
    deleteById(id) {
        return request.delete('/transaction/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/transaction/updateById', data)
    }
}


//机构收支表管理
export const receiptPaymentApi = {
    page(data) {
        return request.post('/receiptPayment/page', data)
    },
    listAll() {
        return request.get('/receiptPayment/listAll')
    },
    getById(id) {
        return request.get('/receiptPayment/getById/' + id)
    },
    add(data) {
        return request.post('/receiptPayment/add', data)
    },
    deleteById(id) {
        return request.delete('/receiptPayment/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/receiptPayment/updateById', data)
    }
}