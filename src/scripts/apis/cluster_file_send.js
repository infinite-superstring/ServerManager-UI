import axios from "@/scripts/utils/axios";

function create_file_send_task(group_id, receive_directory, files) {
  /**
   * 创建文件分发任务
   */
  return axios.post('/api/file_distribution/create_task', {
    group_id: group_id,
    receive_directory: receive_directory,
    files: files
  })
}

function get_file_send_task_list(page = 1, page_size = 20) {
  /**
   * 获取文件分发任务列表
   */
  return axios.get("/api/file_distribution/task_list", {
    params: {
      page: page,
      page_size: page_size,
    }
  })
}

function get_file_send_task_info(uuid) {
  /**
   * 获取分发文件任务信息
   */
  return axios.get("/api/file_distribution/task_info", {
    params: {
      uuid: uuid
    }
  })
}


export default {
  create_file_send_task,
  get_file_send_task_list,
  get_file_send_task_info
}
