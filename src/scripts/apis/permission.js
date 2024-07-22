import message from "@/scripts/utils/message";
import axios from "@/scripts/utils/axios";

function editGroup(el, gid, data) {
  return new Promise((resolve, reject) => {
    axios.post("/api/admin/permissionManager/setPermissionGroup", {
      id: gid,
      data: data
    }).then(() => {
      resolve()
    }).catch(() => {
      reject()
    })
  })
}

function getGroupInfo(el, gid) {
  return axios.post("/api/admin/permissionManager/getPermissionGroupInfo", {id: gid})
}

function getPermissionList() {
  return new Promise((resolve) => {
    axios.get("/api/admin/permissionManager/getPermissionList").then(res => {
      resolve(res.data.data)
    })
  })
}

function load_permission_group_list(search = "", page = 1, page_size = 20) {
  return axios.post("/api/admin/permissionManager/getPermissionGroups", {
      search: search,
      page: page,
      pageSize: page_size
    })
}

function addPermissionGroup(group_name, status, permission_item_list) {
  return axios.post("/api/admin/permissionManager/addPermissionGroup", {
    name: group_name,
    disable: !group_name,
    permissions: permission_item_list
  })
}

async function deleteGroup(el, gid, code) {
  return axios.post('/api/admin/permissionManager/delPermissionGroup', {
    id: gid,
    code: code
  }).then(() => {
    message.showSuccess(el, "删除权限组成功")
  })
}

export default {
  editGroup,
  getGroupInfo,
  deleteGroup,
  getPermissionList,
  addPermissionGroup,
  load_permission_group_list
}
