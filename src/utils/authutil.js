import {getItem} from "@/utils/storage";

export const authShow = (name) => {
    return name.indexOf(getItem('TOKEN_INFO_KEY').role) !== -1;
}
export const getUser = () => {
    return getItem('TOKEN_INFO_KEY').user
}