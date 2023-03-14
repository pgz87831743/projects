import {getItem} from "@/utils/storage";

export const authShow = (name) => {
    let authority = getItem('TOKEN_INFO_KEY').authority
    let roles = getItem('TOKEN_INFO_KEY').roles
    console.log(roles)
    let a = authority.find((arrItem) => arrItem.name === name);
    let b = roles.find((arrItem) => arrItem.name === name);
    if (a||b) {
        return true
    }
    return false
}
