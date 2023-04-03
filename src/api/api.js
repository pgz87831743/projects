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






//商品管理相关
export const goodsApi = {
    page(data) {
        return request.post('/goods/page', data)
    },
    getById(id) {
        return request.get('/goods/getById/' + id)
    },
    updateById(data) {
        return request.put('/goods/updateById', data)
    },
    add(data) {
        return request.post('/goods/add', data)
    },
    hotGoods() {
        return request.get('/goods/hotGoods')
    },
    deleteById(id) {
        return request.delete('/goods/deleteById/' + id)
    },

    searchResource(data) {
        return request.post('/goods/searchResource', data)
    }
}


//评论
export const commentAdd = (data) => {
    return request.post('/comment/add', data)
}


//购物车管理
export const goodsCarApi = {
    page(data) {
        return request.post('/goodsCar/page', data)
    },
    getById(id) {
        return request.get('/goodsCar/getById/' + id)
    },
    add(data) {
        return request.post('/goodsCar/add', data)
    },
    deleteById(id) {
        return request.delete('/goodsCar/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/goodsCar/updateById', data)
    },

    //前台
    pageUser(data) {
        return request.post('/goodsCar/pageUser', data)
    },
    submitBefore(data) {
        return request.post('/goodsCar/submitBefore', data)
    },
    submitOrder(data) {
        return request.post('/goodsCar/submitOrder', data)
    },
}

//订单管理
export const goodsOrderApi = {
    page(data) {
        return request.post('/goodsOrder/page', data)
    },
    listAll() {
        return request.get('/goodsOrder/listAll')
    },
    getById(id) {
        return request.get('/goodsOrder/getById/' + id)
    },
    add(data) {
        return request.post('/goodsOrder/add', data)
    },
    deleteById(id) {
        return request.delete('/goodsOrder/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/goodsOrder/updateById', data)
    }
}


//订单明细管理
export const goodsOrderDetailApi = {
    page(data) {
        return request.post('/goodsOrderDetail/page', data)
    },
    getById(id) {
        return request.get('/goodsOrderDetail/getById/' + id)
    },
    add(data) {
        return request.post('/goodsOrderDetail/add', data)
    },
    deleteById(id) {
        return request.delete('/goodsOrderDetail/deleteById/' + id)
    },
    updateById(data) {
        return request.put('/goodsOrderDetail/updateById', data)
    }
}