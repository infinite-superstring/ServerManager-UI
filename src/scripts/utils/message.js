// import Vue from '@/main'

function showApiErrorMsg(el, message, status = null, close_delay = 3000) {
  /**
   * 显示API错误信息
   */
  return showError(el, `API错误：${message} ${status ? '(status:' + status + ')' : ''}`, close_delay)
}

function showSuccess(el, message, close_delay = 3000) {
  /**
   * 显示成功信息
   */
  // console.log(Vue)
  return el.$notify.create({
    text: message,
    level: 'success',
    location: 'top center',
    'z_index': "2500",
    notifyOptions: {
      "close-delay": close_delay
    }
  })
}

function showInfo(el, message, close_delay = 3000) {
  /**
   * 显示信息
   */
  return el.$notify.create({
    text: message,
    level: 'info',
    location: 'top center',
    'content-class': 'snackbars',
    notifyOptions: {
      "close-delay": close_delay
    }
  })
}

function showWarning(el, message, close_delay = 3000) {
  /**
   * 显示警告信息
   */
  return el.$notify.create({
    text: message,
    level: 'warning',
    location: 'top center',
    notifyOptions: {
      "close-delay": close_delay
    }
  })
}

function showError(el, message, close_delay = 3000) {
  /**
   * 显示错误信息
   */
  return el.$notify.create({
    text: message,
    level: 'error',
    location: 'top center',
    notifyOptions: {
      "close-delay": close_delay
    }
  })
}

export default {
  showApiErrorMsg,
  showSuccess,
  showInfo,
  showWarning,
  showError
}
