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


export default {
  create_file_send_task,
}
