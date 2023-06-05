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
//武器表管理
export const weaponApi={
    page(data){
        return request.post('/weapon/page',data)
    },
    listAll(search){
        return request.get('/weapon/listAll?search='+search)
    },
    getById(id){
        return request.get('/weapon/getById/'+id)
    },
    add(data){
        return request.post('/weapon/add',data)
    },
    deleteById(id){
        return request.delete('/weapon/deleteById/'+id)
    },
    updateById(data){
        return request.put('/weapon/updateById',data)
    }
}