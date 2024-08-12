import axios from "@/scripts/utils/axios";

function get_node_group_list(search = "", page = 1) {
  /**
   * 获取集群列表
   */
  return axios.post('/api/node_manager/node_group/getGroupList', {
    page: page,
    search: search
  })
}

function get_group_info(gid) {
  /**
   * 获取集群详细信息
   */
  return axios.get("/api/node_manager/node_group/getGroupById", {
    params: {
      group_id: gid
    }
  })
}

function create_group(name, desc, leader_id, node_list, rule_list) {
  /**
   * 创建集群
   * @param name 集群名
   * @param desc 集群简介
   * @param leader_id 集群负责人id
   * @param node_list 集群节点列表
   * @param rule_list 集群权限规则
   */
  return axios.post("/api/node_manager/node_group/createGroup", {
    group_name: name,
    group_desc: desc,
    group_leader: leader_id,
    group_nodes: node_list,
    rules: rule_list
  })
}

function editGroup(group_id, name, desc, leader_id, node_list, rule_list) {
  return axios.post("/api/node_manager/node_group/edit", {
    group_id: group_id,
    group_name: name,
    group_desc: desc,
    group_leader: leader_id,
    group_nodes: node_list,
    rules: rule_list
  })
}

function delete_group(group_id, otp_code = null) {
  return axios.post("/api/node_manager/node_group/delGroup", {
    group_id: group_id,
    code: otp_code
  })
}

export default {
  get_node_group_list,
  get_group_info,
  create_group,
  delete_group,
  editGroup
}
