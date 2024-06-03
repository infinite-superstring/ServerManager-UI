/**
 * 基于axios封装
 * 新增请求拦截 响应拦截
 */
import axios from 'axios'

import message from '@/scripts/utils/message.js';

/*远程地址前缀*/
const axiosplus = axios.create()


/**
 * 响应成功拦截器
 * @param result
 * @return {Promise<never>|*}
 */
const responseSuccess = (result) => {
  const res = result.data
  if (res.status !== 1) {
    message.showApiErrorMsg(this, res.msg ? res.msg : '操作错误')
    return Promise.reject(result)
  }
  return result
}

/**
 * 响应失败拦截器
 * @param err
 * @return {Promise<never>}
 */
const responseError = (err) => {
  if (err.response.status === 403) {
    message.showApiErrorMsg(this, err.response.data.msg ? err.response.data.msg : '权限不足')
    setTimeout(() => {
      window.location.href = '/login'
    }, 1000)
  }
  if (err.response.status === 405) {
    message.showApiErrorMsg(this, err.response.data.msg ? err.response.data.msg : '请求错误')
  }
  if (err.response.status === 500) {
    // message.sho1wApiErrorMsg(this, err.response.data.msg ? err.response.data.msg : '服务器错误')
  }
  return Promise.reject(err)
}

/**
 * 请求开始拦截器
 * @param config
 * @return {*}
 */
const requestStart = (config) => {
  return config
}

/**
 * 请求失败拦截器
 * @param err
 * @return {Promise<never>}
 */
const requestError = (err) => {
  /*请求失败*/
  return Promise.reject(err)
}


//  响应拦截器
axiosplus.interceptors.response.use(responseSuccess, responseError)
//  请求拦截器
axiosplus.interceptors.request.use(requestStart, requestError)


export default axiosplus
