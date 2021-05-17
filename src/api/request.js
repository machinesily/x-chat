import axios from 'axios'
import { Toast } from 'vant'
// 创建axios实例
const service = axios.create({
  baseURL: 'http://127.0.0.1:3000', // 基础api
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  const user = JSON.parse(window.localStorage.getItem("user"))
  let token = ''
  if (user) token = user.token
  config.headers.Authorization = token
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      Toast.fail('连接超时');
    }
    return Promise.reject(error)
  }
)

export default function request(options) {
  return new Promise((resolve, reject) => {
    service(options).then(resolve).catch(reject)
  })
}
