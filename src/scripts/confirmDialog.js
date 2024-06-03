import dialogs from "@/scripts/utils/dialogs";


/**
 * 确认对话框
 * @param title{String} 标题
 * @param content{String} 内容
 * @param callback{Function} 确认回调
 * @param level{'warning' | 'error' | 'info' | 'success'}
 * @return {boolean} 是否成功
 */
const confirmDialog = (title, content, callback , level = 'warning') => {
  dialogs.confirm(title, content, level,)
    .then((r) => {
      if (r){
        callback()
        return true
      }
      return false
    })

}

export default confirmDialog
