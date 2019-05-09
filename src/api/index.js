//ajax配置
import service from './service'

const url = {
    login:'/login'
}


export default {
    login:(params)=>{
        return service.post(url.login,params)
    }
}