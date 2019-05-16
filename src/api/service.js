import axios from 'axios'
import router from '../router'

//弹出提示层 使用cube-ui的组件
import { Dialog } from 'cube-ui'

//axios api https://www.kancloud.cn/yunye/axios/234845
const service = axios.create({
  // 设置超时时间
  timeout: process.env.AJAX_TIMEOUT,
  baseURL: process.env.API_BASE_URL
})

service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'


/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
service.interceptors.request.use(config => {

  const token = localStorage.getItem('token')

  if (token) {
    //config.headers['Authorization'] = token
  }

  if (config.method == 'post') {
    config.data = {
      ...config.data,
      _t: Date.parse(new Date()) / 1000,
    }
  } else if (config.method == 'get') {
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params
    }
  }

  return config

}, (error) => {

  return Promise.reject(error)

})
/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
service.interceptors.response.use(response => {

  const responseCode = response.status

  // token 已过期，重定向到登录页面
  if (response.data.code == 4) {
    localStorage.clear()
    router.replace({
      path: '/login',
      query: { redirect: router.currentRoute.fullPath }
    })
  }


  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据，否则的话抛出错误
  if (responseCode === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }

}, error => {

  // 断网 或者 请求超时 状态
  if (!error.response) {
    // 请求超时状态
    if (error.message.includes('timeout')) {

      Dialog.$create({
        type: 'alert',
        title: '',
        content: '请求超时，请检查网络是否连接正常',
        icon: 'cubeic-alert'
      }).show()

    } else {

      // 可以展示断网组件
      Dialog.$create({
        type: 'alert',
        title: '',
        content: '请求失败，请检查网络是否已连接',
        icon: 'cubeic-alert'
      }).show()

    }
    return
  }

  // 服务器返回不是 2 开头的情况，会进入这个回调，可以根据后端返回的状态码进行不同的操作
  const responseCode = error.response.status

  switch (responseCode) {

    // 401：未登录
    case 401:

      // 跳转登录页
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })

      break
    // 403: token过期
    case 403:

      // 弹出错误信息
      Dialog.$create({
        type: 'alert',
        title: '',
        content: '登录信息过期，请重新登录',
        icon: 'cubeic-alert'
      }).show()

      // 清除token
      localStorage.removeItem('token')

      // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
      setTimeout(() => {
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }, 1000)

      break

    // 404请求不存在
    case 404:
      Dialog.$create({
        type: 'alert',
        title: '',
        content: '网络请求不存在',
        icon: 'cubeic-alert'
      }).show()
      break
    // 其他错误，直接抛出错误提示
    default:
      Dialog.$create({
        type: 'alert',
        title: '',
        content: error.response.data.message,
        icon: 'cubeic-alert'
      }).show()
  }
  return Promise.reject(error)
})

export default service