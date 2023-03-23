import axios from 'axios'
import { MessageBox, Loading } from 'element-ui'
import router from '../router/index.js'

const loadingInstances = []   //loading

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 加载loading
    const loadingInstance = Loading.service({
      background: 'rgb(0,0,0,0)'
    })
    loadingInstances.push(loadingInstance)
    return config
  },
  (error) => Promise.error(error)
)

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    const { data = {} } = response
    const { code, message } = data

    // 关闭loading
    loadingInstances.pop().close()

    if (code != 0) {
      MessageBox.alert(message, '提示', {
        type: 'warning'
      })
      return Promise.reject(response)
    }
    return Promise.resolve(data)
  },
  (error) => {
    const { response } = error
    const { status, data = {} } = response || {}
    
    // 首先关闭loading
    loadingInstances.pop().close()

    switch(status) {
      case 401:
        // 未登录或过期
        router.push({ name: 'login'})
        break
      case 404:
        MessageBox.alert('服务器出错','提示',{
          type: 'error'
        })
        break
      default: 
        MessageBox.alert(data.message || '无服务器出错','提示',{
          type: 'error'
        })
    }
    return Promise.reject(response)
  }
)

// get方法
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params,
    }).then((res) => {
      resolve(res.data);
    }).catch((err = {}) => {
      reject(err);
    });
  });
}

// post方法
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then((res) => {
      resolve(res.data);
    }).catch((err = {}) => {
      reject(err);
    });
  });
}

//http:常见状态码 4XX 客户端错误   5XX 服务器错误
// 400 bad request，请求报文存在语法错误
// 401 unauthorized，表示发送的请求需要有通过 HTTP 认证的认证信息
// 403 forbidden，表示对请求资源的访问被服务器拒绝
// 404 not found，表示在服务器上没有找到请求的资源

// 500 internal sever error，表示服务器端在执行请求时发生了错误
// 503 service unavailable，表明服务器暂时处于超负载或正在停机维护，无法处理请求