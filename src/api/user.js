import request from "@/utils/request";


//权限相关
export const login = (data) => {
    return request.post('/system/login', data)
}
export const logout = () => {
    return request.get('/system/logout')
}

export const systemRoleList = (username) => {
    return request.get('/system/roleList/'+username)
}

export const systemAuthorityTree = () => {
    return request.get('/system/authorityTree')
}


//用户相关
export const sysUserPage = (data) => {
    return request.post('/sys/sysUser/page', data)
}
export const sysUserListAll = () => {
    return request.get('/sys/sysUser/listAll')
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


//角色相关
export const sysRolePage = (data) => {
    return request.post('/sys/sysRole/page', data)
}
export const sysRoleListAll = () => {
    return request.get('/sys/sysRole/listAll')
}
export const sysRoleGetById = (id) => {
    return request.get('/sys/sysRole/getById/' + id)
}
export const sysRoleDeleteById = (id) => {
    return request.delete('/sys/sysRole/deleteById/' + id)
}
export const sysRoleAdd = (data) => {
    return request.post('/sys/sysRole/add', data)
}
export const sysRoleUpdateById = (data) => {
    return request.put('/sys/sysRole/updateById', data)
}


//权限相关
export const sysAuthorityPage = (data) => {
    return request.post('/sys/sysAuthority/page', data)
}
export const sysAuthorityListAll = () => {
    return request.get('/sys/sysAuthority/listAll')
}
export const sysAuthorityGetById = (id) => {
    return request.get('/sys/sysAuthority/getById/' + id)
}
export const sysAuthorityDeleteById = (id) => {
    return request.delete('/sys/sysAuthority/deleteById/' + id)
}
export const sysAuthorityAdd = (data) => {
    return request.post('/sys/sysAuthority/add', data)
}
export const sysAuthorityUpdateById = (data) => {
    return request.put('/sys/sysAuthority/updateById', data)
}
