import axios from "axios";
import message from "@/scripts/utils/message";
import dialogs from "@/scripts/utils/dialogs";
import localConfigUtils from "@/scripts/utils/localConfigUtils";



async function del_node(el, node_uuid, callback) {
  /**
   * 删除节点
   */
  const user_info = localConfigUtils.load_userinfo()
  const web_config = localConfigUtils.load_web_config()
  await dialogs.confirm("你确定要删除该节点吗", "该操作无法撤销，请谨慎操作", "warning").then(async res => {
    if (res) {
      let otp_code = ""
      if (web_config.serverConfig.forceOTP_Bind || user_info.enableOTP) {
        await dialogs.showVerifyOTP_Dialog().then(res => otp_code = res)
      }
      axios.post('/api/node_manager/delNode', {
        uuid: node_uuid,
        code: otp_code
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
  const user_info = localConfigUtils.load_userinfo()
  const web_config = localConfigUtils.load_web_config()
  dialogs.confirm("确定要重置该节点的Token吗", "该操作无法撤销，请谨慎操作", "warning").then(async res => {
    if (res) {
      let otp_code = ""
      if (web_config.serverConfig.forceOTP_Bind || user_info.enableOTP) {
        await dialogs.showVerifyOTP_Dialog().then(res => otp_code = res)
      }
      axios.post('/api/node_manager/resetToken', {
        uuid: node_uuid,
        code: otp_code
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
