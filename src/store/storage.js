function getValue(key){
    return JSON.parse(window.localStorage.getItem(key))
}

function setValue(key,value){
    window.localStorage.setItem(key,JSON.stringify(value))
}

export function userOption(){
    return{
        getUser(){
            return getValue("my.user");
        },
        setUser(value){
            setValue("my.user",value)
        },
        isAuth(){
            return window.localStorage.getItem("my.user").indexOf("token")!==-1
        }
    }
}


