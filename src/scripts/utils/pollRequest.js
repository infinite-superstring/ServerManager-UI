import axios from '@/scripts/utils/axios'

/**
 * 创建一个轮询请求的函数
 * @param {Object} config 配置对象
 * @param {string} config.url 请求URL
 * @param {string} [config.method='GET'] 请求方法（GET, POST等）
 * @param {number} config.interval 轮询间隔时间（秒）
 * @param {Function} config.onSuccess 成功后的回调函数
 * @param {Function} config.onError 错误后的回调函数
 * @param {boolean} [config.retryOnFailure=true] 是否在失败后自动重试
 */
export function pollRequest(config) {

  let stop = false

  function sendRequest() {
    if (stop) return
    axios({
      method: config.method || 'GET',
      url: config.url,
    })
      .then(response => {
        config.onSuccess(response.data);
        setTimeout(() => sendRequest(), config.interval * 1000);
      })
      .catch(error => {
        config.onError(error);
        if (config.retryOnFailure) {
          setTimeout(() => sendRequest(), 2000);
        }
      });
  }

  sendRequest();
  return {
    stop: () => {
      stop = true
    }, start: () => {
      stop = false
      sendRequest()
    }
  }
}
