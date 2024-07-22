import axios from "@/scripts/utils/axios";

function load_node_list() {
  /**
   * 加载节点列表
   */
  return new Promise((resolve) => {
    axios.get("/api/admin/auditAndLogger/terminalRecord/loadNodeList").then(res => {
      resolve(res.data.data)
    })
  })
}

function load_node_terminal_user_list(node_uuid) {
  /**
   * 加载节点终端用户列表
   */
  return axios.get('/api/admin/auditAndLogger/terminalRecord/loadUserList', {
    params: {
      node_uuid: node_uuid
    }
  })
}

function load_user_terminal_session_list(node_uuid, user_uuid) {
  return axios.get('/api/admin/auditAndLogger/terminalRecord/loadSessionList', {
    params: {
      node_uuid: node_uuid,
      user_id: user_uuid
    }
  })
}

function open_download_session_window(node_uuid, session_uuid) {
  /**
   * 打开下载Session文件窗口
   * @type {{node_uuid, session_uuid}}
   */
  let params = {node_uuid: node_uuid, session_uuid: session_uuid}
  params = new URLSearchParams(params).toString()
  const url = `/api/admin/auditAndLogger/terminalRecord/downloadSessionRecord?${params}`
  const newWindow = window.open(url, '_blank');
  newWindow.focus();
}

export default {
  load_node_list,
  load_node_terminal_user_list,
  load_user_terminal_session_list,
  open_download_session_window
}
