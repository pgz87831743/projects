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






//城市基本信息管理
export const cityApi={
    page(data){
        return request.post('/city/page',data)
    },
    listAll(){
        return request.get('/city/listAll')
    },
    getById(id){
        return request.get('/city/getById/'+id)
    },
    add(data){
        return request.post('/city/add',data)
    },
    deleteById(id){
        return request.delete('/city/deleteById/'+id)
    },
    updateById(data){
        return request.put('/city/updateById',data)
    }
}

//城市事件表管理
export const cityEventApi={
    page(data){
        return request.post('/cityEvent/page',data)
    },
    listAll(){
        return request.get('/cityEvent/listAll')
    },
    listAllSearch(search){
        return request.get(`/cityEvent/listAllSearch?search=${search}`)
    },
    getById(id){
        return request.get('/cityEvent/getById/'+id)
    },
    add(data){
        return request.post('/cityEvent/add',data)
    },
    deleteById(id){
        return request.delete('/cityEvent/deleteById/'+id)
    },
    updateById(data){
        return request.put('/cityEvent/updateById',data)
    }
}

//城市经济数据表管理
export const economyApi={
    page(data){
        return request.post('/economy/page',data)
    },
    listAll(){
        return request.get('/economy/listAll')
    },
    getById(id){
        return request.get('/economy/getById/'+id)
    },
    add(data){
        return request.post('/economy/add',data)
    },
    deleteById(id){
        return request.delete('/economy/deleteById/'+id)
    },
    updateById(data){
        return request.put('/economy/updateById',data)
    }
}



//城市环境信息表管理
export const environmentApi={
    page(data){
        return request.post('/environment/page',data)
    },
    listAll(){
        return request.get('/environment/listAll')
    },
    getById(id){
        return request.get('/environment/getById/'+id)
    },
    add(data){
        return request.post('/environment/add',data)
    },
    deleteById(id){
        return request.delete('/environment/deleteById/'+id)
    },
    updateById(data){
        return request.put('/environment/updateById',data)
    }
}



//城市设施表，记录了城市中各种设施的信息，包括名称、位置和评级等管理
export const facilityApi={
    page(data){
        return request.post('/facility/page',data)
    },
    listAll(){
        return request.get('/facility/listAll')
    },
    getById(id){
        return request.get('/facility/getById/'+id)
    },
    add(data){
        return request.post('/facility/add',data)
    },
    deleteById(id){
        return request.delete('/facility/deleteById/'+id)
    },
    updateById(data){
        return request.put('/facility/updateById',data)
    }
}


//城市地理信息表管理
export const geographyApi={
    page(data){
        return request.post('/geography/page',data)
    },
    listAll(){
        return request.get('/geography/listAll')
    },
    getById(id){
        return request.get('/geography/getById/'+id)
    },
    add(data){
        return request.post('/geography/add',data)
    },
    deleteById(id){
        return request.delete('/geography/deleteById/'+id)
    },
    updateById(data){
        return request.put('/geography/updateById',data)
    }
}

//人口信息管理
export const populationApi={
    page(data){
        return request.post('/population/page',data)
    },
    listAll(){
        return request.get('/population/listAll')
    },
    getById(id){
        return request.get('/population/getById/'+id)
    },
    add(data){
        return request.post('/population/add',data)
    },
    deleteById(id){
        return request.delete('/population/deleteById/'+id)
    },
    updateById(data){
        return request.put('/population/updateById',data)
    }
}