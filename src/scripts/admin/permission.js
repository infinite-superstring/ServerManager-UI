import axios from "axios";
import message from "@/scripts/utils/message";

function editGroup(el, gid, data) {
  return new Promise((resolve, reject) => {
    axios.post("/api/admin/permissionManager/setPermissionGroup", {
      id: gid,
      data: data
    }).then(res => {
      const apiStatus = res.data.status
      if (apiStatus !== 1) {
        message.showError(el, res.data.msg, apiStatus)
        reject(apiStatus)
      }
      resolve()
    }).catch(err => {
      console.error(err)
      message.showApiErrorMsg(el, err.message)
      reject()
    })
  })
}

function getGroupInfo(el, gid) {
  return axios.post("/api/admin/permissionManager/getPermissionGroupInfo", {id: gid}).catch(err => {
    console.error(err)
    message.showApiErrorMsg(el, err.message)
  })
}

async function deleteGroup(el, gid, code) {
  return axios.post('/api/admin/permissionManager/delPermissionGroup', {
    id: gid,
    code: code
  }).then(res => {
    const apiStatus = res.data.status
    if (apiStatus === 1) {
      message.showSuccess(el, "删除权限组成功")
    } else {
      message.showError(el, res.data.msg)
    }
  }).catch(err => {
    message.showApiErrorMsg(el, err.message)
  })
}

export default {
  editGroup,
  getGroupInfo,
  deleteGroup
}
