import axios from "axios";
import message from "@/scripts/utils/message";
import localConfigUtils from "@/scripts/utils/localConfigUtils";
import dialogs from "@/scripts/utils/dialogs";

function updateUserInfo(el, uid, data) {
  /**
   * 更新用户信息
   * @type {{data, id}}
   * @param uid 用户UID
   * @param data 更新的数据
   */
  return axios.post("/api/admin/userManager/setUserInfo", {id: uid, data: data}).then(res => {
    const status = res.data.status
    if (status !== 1) {
      message.showApiErrorMsg(el, res.data.msg, status)
    }
  }).catch(err => {
    console.error(err)
    message.showApiErrorMsg(el, err.message)
  })
}

function getUserInfo(el, uid) {
  /**
   * 获取用户信息
   * @param uid 用户ID
   */
  return axios.post("/api/admin/userManager/getUserInfo", {id: uid}).catch(err => {
    message.showApiErrorMsg(this, err.message)
  })
}

function getUserList(el, search = "", page_index = 1, page_size = 20) {
  return axios.post("/api/admin/userManager/getUserList", {
    page: page_index,
    pageSize: page_size,
    search: search
  }).catch(err => {
    console.error(err)
    message.showApiErrorMsg(el, err.message)
  })
}

async function deleteUser(el, uid) {
  const user_info = localConfigUtils.load_userinfo()
  const web_config = localConfigUtils.load_web_config()
  let opt_code = ""
  if (web_config.serverConfig.forceOTP_Bind || user_info.enableOTP) {
    await dialogs.showVerifyOTP_Dialog().then(res => opt_code = res)
  }
  return axios.post("/api/admin/userManager/delUser", {
    id: uid,
    code: opt_code
  }).then(res => {
    const status = res.data.status
    if (status === 1) {
      message.showSuccess(this, res.data.msg)
    } else {
      message.showError(this, res.data.msg)
    }
  })
}

export default {
  updateUserInfo,
  getUserInfo,
  getUserList,
  deleteUser
}
