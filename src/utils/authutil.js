import {getItem} from "@/utils/storage";

export const authShow = (name) => {
    let role = getItem('TOKEN_INFO_KEY').role
    return role === name
}
export const getUser = () => {
    let user = getItem('TOKEN_INFO_KEY').user
    return user
}