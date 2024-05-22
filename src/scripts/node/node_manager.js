import axios from "axios";
import message from "@/scripts/utils/message";
import dialogs from "@/scripts/utils/dialogs";

function del_node(el, node_uuid, callback) {
  /**
   * 删除节点
   */
  // dialogs.confirm("你确定要删除该节点吗", "该操作无法撤销，请谨慎操作")
  dialogs.confirm("你确定要删除该节点吗", "该操作无法撤销，请谨慎操作", "warning").then(res => {
    if (res) {
      axios.post('/api/node_manager/delNode', {
        uuid: node_uuid
      }).then(res => {
        const apiStatus = res.data.status;
        if (apiStatus !== 1) {
          message.showApiErrorMsg(el, res.data.msg, apiStatus)
        } else {
          message.showSuccess(el, res.data.msg)
          return callback()
        }
      }).catch(err => {
        console.error(err)
        message.showApiErrorMsg(el, err.msg)
      })
    }
  })
  return false
}

function reset_token(el, node_uuid, callback) {
  dialogs.confirm("确定要重置该节点的Token吗", "该操作无法撤销，请谨慎操作", "warning").then(res => {
    if (res) {
      axios.post('/api/node_manager/resetToken', {
        uuid: node_uuid
      }).then(res => {
        const apiStatus = res.data.status;
        if (apiStatus !== 1) {
          message.showApiErrorMsg(el, res.data.msg, apiStatus)
        } else {
          message.showSuccess(el, res.data.msg)
          return callback(res.data.data.token)
        }
      }).catch(err => {
        console.error(err)
        message.showApiErrorMsg(el, err.msg)
      })
    }
  })
  return false
}

export default {
  del_node,
  reset_token
}
