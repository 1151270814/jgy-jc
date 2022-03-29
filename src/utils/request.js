import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 当跨域请求时发送cookie withCredential
  timeout: 50000, // request timeout
  headers: {
    // application/x-www-form-urlencoded
    //
    'Content-Type': 'application/json;charset=UTF-8'
  },
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return JSON.parse(data);
  }]

})

// request interceptor
service.interceptors.request.use(
  config => {
   //在请求被发送之前做某事

    if (store.getters.token) {

      //让每个请求携带令牌  
      // ['X-Token']是一个自定义头键  
      //请根据实际情况进行修改  
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * 如果你想获得http信息，如头信息或状态
   * 请返回响应=&gt;响应
  */

  /**
   * 请返回响应=&gt;响应
   *这里只是一个例子
   * 你也可以通过HTTP状态码来判断状态
   */
  response => {

    console.log(response.data, "---------------------") // 来了
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code == 500) {
      return router.push('/500');

    }
    if (res.code == 404) {
      return router.push('/404');

    }
    if (res.code !== 200) {
      let message = res.message

      if (res.body) {
        if (typeof res.body === 'string') {
          message = res.body
        }
      }
      if (message === "TOKEN已过期") {
        Message({
          message: "您的会话状态已失效，请重新登录" || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      } else {
        Message({
          message: message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      console.error('接口异常：' + response.config.url)
      console.error('异常信息：' + message)
      console.error('错误码为：' + res.code)

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 508 || res.code === 512 || res.code === 514) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }

      if (message === 'TOKEN已过期' || message === 'TOKEN错误' || res.code === 402) {
        // TOKEN已过期
        store.dispatch('user/logout').then(() => {
          router.push(`/login?redirect=${router.fullPath}`)
        })
      }

      return Promise.reject(new Error(message || 'Error'))
    } else {
      return Promise.resolve(res.body || res.data)
    }

    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 200) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
