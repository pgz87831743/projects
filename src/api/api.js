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
    driverPage(data) {
        return request.post('/sys/sysUser/driverPage', data)
    },
    driverList() {
        return request.post('/sys/sysUser/driverList')
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



//车辆信息表管理
export const carApi={
    page(data){
        return request.post('/car/page',data)
    },
    listAll(){
        return request.get('/car/listAll')
    },
    getById(id){
        return request.get('/car/getById/'+id)
    },
    add(data){
        return request.post('/car/add',data)
    },
    deleteById(id){
        return request.delete('/car/deleteById/'+id)
    },
    updateById(data){
        return request.put('/car/updateById',data)
    }
}


//用车流程管理
export const carFlowPathApi={
    page(data){
        return request.post('/carFlowPath/page',data)
    },
    listAll(){
        return request.get('/carFlowPath/listAll')
    },
    getById(id){
        return request.get('/carFlowPath/getById/'+id)
    },
    add(data){
        return request.post('/carFlowPath/add',data)
    },
    deleteById(id){
        return request.delete('/carFlowPath/deleteById/'+id)
    },
    updateById(data){
        return request.put('/carFlowPath/updateById',data)
    }
}



//车辆维修管理
export const carMaintenanceApi={
    page(data){
        return request.post('/carMaintenance/page',data)
    },
    listAll(){
        return request.get('/carMaintenance/listAll')
    },
    getById(id){
        return request.get('/carMaintenance/getById/'+id)
    },
    add(data){
        return request.post('/carMaintenance/add',data)
    },
    deleteById(id){
        return request.delete('/carMaintenance/deleteById/'+id)
    },
    updateById(data){
        return request.put('/carMaintenance/updateById',data)
    }
}



//车辆使用记录表管理
export const carRecordApi={
    page(data){
        return request.post('/carRecord/page',data)
    },
    listAll(){
        return request.get('/carRecord/listAll')
    },
    getById(id){
        return request.get('/carRecord/getById/'+id)
    },
    add(data){
        return request.post('/carRecord/add',data)
    },
    deleteById(id){
        return request.delete('/carRecord/deleteById/'+id)
    },
    updateById(data){
        return request.put('/carRecord/updateById',data)
    }
}


//保险公司表管理
export const insureApi={
    page(data){
        return request.post('/insure/page',data)
    },
    listAll(){
        return request.get('/insure/listAll')
    },
    getById(id){
        return request.get('/insure/getById/'+id)
    },
    add(data){
        return request.post('/insure/add',data)
    },
    deleteById(id){
        return request.delete('/insure/deleteById/'+id)
    },
    updateById(data){
        return request.put('/insure/updateById',data)
    }
}



//险种管理
export const insureTypeApi={
    page(data){
        return request.post('/insureType/page',data)
    },
    listAll(){
        return request.get('/insureType/listAll')
    },
    listAllByInsureId(id){
        return request.get('/insureType/listAllByInsureId?id='+id)
    },
    getById(id){
        return request.get('/insureType/getById/'+id)
    },
    add(data){
        return request.post('/insureType/add',data)
    },
    deleteById(id){
        return request.delete('/insureType/deleteById/'+id)
    },
    updateById(data){
        return request.put('/insureType/updateById',data)
    }
}

//用车申请管理
export const carApplyForApi={
    page(data){
        return request.post('/carApplyFor/page',data)
    },
    listAll(){
        return request.get('/carApplyFor/listAll')
    },
    getById(id){
        return request.get('/carApplyFor/getById/'+id)
    },
    add(data){
        return request.post('/carApplyFor/add',data)
    },
    deleteById(id){
        return request.delete('/carApplyFor/deleteById/'+id)
    },
    updateById(data){
        return request.put('/carApplyFor/updateById',data)
    }
}

//车辆事故登记管理
export const carAccidentApi={
    page(data){
        return request.post('/carAccident/page',data)
    },
    listAll(){
        return request.get('/carAccident/listAll')
    },
    getById(id){
        return request.get('/carAccident/getById/'+id)
    },
    add(data){
        return request.post('/carAccident/add',data)
    },
    deleteById(id){
        return request.delete('/carAccident/deleteById/'+id)
    },
    updateById(data){
        return request.put('/carAccident/updateById',data)
    }
}