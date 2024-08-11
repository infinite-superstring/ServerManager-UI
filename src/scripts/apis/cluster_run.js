import axios from '@/scripts/utils/axios'

/**
 * 获取结果列表
 * @param params
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const getListApi = (params) => {
  return axios.get('/api/execute/getList', {params})
}

/**
 * 创建一个集群指令
 * @param data
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const createApi = (data) => {
  return axios.post('/api/node_manager/cluster/execute/createTask', data)
}

/**
 * 获取 结果 中节点的列表
 * @param uuid
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const getNodeResultListByUUIDApi = (uuid) => {
  return axios.get('/api/execute/getNodeResultByUUID?uuid=' + uuid)
}
/**
 * 根据指令UUID获取命令详情
 * @param uuid
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const getCommandInfoApi = (uuid) => {
  return axios.get('/api/execute/getCommandInfo?uuid=' + uuid)
}
/**
 * 根据结果UUID获取结果详情
 * @param uuid
 */
export const getResultByResultUUIDApi = (uuid) => {
  return axios.get('/api/execute/getResultByUUID?uuid=' + uuid)
}

export const deleteApi = (uuid, code) => {
  return axios.delete('/api/execute/delete', {params: {uuid, code}})
}

export const downloadResultApi = (uuid) => {
  let url = '/api/execute/downloadResult?uuid=' + uuid
  let win = window.open(url, '_blank');
  win.focus();
}
