import {getItem} from "@/utils/storage";

export const authShow = (name) => {
    return name === getItem('TOKEN_INFO_KEY').role
}
export const getUser = () => {
    return getItem('TOKEN_INFO_KEY').user
}
