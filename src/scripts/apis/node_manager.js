import JSZip from 'jszip'
import {saveAs} from 'file-saver'

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
        message.showSuccess(el, res.data.msg)
        return callback()
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
        message.showSuccess(el, res.data.msg)
        return callback(res.data.data.token, res.data.data.server_token)
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

function edit_node(node_uuid, name, description, tags, group, auth_restrictions) {
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
    node_group: group,
    node_auth_restrictions: auth_restrictions
  })
}

function get_node_info(node_uuid) {
  return axios.post('/api/node_manager/getNodeInfo', {
    uuid: node_uuid,
  })
}

function get_base_node_list(search = "", page_index = 1, page_size = 20) {
  /**
   * 获取基础节点列表（不包含节点状态等信息）
   */
  return axios.post('/api/node_manager/getBaseNodeList', {
    page: page_index,
    page_size: page_size,
    search: search
  })
}

/**
 * 获取节点列表
 * @param params
 * @return {Promise<axios.AxiosResponse<any>>}
 */
function getNodeListApi(params) {
  return axios.post('/api/node_manager/getNodeList', params)
}

/**
 * 获取节点事件列表
 * @param data
 */
function getNodeEventListApi(data) {
  return axios.post('/api/node_manager/node_event/get_node_events', data)
}

function save_import_node_list(node_list) {
  /**
   * 保存节点导入列表
   */
  return axios.post('/api/node_manager/import_node/save', {
    node_list: node_list
  })
}

function generate_node_config_pack(server_host, server_token, node_data_list) {
  /**
   * 生成节点配置文件（压缩包）
   * @param server_host 服务器地址
   * @param server_token 服务器token
   * @param node_data_list 包含节点名和节点token的列表
   */
  console.log(server_host, server_token, node_data_list)
  // 创建一个新的JSZip实例
  const zip = new JSZip()
  const parsedUrl = new URL(server_host)
  for (const index in node_data_list) {
    const item = node_data_list[index]
    const indexFolder = zip.folder(item.node_name)
    indexFolder.file('config.toml', `[server]
# 服务器地址
server_host = "${parsedUrl.hostname}"
# 服务器端口号
server_port = ${parsedUrl.port || (parsedUrl.protocol === 'https:' ? '443' : '80')}
# 服务器Token
server_token = "${server_token}"
# 启用SSL
enable_SSL = ${parsedUrl.protocol === 'https:'}
# 客户端名称
client_name = "${item.node_name}"
# 客户端Token(需与客户端名称对应)
client_token = "${item.node_token}"
# 自动重连到服务器
re_connect = true

[safe]
# 允许服务器执行命令
execute_command = true
# 允许服务器连接终端
connect_terminal = true
# 允许下载服务器上的文件
download_file = true`)
  }

  zip.generateAsync({type: 'blob'}).then((content) => {
    // 使用 FileSaver.js 保存文件
    saveAs(content, '节点配置文件.zip')
  })
}

export default {
  del_node,
  reset_token,
  add_node,
  edit_node,
  get_node_info,
  get_base_node_list,
  save_import_node_list,
  generate_node_config_pack,
  getNodeListApi,
  getNodeEventListApi
}
