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

/**
 * 发送邮箱验证码
 */
export const sendEmailCodeApi = (params) => {
  return axios.get("/api/initUser/sendEmailVerifyCode", {params})
}

/**
 * 保存用户信息
 * @param data
 */
export const saveUserInfoApi = (data) => {
  return axios.post("/api/initUser/saveUserInfo", data)
}

/**
 * 获取用户信息
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const getInfoApi = () => {
  return axios.get("/api/userInfo/getInfo")
}

/**
 * 编辑用户信息
 * @param data
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const editInfoApi = (data) => {
  console.log(data)
  return axios.post("/api/userInfo/editInfo", data)
}

/**
 * 上传头像
 * @param data
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const uploadAvatarApi = (data) => {
  return axios.post("/api/userInfo/uploadAvatar", data)

}

/**
 * 修改密码
 * @param data
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const updatePasswordApi = (data) => {
  return axios.post('/api/userInfo/setPassword', {data})
}

export default {
  updateUserInfo,
  getUserInfo,
  getUserList,
  deleteUser
}
