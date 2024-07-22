import Vue from '@/main'
// import Vue from 'vue'

import { useToast } from 'vue-toastification'

const toast = useToast()

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
  toast.success(message, { timeout: close_delay })
}

function showInfo(el, message, close_delay = 3000) {
  /**
   * 显示信息
   */
  toast.info(message, { timeout: close_delay })
}

function showWarning(el, message, close_delay = 3000) {
  /**
   * 显示警告信息
   */
  toast.warning(message, { timeout: close_delay })
}

function showError(el, message, close_delay = 3000) {
  /**
   * 显示错误信息
   */
  console.log(close_delay)
  toast.error(message, { timeout: close_delay })
}

export default {
  showApiErrorMsg,
  showSuccess,
  showInfo,
  showWarning,
  showError
}
