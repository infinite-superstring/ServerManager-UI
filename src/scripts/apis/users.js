import axios from "@/scripts/utils/axios";
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
    message.showSuccess(el, "用户信息已更新")
  })
}

function getUserInfo(el, uid) {
  /**
   * 获取用户信息
   * @param uid 用户ID
   */
  return axios.post("/api/admin/userManager/getUserInfo", {id: uid})
}

function getUserList(el, search = "", page_index = 1, page_size = 20) {
  return axios.post("/api/admin/userManager/getUserList", {
    page: page_index,
    pageSize: page_size,
    search: search
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
    message.showSuccess(this, res.data.msg)
  })
}

export default {
  updateUserInfo,
  getUserInfo,
  getUserList,
  deleteUser
}
