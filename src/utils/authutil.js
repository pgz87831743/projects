import {getItem} from "@/utils/storage";

export const authShow = (name) => {
    let role = getItem('TOKEN_INFO_KEY').role

    return name.indexOf(role) !== -1;
    // if (role === 'ADMIN') {
    //     return true
    // } else {
    //
    // }
}
export const getUser = () => {
    return getItem('TOKEN_INFO_KEY').user
}
