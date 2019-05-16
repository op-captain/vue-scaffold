//ajax配置
import service from './service'

const url = {
    login:'/login',
    articleList:'/article/list'
}


export default {
    login:(params)=>{
        return service.post(url.login,params)
    },
    articleList:(params)=>{
        return service.get(url.articleList,{params})
    }
}