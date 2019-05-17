//ajax配置
import service from './service'

const url = {
    login:'/login', //登录
    articleList:'/article/list', //文章列表
    articleDetail:'/article/detail' //文章详情
}


export default {
    login:(params)=>{
        return service.post(url.login,params)
    },
    articleList:(params)=>{
        return service.get(url.articleList,{params})
    },
    articleDetail:(params)=>{
        return service.get(url.articleDetail,{params})
    }
}