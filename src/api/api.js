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


//用户相关
export const sysUserPage = (data) => {
    return request.post('/sys/sysUser/page', data)
}

export const sysUserGetById = (id) => {
    return request.get('/sys/sysUser/getById/' + id)
}
export const sysUserDeleteById = (id) => {
    return request.delete('/sys/sysUser/deleteById/' + id)
}
export const sysUserAdd = (data) => {
    return request.post('/sys/sysUser/add', data)
}
export const sysUserUpdateById = (data) => {
    return request.put('/sys/sysUser/updateById', data)
}


//文件发布相关

// export const sysUserPage = (data) => {
//     return request.post('/sys/sysUser/page', data)
// }
//
export const resourcesGetById = (id) => {
    return request.get('/resources/getById/' + id)
}
export const resourcesListAll = () => {
    return request.get('/resources/listAll')
}
export const resourcesAdd = (data) => {
    return request.post('/resources/add', data)
}
// export const sysUserUpdateById = (data) => {
//     return request.put('/sys/sysUser/updateById', data)
// }


//评论
export const commentAdd = (data) => {
    return request.post('/comment/add', data)
}






