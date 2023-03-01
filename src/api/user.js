import request from "@/utils/request";

export const login = (data) => {
    return request.post('/user/login', data)
}

export const logout = () => {
    return request.get('/user/logout')
}
