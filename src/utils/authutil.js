import {getItem} from "@/utils/storage";

export const authShow = (name) => {
    let authority = getItem('TOKEN_INFO_KEY').authority
    let a = authority.find((arrItem) => arrItem.name === name);
    if (a) {
        return true
    }
    return false
}
