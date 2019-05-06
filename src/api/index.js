//ajax配置
import service from './service'

const url = {
    login:'mock/5ccfcac38da80f6f5c2a798a/example/login'
}


export default {
    login:(params)=>{
        return service.post(url.login,params)
    }
}