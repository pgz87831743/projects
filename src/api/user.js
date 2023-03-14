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

export const systemAssignRoles = (data) => {
    return request.post('/system/assignRoles',data)
}

export const systemAssignAuthority = (data) => {
    return request.post('/system/assignAuthority',data)
}

export const systemAuthorityTreeByRoleId = (roleId) => {
    return request.get('/system/authorityTreeByRoleId/'+roleId)
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


//用户注册
export const sysUserRegister = (data) => {
    return request.post('/sys/sysUser/userRegister', data)
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


//贷款信息接口
export const loanPage = (data) => {
    return request.post('/loan/page', data)
}
export const loanListAll = () => {
    return request.get('/loan/listAll')
}
export const loanGetById = (id) => {
    return request.get('/loan/getById/' + id)
}
export const loanDeleteById = (id) => {
    return request.delete('/loan/deleteById/' + id)
}
export const loanAdd = (data) => {
    return request.post('/loan/add', data)
}
export const loanUpdateById = (data) => {
    return request.put('/loan/updateById', data)
}

export const loanApplyForLoan = (data) => {
    return request.post('/loan/applyForLoan', data)
}

//计算利息
export const loanCalculateInterest = (data) => {
    return request.post('/loan/calculateInterest', data)
}

//还款
export const loanRepayment = (data) => {
    return request.post('/loan/repayment', data)
}


//财务审核
export const loanFinancialReview = (data) => {
    return request.post('/loan/financialReview', data)
}

//信息审核
export const loanInformationReview = (data) => {
    return request.post('/loan/informationReview', data)
}


//统计
export const loanStatistics = () => {
    return request.post('/loan/statistics')
}


//问答相关
export const qnaPage = (data) => {
    return request.post('/qna/page', data)
}
export const qnaListAll = () => {
    return request.get('/qna/listAll')
}
export const qnaGetById = (id) => {
    return request.get('/qna/getById/' + id)
}
export const qnaDeleteById = (id) => {
    return request.delete('/qna/deleteById/' + id)
}
export const qnaAdd = (data) => {
    return request.post('/qna/add', data)
}
export const qnaUpdateById = (data) => {
    return request.put('/qna/updateById', data)
}




