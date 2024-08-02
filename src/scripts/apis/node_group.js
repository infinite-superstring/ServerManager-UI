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

export default {
  get_node_group_list
}
