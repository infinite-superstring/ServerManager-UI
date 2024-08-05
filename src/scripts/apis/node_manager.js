import axios from "@/scripts/utils/axios";
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
  /**
   * 重置节点Token
   * @type {*}
   */
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
          return callback(res.data.data.token, res.data.data.server_token)
        }
      }).catch(err => {
        console.error(err)
        message.showApiErrorMsg(el, err.msg)
      })
    }
  })
  return false
}

function add_node(name, description, tags, group, auth_restrictions) {
  /**
   * 新增节点
   */
  return axios.post('/api/node_manager/addNode', {
    node_name: name,
    node_description: description,
    node_tags: tags,
    node_group: group,
    node_auth_restrictions: auth_restrictions
  })
}

function edit_node(node_uuid, name, description, tags, group) {
  /**
   * 编辑节点信息
   * @param node_uuid 节点uuid
   * @param name 新节点名
   * @param description 节点介绍
   * @param tags 节点标签
   * @param group 节点组名
   */
  return axios.post('/api/node_manager/editNode', {
    node_uuid: node_uuid,
    node_name: name,
    node_description: description,
    node_tags: tags,
    node_group: group
  })
}

function get_node_info(node_uuid) {
  return axios.post('/api/node_manager/getNodeInfo', {
    uuid: node_uuid,
  })
}

export default {
  del_node,
  reset_token,
  add_node,
  edit_node,
  get_node_info
}
