import dialogs from "@/scripts/utils/dialogs";


/**
 * 删除确认
 * @param el 当前组件实例
 * @param title{String} 标题
 * @param content{String} 内容
 * @param callback{Function} 确认删除回调
 * @return {boolean} 是否成功
 */
const deleteConfirm = (el, title, content, callback) => {
  dialogs.confirm(title, content, "warning",)
    .then((r) => {
      if (r){
        callback()
        return true
      }
      return false
    })

}

export default deleteConfirm
