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
    listAll() {
        return request.get('/sys/sysUser/listAll')
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


//活动管理
export const activityApi = {
    page(data) {
        return request.post('/activity/page', data)
    },
    listAll() {
        return request.get('/activity/listAll')
    },
    getById(id) {
        return request.get('/activity/getById/' + id)
    },
    add(data) {
        return request.post('/activity/add', data)
    },
    deleteById(id) {
        return request.delete('/activity/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/activity/updateById', data)
    }
}


//场馆管理
export const stadiumApi = {
    page(data) {
        return request.post('/stadium/page', data)
    },
    listAll() {
        return request.get('/stadium/listAll')
    },
    getById(id) {
        return request.get('/stadium/getById/' + id)
    },
    add(data) {
        return request.post('/stadium/add', data)
    },
    deleteById(id) {
        return request.delete('/stadium/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/stadium/updateById', data)
    }
}


//时间表管理
export const timetableApi = {
    page(data) {
        return request.post('/timetable/page', data)
    },
    listAll() {
        return request.get('/timetable/listAll')
    },
    getById(id) {
        return request.get('/timetable/getById/' + id)
    },
    tableByActivityId(activityId) {
        return request.get('/timetable/tableByActivityId/' + activityId)
    },
    add(data) {
        return request.post('/timetable/add', data)
    },
    deleteById(id) {
        return request.delete('/timetable/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/timetable/updateById', data)
    }
}

//预约表管理
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

//订单表管理
export const orderApi = {
    page(data) {
        return request.post('/order/page', data)
    },
    listAll() {
        return request.get('/order/listAll')
    },
    confirmOrder(id){
        return request.get('/order/confirmOrder/' + id)
    },
    getById(id) {
        return request.get('/order/getById/' + id)
    },
    staticsPrice() {
        return request.get('/order/staticsPrice')
    },
    staticsStadium() {
        return request.get('/order/staticsStadium')
    },
    sendPdfToEmail(id) {
        return request.get('/order/sendPdfToEmail/'+id)
    },
    add(data) {
        return request.post('/order/add', data)
    },
    deleteById(id) {
        return request.delete('/order/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/order/updateById', data)
    }
}


//会员表管理
export const membershipApi = {
    page(data) {
        return request.post('/membership/page', data)
    },
    listAll() {
        return request.get('/membership/listAll')
    },
    getById(id) {
        return request.get('/membership/getById/' + id)
    },
    getMemberByUserName() {
        return request.get('/membership/getMemberByUserName')
    },
    add(data) {
        return request.post('/membership/add', data)
    },
    deleteById(id) {
        return request.delete('/membership/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/membership/updateById', data)
    }
}