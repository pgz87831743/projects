import {getItem} from "@/utils/storage";

export const authShow = (name) => {
    let role = getItem('TOKEN_INFO_KEY').role
    if (role === 'ADMIN') {
        return true
    } else {
        return name.indexOf(role) !== -1;
    }
}
export const getUser = () => {
    return getItem('TOKEN_INFO_KEY').user
}